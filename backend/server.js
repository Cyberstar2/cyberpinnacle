import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import { WebSocketServer } from "ws";

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

app.use(express.json({ limit: "5mb" }));

/* =======================
   OPENAI SETUP
======================= */
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ Missing OPENAI_API_KEY");
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/* =======================
   IN-MEMORY DATA
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
   WEBSOCKET (SOC)
======================= */
const wss = new WebSocketServer({ noServer: true });

const broadcast = (payload) => {
  const msg = JSON.stringify(payload);
  wss.clients.forEach(client => {
    if (client.readyState === 1) {
      client.send(msg);
    }
  });
};

/* =======================
   HEALTH CHECK
======================= */
app.get("/", (req, res) => {
  res.send("🚀 CyberPinnacle AI Backend Online");
});

/* =======================
   AI CHAT ENDPOINT (OPENAI)
======================= */
app.post("/ai", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt required" });
    }

    adminStats.totalChats++;

    lastChat = {
      prompt,
      timestamp: new Date().toISOString(),
    };

    console.log("🧠 PROMPT:", prompt);

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are CyberPinnacle AI, a cybersecurity assistant specialized in ethical hacking, penetration testing, networking, digital forensics, and cybersecurity education.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const text = response.choices[0].message.content;

    console.log("🤖 RESPONSE:", text);

    broadcast({
      type: "AI_CHAT",
      message: "OpenAI used",
      timestamp: new Date().toISOString(),
    });

    return res.json({ response: text });

  } catch (error) {
    console.error("❌ OpenAI ERROR:", error);

    return res.status(500).json({
      response: "⚠️ AI temporarily unavailable. Try again later.",
      error: error.message,
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
   RECON EVENT
======================= */
app.post("/recon/event", (req, res) => {
  adminStats.totalReconIP++;

  lastRecon = {
    type: "IP Lookup",
    input: req.body.query || "unknown",
    timestamp: new Date().toISOString(),
  };

  broadcast({
    type: "RECON",
    message: "Recon activity detected",
    timestamp: new Date().toISOString(),
  });

  res.json({ success: true });
});

/* =======================
   OTP PLACEHOLDER
======================= */
app.post("/send-otp", (req, res) => {
  console.log(`📩 OTP requested for ${req.body.email}`);
  res.json({ success: true });
});

/* =======================
   SERVER START
======================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});