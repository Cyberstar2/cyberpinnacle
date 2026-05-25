import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";
import { WebSocketServer } from "ws";
import axios from "axios";

dotenv.config();

/* =======================
   APP SETUP
======================= */
const app = express();

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://thecyberpinnacle.com",
    "https://www.thecyberpinnacle.com",
  ],
  credentials: true,
}));

app.use(express.json({ limit: "10mb" }));

/* =======================
   GROQ SETUP
======================= */
if (!process.env.GROQ_API_KEY) {
  console.error("❌ Missing GROQ_API_KEY");
  process.exit(1);
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/* =======================
   MEMORY STORAGE
======================= */
let adminStats = {
  totalChats: 0,
  totalReconIP: 0,
  totalReconDNS: 0,
  totalReconWHOIS: 0,
  totalReconSubdomains: 0,
  totalForensicsAnalyses: 0,
};

let lastChat = null;
let lastRecon = null;
let lastForensics = null;

/* =======================
   WEBSOCKET
======================= */
const wss = new WebSocketServer({ noServer: true });

const broadcast = (payload) => {
  const msg = JSON.stringify(payload);

  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(msg);
    }
  });
};

/* =======================
   HEALTH CHECK
======================= */
app.get("/", (req, res) => {
  res.send("🚀 CyberPinnacle Backend Online");
});

/* =======================
   AI CHAT
======================= */
app.post("/ai", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: "Prompt required",
      });
    }

    adminStats.totalChats++;

    lastChat = {
      prompt,
      timestamp: new Date().toISOString(),
    };

    console.log("🧠 PROMPT:", prompt);

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are CyberPinnacle AI, an elite cybersecurity AI assistant specialized in ethical hacking, SOC operations, DFIR, networking, penetration testing, malware analysis, Linux, cloud security and cybersecurity education. Never assist illegal activity.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const text =
      completion.choices[0]?.message?.content ||
      "No response generated.";

    console.log("🤖 RESPONSE:", text);

    broadcast({
      type: "AI_CHAT",
      message: "AI interaction",
      timestamp: new Date().toISOString(),
    });

    return res.json({
      response: text,
    });

  } catch (error) {
    console.error("❌ AI ERROR:", error);

    return res.status(500).json({
      response: "⚠️ AI temporarily unavailable.",
      error: error.message,
    });
  }
});

/* =======================
   IP LOOKUP
======================= */
app.post("/recon/ip-info", async (req, res) => {
  try {
    const { target } = req.body;

    if (!target) {
      return res.status(400).json({
        error: "Target IP required",
      });
    }

    adminStats.totalReconIP++;

    const response = await axios.get(
      `https://ipwho.is/${target}`
    );

    lastRecon = {
      type: "IP Lookup",
      input: target,
      timestamp: new Date().toISOString(),
    };

    return res.json({
      result: response.data,
    });

  } catch (error) {
    console.error("❌ IP LOOKUP ERROR:", error.message);

    return res.status(500).json({
      error: "IP lookup failed",
    });
  }
});

/* =======================
   DNS LOOKUP
======================= */
app.post("/recon/dns-lookup", async (req, res) => {
  try {
    const { domain } = req.body;

    if (!domain) {
      return res.status(400).json({
        error: "Domain required",
      });
    }

    adminStats.totalReconDNS++;

    const response = await axios.get(
      `https://dns.google/resolve?name=${domain}&type=A`
    );

    lastRecon = {
      type: "DNS Lookup",
      input: domain,
      timestamp: new Date().toISOString(),
    };

    return res.json({
      result: response.data,
    });

  } catch (error) {
    console.error("❌ DNS LOOKUP ERROR:", error.message);

    return res.status(500).json({
      error: "DNS lookup failed",
    });
  }
});

