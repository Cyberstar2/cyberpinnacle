import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

// Automatically switch between local server & deployed backend
const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://cyberpinnacle-backend.onrender.com"
    : "http://localhost:5000";

export default function CyberAI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem("cyberAI_messages");
    if (stored) {
      setMessages(JSON.parse(stored));
    } else {
      setMessages([
        {
          sender: "bot",
          text: "Welcome to CyberPinnacle AI.\nAsk cybersecurity, hacking, networking or forensic questions.",
          time: new Date().toLocaleTimeString(),
        },
      ]);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("cyberAI_messages", JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = {
      sender: "user",
      text: input,
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE}/ai`, {
        prompt: userMsg.text,
      });

      const botMsg = {
        sender: "bot",
        text: res.data.response || "No response from AI.",
        time: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Error: Unable to connect to AI server.",
          time: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-green-400">AI Assistant</h1>
        <p className="text-sm text-green-500">
          Chat with CyberPinnacle AI about exploits, networking, pentesting, bug bounty, forensics & more.
        </p>
      </header>

      <div
        ref={chatRef}
        className="flex-1 bg-gray-900 border border-green-700 rounded-xl p-4 overflow-y-auto space-y-3"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[80%] p-3 rounded-lg ${
              msg.sender === "user"
                ? "bg-green-500 text-black ml-auto"
                : "bg-black border border-green-500 text-green-200"
            }`}
          >
            <p className="whitespace-pre-wrap">{msg.text}</p>
            <p className="text-[10px] opacity-70 text-right mt-1">{msg.time}</p>
          </div>
        ))}

        {loading && (
          <div className="text-green-500 text-sm animate-pulse">AI is typing…</div>
        )}
      </div>

      <div className="mt-3 flex gap-3">
        <input
          className="flex-grow px-4 py-3 bg-transparent border border-green-500 rounded-lg outline-none text-green-300"
          placeholder="Ask anything…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-green-500 text-black font-bold px-6 py-3 rounded-lg hover:bg-green-400 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
