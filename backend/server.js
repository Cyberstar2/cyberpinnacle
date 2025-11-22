import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config({ path: "./.env" });

console.log("Current directory:", process.cwd());
console.log("Loaded GROQ Key:", process.env.GROQ_API_KEY);

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://cyberpinnacle.vercel.app",
    ],
    methods: ["GET", "POST"],
  })
);
app.use(express.json({ limit: "2mb" }));

// In-memory logs & stats (simple for now)
const chatLogs = [];
const reconLogs = [];
const forensicsLogs = [];

const stats = {
  totalChats: 0,
  totalReconIP: 0,
  totalReconDNS: 0,
  totalReconWHOIS: 0,
  totalReconSubdomains: 0,
  totalForensicsAnalyses: 0,
};

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Health check
app.get("/", (req, res) => {
  res.send("CyberPinnacle AI Backend Running");
});

// ===== MAIN AI CHAT ENDPOINT =====
app.post("/ai", async (req, res) => {
  try {
    const { prompt, fileContent } = req.body;

    let finalPrompt = prompt;
    if (fileContent) {
      finalPrompt = `
You are CyberPinnacle AI, a cybersecurity assistant.

The user uploaded a file with the following content:

${fileContent}

Now respond to the user's question based on this file (if relevant):

${prompt}
      `.trim();
    }

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: finalPrompt }],
      temperature: 0.4,
    });

    const aiText =
      completion.choices[0]?.message?.content ||
      "I could not generate a response.";

    const entry = {
      id: Date.now(),
      prompt,
      fileAttached: !!fileContent,
      response: aiText,
      timestamp: new Date().toISOString(),
    };

    chatLogs.push(entry);
    stats.totalChats += 1;

    return res.json({ response: aiText });
  } catch (err) {
    console.error("AI Error:", err);
    return res.status(500).json({ error: "AI Server Error" });
  }
});

// ===== ADMIN LOGS =====
app.get("/ai/logs", (req, res) => {
  res.json({ logs: chatLogs.slice(-200) });
});

// ========== RECON TOOLS ENDPOINTS ==========

// 1) IP Info
app.post("/recon/ip-info", async (req, res) => {
  try {
    const { target } = req.body;
    if (!target) return res.status(400).json({ error: "No IP provided" });

    const resp = await fetch(`https://ipwho.is/${encodeURIComponent(target)}`);
    const data = await resp.json();

    if (!data || data.success === false) {
      return res.status(400).json({ error: "Unable to fetch IP info" });
    }

    reconLogs.push({
      id: Date.now(),
      type: "ip-info",
      input: target,
      timestamp: new Date().toISOString(),
    });
    stats.totalReconIP += 1;

    return res.json({ result: data });
  } catch (err) {
    console.error("IP Info Error:", err);
    return res.status(500).json({ error: "IP info lookup failed" });
  }
});

// 2) DNS Lookup
app.post("/recon/dns-lookup", async (req, res) => {
  try {
    const { domain } = req.body;
    if (!domain) return res.status(400).json({ error: "No domain provided" });

    const resp = await fetch(
      `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=A`
    );
    const data = await resp.json();

    if (!data || data.Status !== 0) {
      return res
        .status(400)
        .json({ error: "DNS lookup failed or no records found" });
    }

    reconLogs.push({
      id: Date.now(),
      type: "dns-lookup",
      input: domain,
      timestamp: new Date().toISOString(),
    });
    stats.totalReconDNS += 1;

    return res.json({ result: data });
  } catch (err) {
    console.error("DNS Lookup Error:", err);
    return res.status(500).json({ error: "DNS lookup failed" });
  }
});

// 3) WHOIS / RDAP
app.post("/recon/whois", async (req, res) => {
  try {
    const { domain } = req.body;
    if (!domain) return res.status(400).json({ error: "No domain provided" });

    const resp = await fetch(
      `https://rdap.org/domain/${encodeURIComponent(domain)}`
    );
    if (!resp.ok) {
      return res.status(400).json({ error: "WHOIS/RDAP lookup failed" });
    }
    const data = await resp.json();

    reconLogs.push({
      id: Date.now(),
      type: "whois",
      input: domain,
      timestamp: new Date().toISOString(),
    });
    stats.totalReconWHOIS += 1;

    return res.json({ result: data });
  } catch (err) {
    console.error("WHOIS Error:", err);
    return res.status(500).json({ error: "WHOIS lookup failed" });
  }
});

