import React from "react";

export default function ReconTools() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-green-400 mb-2">
        Recon Tools
      </h1>
      <p className="text-sm text-green-500 mb-4">
        Plan OSINT, enumeration & surface mapping. (Interactive tools coming soon)
      </p>

      <div className="border border-green-700 rounded-xl p-4 bg-black/60 text-sm text-green-300">
        <p>
          This section will host UI around:
        </p>
        <ul className="list-disc pl-4 mt-2 space-y-1">
          <li>Domain & subdomain reconnaissance</li>
          <li>Port & service enumeration (Nmap-style)</li>
          <li>DNS, WHOIS and IP intelligence</li>
        </ul>
        <p className="mt-3 text-green-500 text-xs">
          For now, use the AI Assistant to generate recon plans & commands.
        </p>
      </div>
    </div>
  );
}