/* =======================
   WHOIS / RDAP
======================= */
app.post("/recon/whois", async (req, res) => {
  try {
    const { domain } = req.body;

    if (!domain) {
      return res.status(400).json({
        error: "Domain required",
      });
    }

    adminStats.totalReconWHOIS++;

    const response = await axios.get(
      `https://rdap.org/domain/${domain}`
    );

    lastRecon = {
      type: "WHOIS",
      input: domain,
      timestamp: new Date().toISOString(),
    };

    return res.json({
      result: response.data,
    });

  } catch (error) {
    console.error("❌ WHOIS ERROR:", error.message);

    return res.status(500).json({
      error: "WHOIS lookup failed",
    });
  }
});

/* =======================
   SUBDOMAIN AI RECON
======================= */
app.post("/recon/subdomains-ai", async (req, res) => {
  try {
    const { domain } = req.body;

    if (!domain) {
      return res.status(400).json({
        error: "Domain required",
      });
    }

    adminStats.totalReconSubdomains++;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are a cybersecurity reconnaissance assistant helping students learn ethical recon techniques safely.",
        },
        {
          role: "user",
          content: `
Generate:
1. Common subdomains for ${domain}
2. Safe recon methodology
3. Recommended recon tools
4. Example amass/subfinder commands
5. Bug bounty recon tips

Do not provide illegal exploitation guidance.
          `,
        },
      ],
    });

    const text =
      completion.choices[0]?.message?.content ||
      "No recon generated.";

    lastRecon = {
      type: "Subdomain Recon",
      input: domain,
      timestamp: new Date().toISOString(),
    };

    return res.json({
      result: text,
    });

  } catch (error) {
    console.error("❌ SUBDOMAIN ERROR:", error);

    return res.status(500).json({
      error: "Subdomain recon failed",
    });
  }
});

/* =======================
   FORENSICS ANALYSIS
======================= */
app.post("/forensics/analyze", async (req, res) => {
  try {
    const {
      filename,
      mimeType,
      size,
      contentPreview,
    } = req.body;

    if (!contentPreview) {
      return res.status(400).json({
        error: "File content required",
      });
    }

    adminStats.totalForensicsAnalyses++;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are a DFIR analyst AI specialized in malware triage, log analysis, SIEM investigation and incident response.",
        },
        {
          role: "user",
          content: `
Analyze this evidence safely.

Filename: ${filename}
Type: ${mimeType}
Size: ${size}

Content:
${contentPreview}

Return:
1. Summary
2. Threat indicators
3. Suspicious activity
4. Severity
5. Recommendations
          `,
        },
      ],
    });

    const analysis =
      completion.choices[0]?.message?.content ||
      "No analysis generated.";

    let threatLevel = "INFO";

    const lower = analysis.toLowerCase();

    if (
      lower.includes("malware") ||
      lower.includes("critical") ||
      lower.includes("ransomware") ||
      lower.includes("credential theft")
    ) {
      threatLevel = "CRITICAL";
    } else if (
      lower.includes("suspicious") ||
      lower.includes("warning") ||
      lower.includes("unauthorized")
    ) {
      threatLevel = "WARNING";
    }

    lastForensics = {
      id: Date.now(),
      filename,
      mimeType,
      size,
      analysis,
      threatLevel,
      timestamp: new Date().toISOString(),
    };

    broadcast({
      type: "FORENSICS",
      message: "Forensics analysis completed",
      timestamp: new Date().toISOString(),
    });

    return res.json(lastForensics);

  } catch (error) {
    console.error("❌ FORENSICS ERROR:", error);

    return res.status(500).json({
      error: "Forensics analysis failed",
    });
  }
});

/* =======================
   ADMIN STATS
======================= */
app.get("/admin/stats", (req, res) => {
  res.json({
    stats: adminStats,
    lastChat,
    lastRecon,
    lastForensics,
  });
});

/* =======================
   OTP PLACEHOLDER
======================= */
app.post("/send-otp", (req, res) => {
  console.log(`📩 OTP requested for ${req.body.email}`);

  res.json({
    success: true,
  });
});

/* =======================
   SERVER START
======================= */
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

/* =======================
   WEBSOCKET UPGRADE
======================= */
server.on("upgrade", (req, socket, head) => {
  if (req.url === "/stream") {
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit("connection", ws, req);
    });
  } else {
    socket.destroy();
  }
});