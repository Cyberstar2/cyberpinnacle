// sayfullah
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";
import { WebSocketServer } from "ws";

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

// In-memory logs & stats
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

// --- WEBSOCKET SERVER (Real-Time SOC Monitor) ---
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`AI & SOC Server running on port ${PORT}`)
);

const wss = new WebSocketServer({ server, path: "/stream" });


function broadcastEvent(event) {
  const message = JSON.stringify(event);
  wss.clients.forEach((client) => {
    try {
      client.send(message);
    } catch (err) {
      console.error("WS Send Error:", err);
    }
  });
}

wss.on("connection", () => {
  console.log("📡 Admin SOC connected");
});

function logEvent(type, message, meta = {}) {
  const event = {
    type,
    message,
    meta,
    timestamp: Date.now(),
  };
  broadcastEvent(event);
  console.log("SOC Event:", event);
}

// Root health-check
app.get("/", (req, res) => {
  res.send("CyberPinnacle AI Backend Running - WebSocket Online");
});

// ===== MAIN AI CHAT ENDPOINT =====
app.post("/ai", async (req, res) => {
  try {
    const { prompt, fileContent } = req.body;
    logEvent("ai", `AI Question: ${prompt.slice(0, 80)}...`);


    let finalPrompt = prompt;
    if (fileContent) {
      finalPrompt = `
You are CyberPinnacle AI, a cybersecurity assistant.
The user uploaded a file:
${fileContent}

Now respond to their question:
${prompt}
`.trim();
    }

    logEvent("ai", `AI question received: ${prompt.slice(0, 80)}...`);

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: finalPrompt }],
      temperature: 0.4,
    });

    const aiText =
      completion.choices[0]?.message?.content ||
      "I could not generate a response.";

    chatLogs.push({ id: Date.now(), prompt, timestamp: new Date().toISOString() });
    stats.totalChats++;

    res.json({ response: aiText });
  } catch (err) {
    console.error("AI Error:", err);
    res.status(500).json({ error: "AI Server Error" });
  }
});

// ===== ADMIN LOGS =====
app.get("/ai/logs", (req, res) => {
  res.json({ logs: chatLogs.slice(-200) });
});

// ===== RECON TOOLS =====

// IP INFO
app.post("/recon/ip-info", async (req, res) => {
  try {
    const { target } = req.body;
    if (!target) return res.status(400).json({ error: "No IP provided" });

    const resp = await fetch(`https://ipwho.is/${encodeURIComponent(target)}`);
    const data = await resp.json();

    if (!data || data.success === false) {
      return res.status(400).json({ error: "Unable to fetch IP info" });
    }

    logEvent("recon", `IP lookup on ${target}`);
    reconLogs.push({ id: Date.now(), type: "ip-info", input: target });
    stats.totalReconIP++;

    res.json({ result: data });
  } catch (err) {
    res.status(500).json({ error: "IP info lookup failed" });
  }
});

// DNS LOOKUP
app.post("/recon/dns-lookup", async (req, res) => {
  try {
    const { domain } = req.body;

    logEvent("recon", `DNS lookup on ${domain}`);
    reconLogs.push({ id: Date.now(), type: "dns-lookup", input: domain });
    stats.totalReconDNS++;

    const resp = await fetch(
      `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=A`
    );
    const data = await resp.json();
    res.json({ result: data });
  } catch (err) {
    res.status(500).json({ error: "DNS lookup failed" });
  }
});

// WHOIS LOOKUP
app.post("/recon/whois", async (req, res) => {
  try {
    const { domain } = req.body;

    logEvent("recon", `WHOIS lookup on ${domain}`);
    reconLogs.push({ id: Date.now(), type: "whois", input: domain });
    stats.totalReconWHOIS++;

    const resp = await fetch(`https://rdap.org/domain/${encodeURIComponent(domain)}`);
    const data = await resp.json();
    res.json({ result: data });
  } catch (err) {
    res.status(500).json({ error: "WHOIS lookup failed" });
  }
});

// SUBDOMAIN AI
app.post("/recon/subdomains-ai", async (req, res) => {
  try {
    const { domain } = req.body;

    logEvent("recon", `Subdomain recon AI for ${domain}`);
    reconLogs.push({ id: Date.now(), type: "subdomains-ai", input: domain });
    stats.totalReconSubdomains++;

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: `List subdomains for ${domain}` }],
    });

    res.json({ result: completion.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: "Subdomain recon failed" });
  }
});

// FORENSICS
app.post("/forensics/analyze", async (req, res) => {
  try {
    const { filename, size, contentPreview } = req.body;

    logEvent("forensics", `Forensic analysis started on ${filename}`);

    stats.totalForensicsAnalyses++;
    forensicsLogs.push({ id: Date.now(), filename });

    res.json({ threatLevel: "INFO", analysis: "Demo processing" });
  } catch (err) {
    res.status(500).json({ error: "Forensics failed" });
  }
});

// ADMIN STATS
app.get("/admin/stats", (req, res) => {
  res.json({
    stats,
    lastChat: chatLogs.at(-1) || null,
    lastRecon: reconLogs.at(-1) || null,
    lastForensics: forensicsLogs.at(-1) || null,
  });
});
