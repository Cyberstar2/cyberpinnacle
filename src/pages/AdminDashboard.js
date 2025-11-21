import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://cyberpinnacle-backend.onrender.com"
    : "http://localhost:5000";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API_BASE}/admin/stats`);
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-green-400 pt-24 px-4">
        <p>Loading admin stats…</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-black text-green-400 pt-24 px-4">
        <p>Failed to load stats.</p>
      </div>
    );
  }

  const { stats, lastChat, lastRecon } = data;

  return (
    <div className="min-h-screen bg-black text-green-400 pt-24 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">
          CyberPinnacle Admin Dashboard
        </h1>
        <p className="text-sm text-green-500 mb-6">
          Overview of AI usage, recon activity and recent operations.
        </p>

        {/* Top stats cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <StatCard
            title="Total AI Chats"
            value={stats.totalChats}
            subtitle="Conversations handled by CyberPinnacle AI"
          />
          <StatCard
            title="Total Recon Requests"
            value={
              stats.totalReconIP +
              stats.totalReconDNS +
              stats.totalReconWHOIS +
              stats.totalReconSubdomains
            }
            subtitle="IP, DNS, WHOIS and Subdomain lookups"
          />
          <StatCard
            title="Subdomain Recon (AI)"
            value={stats.totalReconSubdomains}
            subtitle="AI-assisted subdomain planning calls"
          />
        </div>

        {/* Breakdown */}
        <div className="grid gap-4 md:grid-cols-2 mb-6">
          <BreakdownCard stats={stats} />
          <RecentActivityCard lastChat={lastChat} lastRecon={lastRecon} />
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-3 text-sm mt-4">
          <a
            href="/ai"
            className="px-3 py-2 border border-green-600 rounded-lg hover:bg-green-900/40"
          >
            Go to AI Assistant
          </a>
          <a
            href="/ai/recon"
            className="px-3 py-2 border border-green-600 rounded-lg hover:bg-green-900/40"
          >
            Open Recon Tools
          </a>
          <a
            href="/admin/logs"
            className="px-3 py-2 border border-green-600 rounded-lg hover:bg-green-900/40"
          >
            View Admin Logs
          </a>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle }) {
  return (
    <div className="border border-green-700 rounded-xl p-4 bg-black/60">
      <h2 className="text-sm font-semibold text-green-300 mb-1">{title}</h2>
      <p className="text-3xl font-bold text-green-400 mb-1">{value}</p>
      <p className="text-[11px] text-green-500">{subtitle}</p>
    </div>
  );
}

function BreakdownCard({ stats }) {
  return (
    <div className="border border-green-700 rounded-xl p-4 bg-black/60 text-sm">
      <h2 className="text-sm font-semibold text-green-300 mb-3">
        Recon Breakdown
      </h2>
      <ul className="space-y-1 text-green-400">
        <li>IP Info lookups: {stats.totalReconIP}</li>
        <li>DNS lookups: {stats.totalReconDNS}</li>
        <li>WHOIS lookups: {stats.totalReconWHOIS}</li>
        <li>Subdomain AI runs: {stats.totalReconSubdomains}</li>
      </ul>
      <p className="text-[11px] text-green-500 mt-3">
        These numbers reset when the server restarts (in-memory counters for now).
      </p>
    </div>
  );
}

function RecentActivityCard({ lastChat, lastRecon }) {
  return (
    <div className="border border-green-700 rounded-xl p-4 bg-black/60 text-sm">
      <h2 className="text-sm font-semibold text-green-300 mb-3">
        Recent Activity
      </h2>
      <div className="mb-3">
        <h3 className="text-xs font-semibold text-green-400 mb-1">
          Last AI Chat
        </h3>
        {lastChat ? (
          <div className="text-[11px] text-green-300 space-y-1">
            <p>
              <span className="font-semibold">Time:</span>{" "}
              {new Date(lastChat.timestamp).toLocaleString()}
            </p>
            <p className="line-clamp-2">
              <span className="font-semibold">Prompt:</span>{" "}
              {lastChat.prompt}
            </p>
          </div>
        ) : (
          <p className="text-[11px] text-green-500">No chats yet.</p>
        )}
      </div>

      <div>
        <h3 className="text-xs font-semibold text-green-400 mb-1">
          Last Recon Request
        </h3>
        {lastRecon ? (
          <div className="text-[11px] text-green-300 space-y-1">
            <p>
              <span className="font-semibold">Time:</span>{" "}
              {new Date(lastRecon.timestamp).toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Type:</span>{" "}
              {lastRecon.type}
            </p>
            <p className="line-clamp-1">
              <span className="font-semibold">Input:</span>{" "}
              {lastRecon.input}
            </p>
          </div>
        ) : (
          <p className="text-[11px] text-green-500">No recon yet.</p>
        )}
      </div>
    </div>
  );
}
