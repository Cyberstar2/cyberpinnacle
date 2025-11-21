import React from "react";

export default function ForensicsLab() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-green-400 mb-2">
        Forensics Lab
      </h1>
      <p className="text-sm text-green-500 mb-4">
        Analyze evidence, logs & traces. (File upload & deep analysis coming soon)
      </p>

      <div className="border border-green-700 rounded-xl p-4 bg-black/60 text-sm text-green-300">
        <p>Planned capabilities:</p>
        <ul className="list-disc pl-4 mt-2 space-y-1">
          <li>Log file analysis (web, auth, system)</li>
          <li>Timeline reconstruction of incidents</li>
          <li>Automatic summary & reporting</li>
        </ul>
        <p className="mt-3 text-green-500 text-xs">
          You can already paste logs into the AI Assistant and ask for forensic review.
        </p>
      </div>
    </div>
  );
}
