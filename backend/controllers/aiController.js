import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const cyberAI = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI failed to respond" });
  }
};
