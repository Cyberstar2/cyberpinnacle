import React, { useState } from "react";
import axios from "axios";

const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://cyberpinnacle-backend.onrender.com"
    : "http://localhost:5000";

export default function ForensicsLab() {
  const [file, setFile] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    setResult(null);
    setError("");
    setPreview("");

    if (!f) {
      setFile(null);
      setFileInfo(null);
      return;
    }

    setFile(f);
    setFileInfo({
      name: f.name,
      size: f.size,
      type: f.type || "unknown",
    });

    // Read as text (good for logs, txt, json, some pcaps)
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result?.toString() || "";
      // trim very large files
      const trimmed =
        text.length > 15000 ? text.slice(0, 15000) + "\n...[truncated]..." : text;
      setPreview(trimmed);
    };
    reader.onerror = () => {
      setError("Unable to read file. Try a smaller / text-based file.");
    };
    reader.readAsText(f);
  };

  const handleAnalyze = async () => {
    if (!file || !preview) {
      setError("Select a file first (logs, text, small PCAP, JSON, etc.)");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post(`${API_BASE}/forensics/analyze`, {
        filename: fileInfo.name,
        mimeType: fileInfo.type,
        size: fileInfo.size,
        contentPreview: preview,
      });

      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError("Forensics analysis failed. Try again or use a smaller file.");
    } finally {
      setLoading(false);
    }
  };

  const threatBadge = getThreatBadge(result?.threatLevel);

  const indicators = result ? extractIndicators(result.analysis || "") : null;

  return (
    <div className="w-full max-w-6xl mx-auto">
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-green-400">
          Forensics Lab
        </h1>
        <p className="text-sm text-green-500 max-w-3xl">
          Upload evidence (logs, small PCAPs, JSON exports, text reports) and
          let CyberPinnacle AI assist with high-level digital forensics
          interpretation.{" "}
          <span className="text-red-400 font-semibold">
            Do not upload real-world sensitive data here. Use lab / sanitized
            datasets only.
          </span>
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Left: File & Analysis */}
        <section className="border border-green-700 rounded-xl p-4 bg-black/70 text-sm">
          <h2 className="text-sm font-semibold text-green-300 mb-2">
            Evidence File
          </h2>

          {/* Dropzone */}
          <label
            className="block border border-dashed border-green-700 rounded-lg px-4 py-6 text-center cursor-pointer hover:border-green-400 hover:bg-green-900/20 transition"
          >
            <p className="text-green-300 text-sm">
              Drag & drop a file here or <span className="underline">click to browse</span>
            </p>
            <p className="text-[11px] text-green-500 mt-1">
              Recommended: .log, .txt, .json, small .pcap, .csv
            </p>
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {fileInfo && (
            <div className="mt-3 text-xs text-green-300 space-y-1">
              <p>
                <span className="font-semibold">Name:</span> {fileInfo.name}
              </p>
              <p>
                <span className="font-semibold">Type:</span> {fileInfo.type}
              </p>
              <p>
                <span className="font-semibold">Size:</span>{" "}
                {formatSize(fileInfo.size)}
              </p>
            </div>
          )}

          {preview && (
            <div className="mt-3">
              <p className="text-[11px] text-green-500 mb-1">
                Preview (first ~15KB of content):
              </p>
              <div className="border border-green-800 rounded-lg max-h-40 overflow-y-auto bg-black/80">
                <pre className="px-3 py-2 text-[11px] whitespace-pre-wrap text-green-200">
                  {preview}
                </pre>
              </div>
            </div>
          )}

          {error && (
            <p className="mt-3 text-[11px] text-red-400">
              {error}
            </p>
          )}

          <div className="mt-4">
            <button
              onClick={handleAnalyze}
              disabled={loading || !file}
              className="px-4 py-2 text-sm font-semibold rounded-lg border border-green-500 bg-green-500 text-black hover:bg-green-400 disabled:opacity-50"
            >
              {loading ? "Analyzing…" : "Analyze File"}
            </button>
          </div>

          <p className="mt-3 text-[11px] text-green-500">
            Note: Analysis is AI-assisted and approximate. Always confirm
            findings using your own tools (Wireshark, ELK, Volatility, etc.).
          </p>
        </section>

        {/* Right: Results & Indicators */}
        <section className="border border-green-700 rounded-xl p-4 bg-black/70 text-sm flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-green-300">
              Analysis & Threat Classification
            </h2>
            {threatBadge && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full border text-[11px] font-semibold"
                style={{ borderColor: threatBadge.border, color: threatBadge.color }}
              >
                <span>{threatBadge.icon}</span>
                <span>{threatBadge.label}</span>
              </span>
            )}
          </div>

          <div className="border border-green-800 rounded-lg flex-1 bg-black/80 max-h-64 overflow-y-auto mb-3">
            <pre className="px-3 py-2 text-[11px] whitespace-pre-wrap text-green-200">
              {loading
                ? "Running forensic analysis with CyberPinnacle AI…"
                : result
                ? result.analysis || "No detailed analysis text returned."
                : "Analysis output will appear here after you upload a file and click \"Analyze File\"."}
            </pre>
          </div>

          {/* Indicators */}
          <div className="grid gap-3 md:grid-cols-2 text-[11px]">
            <IndicatorCard title="IP Addresses" items={indicators?.ips} />
            <IndicatorCard title="Domains / Hostnames" items={indicators?.domains} />
            <IndicatorCard title="Email Addresses" items={indicators?.emails} />
            <IndicatorCard title="Possible Hashes / Tokens" items={indicators?.hashes} />
          </div>

          <p className="mt-3 text-[10px] text-green-600">
            This tool helps you triage and summarize evidence. It does not
            replace full forensic workflows, but gives a fast, human-readable
            starting point inside CyberPinnacle.
          </p>
        </section>
      </div>
    </div>
  );
}

