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

// In-memory chat logs
const chatLogs = [];

// Groq client
const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Simple health check (so / doesn't show "Cannot GET /")
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

    chatLogs.push({
      id: Date.now(),
      prompt,
      fileAttached: !!fileContent,
      response: aiText,
      timestamp: new Date().toISOString(),
    });

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

// 1) IP Info: uses ipwho.is
app.post("/recon/ip-info", async (req, res) => {
  try {
    const { target } = req.body;
    if (!target) return res.status(400).json({ error: "No IP provided" });

    const resp = await fetch(`https://ipwho.is/${encodeURIComponent(target)}`);
    const data = await resp.json();

    if (!data || data.success === false) {
      return res.status(400).json({ error: "Unable to fetch IP info" });
    }

    return res.json({ result: data });
  } catch (err) {
    console.error("IP Info Error:", err);
    return res.status(500).json({ error: "IP info lookup failed" });
  }
});

// 2) DNS Lookup: uses Google DNS
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

    return res.json({ result: data });
  } catch (err) {
    console.error("DNS Lookup Error:", err);
    return res.status(500).json({ error: "DNS lookup failed" });
  }
});

// 3) WHOIS via RDAP (no key)
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
    return res.json({ result: data });
  } catch (err) {
    console.error("WHOIS Error:", err);
    return res.status(500).json({ error: "WHOIS lookup failed" });
  }
});

// 4) Subdomain Recon (AI-assisted, not real scan)
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

    return res.json({ result: text });
  } catch (err) {
    console.error("Subdomains AI Error:", err);
    return res.status(500).json({ error: "Subdomain recon failed" });
  }
});

// ===========================================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`AI Server running with Groq on port ${PORT}`)
);
