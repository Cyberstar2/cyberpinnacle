import React, { useState } from "react";

const LANG_OPTIONS = [
  { id: "bash", label: "1) Bash" },
  { id: "powershell", label: "2) PowerShell" },
  { id: "python", label: "3) Python" },
  { id: "php", label: "4) PHP" },
  { id: "netcat", label: "5) Netcat (nc)" },
  { id: "perl", label: "6) Perl" },
  { id: "ruby", label: "7) Ruby" },
];

const TEMPLATE_TEXT = {
  bash: [
    "### BASH PAYLOAD / SCRIPT TEMPLATE",
    "### For authorized lab use only – fill in logic yourself.",
    "",
    "# 1. Describe the purpose of this script:",
    "#    - e.g. connectivity test, logging, demo of a concept in lab.",
    "# 2. Add your own commands below.",
    "# 3. Never run outside authorized scope.",
    "",
    "# PSEUDOCODE structure example:",
    "#   - Read configuration (IP, port, options).",
    "#   - Connect to lab resource / internal service.",
    "#   - Log actions to a safe location.",
    "#   - Handle errors gracefully.",
    "",
    "# Insert your safe, lab-only logic below:",
    "# ...",
  ].join("\n"),

  powershell: [
    "### POWERSHELL SCRIPT TEMPLATE",
    "### For defensive / lab demonstration only.",
    "",
    "# 1. Define what you want to demonstrate:",
    "#    - e.g. registry auditing, process monitoring, log collection.",
    "# 2. Add safe operations only.",
    "# 3. Keep everything within test environment.",
    "",
    "param(",
    "    [string]$TargetHost = \"lab-host.local\",",
    "    [int]$Port = 0",
    ")",
    "",
    "# TODO:",
    "#   - Implement your own logic here (monitoring, auditing, demo tasks).",
    "#   - Avoid destructive actions.",
    "",
    "# Example pseudocode:",
    "#   - Test connectivity to $TargetHost.",
    "#   - Collect basic system info.",
    "#   - Export results to a log file for training/reporting.",
    "",
    "# Insert your logic below:",
    "# ...",
  ].join("\n"),

  python: [
    "### PYTHON SECURITY/LAB TEMPLATE",
    "### For scripting in training labs, not production attacks.",
    "",
    "import sys",
    "",
    "def main():",
    "    # 1. Clearly state your goal (e.g. log parser, PCAP analyser, scanner demo).",
    "    # 2. Implement safe, non-destructive operations.",
    "    # 3. Keep it inside your authorized scope.",
    "    target = \"lab-target\"",
    "    port = 0",
    "",
    "    # TODO:",
    "    #   - Replace placeholders with your own training logic.",
    "    #   - For example, parse logs, validate configs, simulate request flows, etc.",
    "    pass",
    "",
    "if __name__ == \"__main__\":",
    "    main()",
  ].join("\n"),

  php: [
    "### PHP SECURITY / LAB TEMPLATE",
    "### Demonstrate concepts in a safe lab application only.",
    "",
    "<?php",
    "// 1. Use this to demo input validation, logging, or safe coding practices.",
    "// 2. Do not deploy risky code on real systems.",
    "",
    "$config = [",
    "    'lab_mode' => true,",
    "    'description' => 'Training-only script',",
    "];",
    "",
    "// TODO:",
    "//   - Add server-side logic that enforces security best practices.",
    "//   - Example: validate parameters, sanitize input, log unusual behaviour.",
    "",
    "echo \"Lab template – implement your own safe logic here\";",
    "",
    "?>",
  ].join("\n"),

  netcat: [
    "### NETCAT / NETWORK TEMPLATE (TRAINING NOTES)",
    "### This is NOT a direct command generator – use as a note space.",
    "",
    "# Use this area to:",
    "#  - Record example nc commands you discuss during training.",
    "#  - Document how to test ports, banner grabbing, or connectivity in a lab.",
    "",
    "# Example topics you might document (do NOT blindly run commands):",
    "#  - Simple TCP connections to lab services.",
    "#  - Sending test data to custom lab listeners.",
    "#  - Demonstrating the importance of network monitoring.",
    "",
    "# Write your own lab-safe examples and notes below:",
    "# ...",
  ].join("\n"),

  perl: [
    "### PERL LAB SCRIPT TEMPLATE",
    "### Useful if you teach older environments or scripting basics.",
    "",
    "use strict;",
    "use warnings;",
    "",
    "# 1. Document the concept you want to demonstrate.",
    "# 2. Implement safe operations (parsing, logging, analysis, etc.).",
    "# 3. Avoid destructive behaviour.",
    "",
    "my $target = 'lab-target';",
    "my $port   = 0;",
    "",
    "# TODO:",
    "#   - Implement your own safe functions here.",
    "#   - e.g. parse log file, generate report, etc.",
    "",
    "print \"Perl lab template – add your own safe logic.\\n\";",
  ].join("\n"),

  ruby: [
    "### RUBY TRAINING TEMPLATE",
    "### For demonstrating scripting concepts in security labs.",
    "",
    "target = 'lab-target'",
    "port   = 0",
    "",
    "# 1. Describe what you are building (scanner, parser, analyzer, etc.).",
    "# 2. Ensure all actions are non-destructive and inside lab scope.",
    "# 3. Add comments so students understand each step.",
    "",
    "def run_lab_demo(target, port)",
    "  # TODO:",
    "  #   - Replace this with your own logic, e.g. reading files,",
    "  #     parsing data, or simulating benign requests.",
    "  puts \"Running lab demo for #{target} (port: #{port})\"",
    "end",
    "",
    "run_lab_demo(target, port)",
  ].join("\n"),
};

