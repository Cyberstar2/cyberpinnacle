import React from "react";
import { FaRobot, FaBug, FaShieldAlt, FaNetworkWired } from "react-icons/fa";

export default function AIDashboardHome() {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-green-400 mb-2">
        CyberPinnacle AI Dashboard
      </h1>
      <p className="text-sm text-green-500 mb-6">
        Overview of your AI-powered cybersecurity operations.
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <DashboardCard
          icon={<FaRobot />}
          title="AI Assistant"
          desc="Chat with CyberPinnacle AI for any hacking, pentesting or defensive questions."
        />
        <DashboardCard
          icon={<FaNetworkWired />}
          title="Recon Tools"
          desc="Plan OSINT, port scans, DNS mapping & attack surface discovery."
        />
        <DashboardCard
          icon={<FaBug />}
          title="Attack Lab"
          desc="Design & simulate payloads, exploits and attack chains in a safe environment."
        />
        <DashboardCard
          icon={<FaShieldAlt />}
          title="Forensics Lab"
          desc="Analyze logs, traces and evidence to understand incidents."
        />
      </div>

      <div className="border border-green-700 rounded-xl p-4 bg-black/60">
        <h2 className="text-lg font-semibold text-green-300 mb-2">
          Getting Started
        </h2>
        <ul className="text-sm text-green-400 list-disc pl-5 space-y-1">
          <li>Go to <span className="font-semibold">AI Assistant</span> to chat with the model.</li>
          <li>Use <span className="font-semibold">Recon Tools</span> to plan engagements.</li>
          <li>Document findings and export them later under <span className="font-semibold">Reports</span>.</li>
          <li>Monitor activity via <span className="font-semibold">Admin Logs</span>.</li>
        </ul>
      </div>
    </div>
  );
}

function DashboardCard({ icon, title, desc }) {
  return (
    <div className="border border-green-700 rounded-xl p-4 bg-black/60">
      <div className="flex items-center gap-3 mb-2">
        <div className="text-green-400 text-xl">{icon}</div>
        <h3 className="font-semibold text-green-300 text-sm">{title}</h3>
      </div>
      <p className="text-xs text-green-500">{desc}</p>
    </div>
  );
}