function formatSize(bytes) {
  if (!bytes && bytes !== 0) return "unknown";
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(2)} MB`;
}

function getThreatBadge(level) {
  if (!level) return null;
  const lv = level.toString().toUpperCase();

  if (lv === "CRITICAL") {
    return {
      icon: "🟥",
      label: "CRITICAL",
      color: "#f87171",
      border: "#b91c1c",
    };
  }
  if (lv === "WARNING") {
    return {
      icon: "🟧",
      label: "WARNING",
      color: "#facc15",
      border: "#b45309",
    };
  }
  return {
    icon: "🟩",
    label: "INFO",
    color: "#4ade80",
    border: "#15803d",
  };
}

function extractIndicators(text) {
  if (!text) return {
    ips: [],
    domains: [],
    emails: [],
    hashes: [],
  };

  const ips = Array.from(
    new Set(
      (text.match(
        /\b(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)(?:\.(?=\.|$)|\.(?:(?:25[0-5]|2[0-4]\d|1?\d?\d))){3})\b/g
      ) || [])
    )
  );

  const domains = Array.from(
    new Set(
      (text.match(
        /\b[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+\b/g
      ) || [])
    )
  );

  const emails = Array.from(
    new Set(
      (text.match(
        /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g
      ) || [])
    )
  );

  const hashes = Array.from(
    new Set(
      (text.match(
        /\b[a-fA-F0-9]{32,64}\b/g
      ) || [])
    )
  );

  return { ips, domains, emails, hashes };
}

function IndicatorCard({ title, items }) {
  return (
    <div className="border border-green-800 rounded-lg bg-black/80 px-2 py-2 min-h-[70px]">
      <p className="font-semibold text-green-300 mb-1">{title}</p>
      {items && items.length > 0 ? (
        <ul className="list-disc list-inside space-y-0.5 text-green-200">
          {items.slice(0, 6).map((item, idx) => (
            <li key={idx} className="break-all">
              {item}
            </li>
          ))}
          {items.length > 6 && (
            <li className="text-[10px] text-green-500">
              + {items.length - 6} more…
            </li>
          )}
        </ul>
      ) : (
        <p className="text-[10px] text-green-600">
          None detected in current summary.
        </p>
      )}
    </div>
  );
}