// 4) Subdomains (AI-assisted)
app.post("/recon/subdomains-ai", async (req, res) => {
  try {
    const { domain } = req.body;
    if (!domain) return res.status(400).json({ error: "No domain provided" });

    const prompt = `
You are a cybersecurity recon assistant.

The target domain is: ${domain}

1. List 10 likely subdomains (common ones used in real infrastructures).
2. Suggest OSINT / recon commands to discover real subdomains (amass, subfinder, assetfinder, crt.sh, etc.).
3. Give a short explanation of why subdomain enumeration is important in attack surface mapping.
Return answer in a clean, readable format.
    `.trim();

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
    });

    const text =
      completion.choices[0]?.message?.content ||
      "Could not generate subdomain recon plan.";

    reconLogs.push({
      id: Date.now(),
      type: "subdomains-ai",
      input: domain,
      timestamp: new Date().toISOString(),
    });
    stats.totalReconSubdomains += 1;

    return res.json({ result: text });
  } catch (err) {
    console.error("Subdomains AI Error:", err);
    return res.status(500).json({ error: "Subdomain recon failed" });
  }
});

// ========= FORENSICS ANALYSIS ENDPOINT =========
app.post("/forensics/analyze", async (req, res) => {
  try {
    const { filename, mimeType, size, contentPreview } = req.body;

    if (!filename || !contentPreview) {
      return res
        .status(400)
        .json({ error: "Missing file name or content preview" });
    }

    const prompt = `
You are a digital forensics and incident response analyst.

You are given a file with the following metadata:
- File name: ${filename}
- MIME type: ${mimeType || "unknown"}
- Size (bytes): ${size || "unknown"}

Below is a truncated preview of the file content (it may be partial or text-extracted):

---------------- FILE CONTENT PREVIEW START ----------------
${contentPreview}
---------------- FILE CONTENT PREVIEW END ----------------

TASKS:
1. Briefly classify the situation into one of these: INFO, WARNING, or CRITICAL, based on what you can infer.
2. Provide a concise forensic summary:
   - What does this file appear to contain?
   - Any suspicious indicators or behaviour patterns?
3. Extract and list any potential indicators of compromise (IOCs) you see:
   - IP addresses
   - Domains / hostnames
   - Email addresses
   - File hashes (if visible)
   - URLs
4. Suggest next forensic steps (e.g. deeper PCAP analysis, log correlation, sandboxing, timeline analysis).

IMPORTANT OUTPUT FORMAT:
- First line MUST be exactly: THREAT_LEVEL: INFO or THREAT_LEVEL: WARNING or THREAT_LEVEL: CRITICAL
- After that, provide a clear multi-line explanation and lists in human-readable text.
    `.trim();

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    const fullText =
      completion.choices[0]?.message?.content ||
      "No analysis could be generated.";

    // Parse threat level from first line
    const lines = fullText.split("\n");
    let threatLevel = "INFO";
    if (lines.length > 0) {
      const m = lines[0].match(/THREAT_LEVEL:\s*(CRITICAL|WARNING|INFO)/i);
      if (m) {
        threatLevel = m[1].toUpperCase();
      }
    }
    const analysis = lines.slice(1).join("\n").trim();

    const entry = {
      id: Date.now(),
      filename,
      mimeType,
      size,
      threatLevel,
      timestamp: new Date().toISOString(),
    };
    forensicsLogs.push(entry);
    stats.totalForensicsAnalyses += 1;

    return res.json({
      threatLevel,
      analysis,
      raw: fullText,
      meta: { filename, mimeType, size },
    });
  } catch (err) {
    console.error("Forensics Error:", err);
    return res.status(500).json({ error: "Forensics analysis failed" });
  }
});

// ========= ADMIN STATS ENDPOINT =========
app.get("/admin/stats", (req, res) => {
  const lastChat = chatLogs.length ? chatLogs[chatLogs.length - 1] : null;
  const lastRecon = reconLogs.length ? reconLogs[reconLogs.length - 1] : null;
  const lastForensics = forensicsLogs.length
    ? forensicsLogs[forensicsLogs.length - 1]
    : null;

  res.json({
    stats,
    lastChat,
    lastRecon,
    lastForensics,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`AI Server running with Groq on port ${PORT}`)
);
