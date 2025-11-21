import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config({ path: "./.env" });

console.log("Current directory:", process.cwd());
console.log("Loaded GROQ Key:", process.env.GROQ_API_KEY);

const app = express();
app.use(cors());
app.use(express.json({ limit: "2mb" }));

// In-memory chat logs (for admin view)
const chatLogs = [];

// Groq client
const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Main AI endpoint
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

    const aiText = completion.choices[0]?.message?.content || "I could not generate a response.";

    // Log interaction for admin
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

// Admin: get logs
app.get("/ai/logs", (req, res) => {
  res.json({ logs: chatLogs.slice(-200) }); // last 200 messages
});

const PORT = 5000;
app.listen(PORT, () => console.log(`AI Server running with Groq on port ${PORT}`));
