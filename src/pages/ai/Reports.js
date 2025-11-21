import React from "react";

export default function Reports() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-green-400 mb-2">
        Reports
      </h1>
      <p className="text-sm text-green-500 mb-4">
        Central place for engagement reports, summaries & exports.
      </p>

      <div className="border border-green-700 rounded-xl p-4 bg-black/60 text-sm text-green-300">
        <p>
          Future features here:
        </p>
        <ul className="list-disc pl-4 mt-2 space-y-1">
          <li>Auto-generate pentest reports from chat history</li>
          <li>Export to PDF/Markdown</li>
          <li>Store engagement notes and findings</li>
        </ul>
        <p className="mt-3 text-green-500 text-xs">
          For now, you can ask the AI Assistant to draft a report from your conversation.
        </p>
      </div>
    </div>
  );
}
