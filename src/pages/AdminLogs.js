import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/ai/logs");
        setLogs(res.data.logs || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-400 pt-24 px-4">
      <h1 className="text-2xl font-bold mb-4">CyberPinnacle AI – Chat Logs</h1>
      <p className="text-sm text-green-500 mb-6">
        Internal admin view of recent AI conversations (last 200).
      </p>

      {loading ? (
        <p>Loading logs…</p>
      ) : logs.length === 0 ? (
        <p>No logs yet.</p>
      ) : (
        <div className="overflow-x-auto border border-green-700 rounded-xl">
          <table className="w-full text-sm">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-3 py-2 border-b border-green-700 text-left">Time</th>
                <th className="px-3 py-2 border-b border-green-700 text-left">Prompt</th>
                <th className="px-3 py-2 border-b border-green-700 text-left">File?</th>
                <th className="px-3 py-2 border-b border-green-700 text-left">Response</th>
              </tr>
            </thead>
            <tbody>
              {logs
                .slice()
                .reverse()
                .map((log) => (
                  <tr key={log.id} className="odd:bg-black even:bg-gray-950">
                    <td className="px-3 py-2 align-top">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="px-3 py-2 align-top max-w-xs break-words">
                      {log.prompt}
                    </td>
                    <td className="px-3 py-2 align-top">
                      {log.fileAttached ? "✅" : "—"}
                    </td>
                    <td className="px-3 py-2 align-top max-w-md break-words">
                      {log.response}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
