import React, { useEffect, useState } from "react";

export default function SOCMonitor() {
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState("Connecting...");

  useEffect(() => {
    const wsUrl =
      process.env.NODE_ENV === "production"
        ? "wss://cyberpinnacle-backend.onrender.com/stream"
        : "ws://localhost:5000/stream";

    console.log("Connecting to WebSocket:", wsUrl);

    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("WS Connected");
      setStatus("Connected");
    };

    ws.onerror = (err) => {
      console.error("WS Error:", err);
      setStatus("Connection Error");
    };

    ws.onclose = () => {
      console.warn("WS Closed");
      setStatus("Disconnected");
    };

    ws.onmessage = (msg) => {
      try {
        const data = JSON.parse(msg.data);
        setEvents((prev) => [...prev, data]);
      } catch (err) {
        console.error("Failed to parse WS message:", err);
      }
    };

    return () => ws.close();
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-400 p-6">
      <h1 className="text-3xl font-bold mb-4">CyberPinnacle SOC – Live Monitor</h1>
      <p className="text-green-500 mb-2">Real-time security events streaming directly from backend</p>
      <p className="text-xs text-green-300 opacity-80 mb-6">Status: {status}</p>

      <div className="border border-green-700 rounded-lg p-4 h-[70vh] overflow-y-auto space-y-3 bg-black/50">
        {events.length === 0 && (
          <p className="text-green-600 text-sm">Waiting for events… (Try running IP Lookup or AI chat)</p>
        )}

        {events.map((evt, index) => (
          <div key={index} className="p-3 border border-green-700 rounded-lg bg-black/40">
            <p className="text-sm">
              <span className="font-bold text-green-300">{evt.type?.toUpperCase()}</span> — {evt.message}
            </p>
            <p className="text-[11px] opacity-70 mt-1">
              {new Date(evt.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
