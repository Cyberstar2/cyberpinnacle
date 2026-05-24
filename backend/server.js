import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
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
   GEMINI SETUP
======================= */
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ Missing GEMINI_API_KEY");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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
   AI CHAT ENDPOINT (FIXED + STABLE)
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

    console.log("🧠 AI PROMPT:", prompt);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
    });

    let result;
    try {
      result = await model.generateContent(prompt);
    } catch (apiError) {
      console.error("❌ Gemini API Error:", apiError);

      return res.json({
        response: "⚠️ AI service is currently unavailable. Please try again shortly.",
      });
    }

    const response = await result.response;
    const text = response.text();

    console.log("🤖 AI RESPONSE:", text);

    broadcast({
      type: "AI_CHAT",
      message: "Gemini AI used",
      timestamp: new Date().toISOString(),
    });

    return res.json({ response: text });

  } catch (error) {
    console.error("❌ AI ROUTE ERROR:", error);

    return res.status(500).json({
      error: "AI generation failed",
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
const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

/* =======================
   WS UPGRADE
======================= */
server.on("upgrade", (req, socket, head) => {
  if (req.url === "/stream") {
    wss.handleUpgrade(req, socket, head, ws => {
      wss.emit("connection", ws, req);
    });
  } else {
    socket.destroy();
  }
});