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
app.use(express.json({ limit: "5mb" }));

// WebSocket setup
const wss = new WebSocketServer({ noServer: true });

const broadcast = (event) => {
  const json = JSON.stringify(event);
  wss.clients.forEach((client) => {
    if (client.readyState === 1) client.send(json);
  });

  console.log("🔥 SOC Event:", event);
};

// function to standardize events
const logEvent = (type, message) => {
  const event = { type, message, timestamp: new Date().toISOString() };
  broadcast(event);
};

// MEMORY LOGS
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

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Root test
app.get("/", (req, res) => {
  res.send("CyberPinnacle AI Backend Running");
});

// AI Chat endpoint
app.post("/ai", async (req, res) => {
  try {
    const { prompt } = req.body;

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
    });

    const aiText =
      completion.choices[0]?.message?.content ||
      "Unable to respond";

    chatLogs.push({
      id: Date.now(),
      prompt,
      response: aiText,
      timestamp: new Date().toISOString(),
    });

    stats.totalChats += 1;

    // 🔥 SEND EVENT TO SOC
    logEvent("ai", `AI Query: "${prompt}"`);

    return res.json({ response: aiText });
  } catch (err) {
    console.error("AI Error:", err);
    return res.status(500).json({ error: "AI Error" });
  }
});

// WebSocket upgrade handler
const server = app.listen(process.env.PORT || 5000, () =>
  console.log(`AI Server running with Groq on port ${process.env.PORT || 5000}`)
);

server.on("upgrade", (req, socket, head) => {
  if (req.url === "/stream") {
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit("connection", ws, req);
    });
  } else {
    socket.destroy();
  }
});