export default function AttackLab() {
  const [selectedLang, setSelectedLang] = useState("bash");
  const [copied, setCopied] = useState(false);
  const [inputChoice, setInputChoice] = useState("");

  const handleSelectByNumber = (value) => {
    setInputChoice(value);
    const trimmed = value.trim();

    const mapping = {
      "1": "bash",
      "2": "powershell",
      "3": "python",
      "4": "php",
      "5": "netcat",
      "6": "perl",
      "7": "ruby",
    };

    if (mapping[trimmed]) {
      setSelectedLang(mapping[trimmed]);
      setCopied(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(TEMPLATE_TEXT[selectedLang] || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const currentTemplate = TEMPLATE_TEXT[selectedLang] || "";

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Terminal Header */}
      <div className="border border-green-700 rounded-xl bg-black/80 overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 border-b border-green-800 bg-gradient-to-r from-green-950/60 to-black">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="w-2 h-2 rounded-full bg-yellow-500" />
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="ml-3 text-xs text-green-300 font-mono">
              CyberPinnacle Attack Terminal
            </span>
          </div>
          <span className="text-[10px] text-green-500 font-mono">
            mode: LAB / TRAINING ONLY
          </span>
        </div>

        {/* Terminal Body */}
        <div className="px-3 py-3 font-mono text-[12px] text-green-300 bg-black/90">
          <div className="mb-3">
            <pre className="whitespace-pre leading-4">
{String.raw`  /====================================================\
  |  CYBERPINNACLE ATTACK LAB (TERMINAL MODE)          |
  |  Authorized training & pentest planning only.      |
  \====================================================/`}
            </pre>
          </div>

          {/* Warning */}
          <div className="mb-3 text-[11px] text-green-400">
            <span className="text-red-400 font-semibold">WARNING:</span>{" "}
            This interface is for designing and documenting{" "}
            <span className="font-semibold">authorized</span> operations.
            You are responsible for staying within{" "}
            <span className="font-semibold">legal scope</span> at all times.
          </div>

          {/* Menu */}
          <div className="mb-2">
            <span className="text-green-400">> Select payload language template:</span>
            <pre className="mt-1 text-[11px] text-green-400">
{LANG_OPTIONS.map((opt) => opt.label).join("\n")}
            </pre>
          </div>

          {/* Input line */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-green-400">&gt;</span>
            <input
              className="flex-1 bg-transparent border-none outline-none text-green-300 text-[12px] font-mono"
              placeholder="Type number 1–7 and press Enter…"
              value={inputChoice}
              onChange={(e) => handleSelectByNumber(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSelectByNumber(inputChoice);
                }
              }}
            />
          </div>

          {/* Current selection info */}
          <div className="mb-2 text-[11px] text-green-500">
            Selected:{" "}
            <span className="font-semibold text-green-300">
              {
                LANG_OPTIONS.find((opt) => opt.id === selectedLang)?.label ||
                selectedLang
              }
            </span>
          </div>

          {/* Template box */}
          <div className="border border-green-800 rounded-lg bg-black/80 max-h-72 overflow-y-auto mb-3">
            <pre className="px-3 py-2 whitespace-pre-wrap text-[11px]">
              {currentTemplate}
            </pre>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 border border-green-500 rounded-md text-[11px] font-semibold hover:bg-green-900/40"
            >
              {copied ? "Copied ✓" : "Copy Template"}
            </button>
            <span className="text-[10px] text-green-500">
              Tip: As admin, you can replace these templates with your own
              private lab payload structures in the source code.
            </span>
          </div>

          {/* Footer note */}
          <div className="mt-2 text-[10px] text-green-600 border-t border-green-900 pt-2">
            This terminal does not generate live exploits. It provides
            structured templates so you can design, review and teach offensive
            techniques ethically inside controlled environments.
          </div>
        </div>
      </div>
    </div>
  );
}
