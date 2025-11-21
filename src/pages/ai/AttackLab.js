import React from "react";

export default function AttackLab() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-green-400 mb-2">
        Attack Lab
      </h1>
      <p className="text-sm text-green-500 mb-4">
        Design, simulate and document attack chains. (Interactive payload builder coming soon)
      </p>

      <div className="border border-green-700 rounded-xl p-4 bg-black/60 text-sm text-green-300">
        <p>This area will include:</p>
        <ul className="list-disc pl-4 mt-2 space-y-1">
          <li>Payload generation & customization</li>
          <li>Attack path modeling</li>
          <li>Red team planning assistant</li>
        </ul>
        <p className="mt-3 text-green-500 text-xs">
          Use AI Assistant for now to generate payload ideas & explain attack vectors.
        </p>
      </div>
    </div>
  );
}
