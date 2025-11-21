import React, { useState } from "react";
import axios from "axios";

const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://cyberpinnacle-backend.onrender.com"
    : "http://localhost:5000";

export default function ReconTools() {
  const [ipTarget, setIpTarget] = useState("");
  const [ipResult, setIpResult] = useState(null);
  const [ipLoading, setIpLoading] = useState(false);

  const [dnsDomain, setDnsDomain] = useState("");
  const [dnsResult, setDnsResult] = useState(null);
  const [dnsLoading, setDnsLoading] = useState(false);

  const [whoisDomain, setWhoisDomain] = useState("");
  const [whoisResult, setWhoisResult] = useState(null);
  const [whoisLoading, setWhoisLoading] = useState(false);

  const [subDomain, setSubDomain] = useState("");
  const [subResult, setSubResult] = useState("");
  const [subLoading, setSubLoading] = useState(false);

  const handleIpLookup = async () => {
    if (!ipTarget.trim()) return;
    setIpLoading(true);
    setIpResult(null);
    try {
      const res = await axios.post(`${API_BASE}/recon/ip-info`, {
        target: ipTarget.trim(),
      });
      setIpResult(res.data.result);
    } catch (err) {
      console.error(err);
      setIpResult({ error: "Failed to fetch IP info" });
    } finally {
      setIpLoading(false);
    }
  };

  const handleDnsLookup = async () => {
    if (!dnsDomain.trim()) return;
    setDnsLoading(true);
    setDnsResult(null);
    try {
      const res = await axios.post(`${API_BASE}/recon/dns-lookup`, {
        domain: dnsDomain.trim(),
      });
      setDnsResult(res.data.result);
    } catch (err) {
      console.error(err);
      setDnsResult({ error: "Failed to run DNS lookup" });
    } finally {
      setDnsLoading(false);
    }
  };

  const handleWhoisLookup = async () => {
    if (!whoisDomain.trim()) return;
    setWhoisLoading(true);
    setWhoisResult(null);
    try {
      const res = await axios.post(`${API_BASE}/recon/whois`, {
        domain: whoisDomain.trim(),
      });
      setWhoisResult(res.data.result);
    } catch (err) {
      console.error(err);
      setWhoisResult({ error: "WHOIS lookup failed" });
    } finally {
      setWhoisLoading(false);
    }
  };

  const handleSubdomains = async () => {
    if (!subDomain.trim()) return;
    setSubLoading(true);
    setSubResult("");
    try {
      const res = await axios.post(`${API_BASE}/recon/subdomains-ai`, {
        domain: subDomain.trim(),
      });
      setSubResult(res.data.result || "No response from AI.");
    } catch (err) {
      console.error(err);
      setSubResult("Subdomain recon failed.");
    } finally {
      setSubLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-green-400 mb-2">
        Recon Tools
      </h1>
      <p className="text-sm text-green-500 mb-6">
        Lightweight reconnaissance helpers for IP intel, DNS records, WHOIS and AI-assisted subdomain planning. 
        Use these as support, not as a replacement for your real recon tools (nmap, amass, subfinder, etc.).
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {/* IP Info */}
        <Card title="IP Info (ipwho.is)" description="Basic IP intelligence – location, ISP, ASN, etc.">
          <div className="flex gap-2 mb-2">
            <input
              className="flex-1 px-3 py-2 bg-transparent border border-green-600 rounded text-sm text-green-200 outline-none"
              placeholder="e.g. 8.8.8.8 or 1.1.1.1"
              value={ipTarget}
              onChange={(e) => setIpTarget(e.target.value)}
            />
            <button
              onClick={handleIpLookup}
              disabled={ipLoading}
              className="px-3 py-2 text-sm bg-green-500 text-black font-semibold rounded hover:bg-green-400 disabled:opacity-60"
            >
              {ipLoading ? "Looking…" : "Lookup"}
            </button>
          </div>
          <ResultBox>
            {ipLoading && <p>Loading IP info…</p>}
            {!ipLoading && ipResult && (
              <pre className="text-xs whitespace-pre-wrap">
                {JSON.stringify(ipResult, null, 2)}
              </pre>
            )}
          </ResultBox>
        </Card>

        {/* DNS Lookup */}
        <Card title="DNS Lookup (A Records)" description="Query A records via Google DNS (dns.google).">
          <div className="flex gap-2 mb-2">
            <input
              className="flex-1 px-3 py-2 bg-transparent border border-green-600 rounded text-sm text-green-200 outline-none"
              placeholder="e.g. google.com"
              value={dnsDomain}
              onChange={(e) => setDnsDomain(e.target.value)}
            />
            <button
              onClick={handleDnsLookup}
              disabled={dnsLoading}
              className="px-3 py-2 text-sm bg-green-500 text-black font-semibold rounded hover:bg-green-400 disabled:opacity-60"
            >
              {dnsLoading ? "Resolving…" : "Resolve"}
            </button>
          </div>
          <ResultBox>
            {dnsLoading && <p>Running DNS lookup…</p>}
            {!dnsLoading && dnsResult && (
              <pre className="text-xs whitespace-pre-wrap">
                {JSON.stringify(dnsResult, null, 2)}
              </pre>
            )}
          </ResultBox>
        </Card>

        {/* WHOIS / RDAP */}
        <Card title="WHOIS / RDAP" description="Fetch domain registration details over RDAP.">
          <div className="flex gap-2 mb-2">
            <input
              className="flex-1 px-3 py-2 bg-transparent border border-green-600 rounded text-sm text-green-200 outline-none"
              placeholder="e.g. example.com"
              value={whoisDomain}
              onChange={(e) => setWhoisDomain(e.target.value)}
            />
            <button
              onClick={handleWhoisLookup}
              disabled={whoisLoading}
              className="px-3 py-2 text-sm bg-green-500 text-black font-semibold rounded hover:bg-green-400 disabled:opacity-60"
            >
              {whoisLoading ? "Querying…" : "Lookup"}
            </button>
          </div>
          <ResultBox>
            {whoisLoading && <p>Running WHOIS/RDAP…</p>}
            {!whoisLoading && whoisResult && (
              <pre className="text-xs whitespace-pre-wrap">
                {JSON.stringify(whoisResult, null, 2)}
              </pre>
            )}
          </ResultBox>
        </Card>

        {/* Subdomains (AI-assisted) */}
        <Card
          title="Subdomain Recon (AI-assisted)"
          description="Get likely subdomains + recon commands from CyberPinnacle AI."
        >
          <div className="flex gap-2 mb-2">
            <input
              className="flex-1 px-3 py-2 bg-transparent border border-green-600 rounded text-sm text-green-200 outline-none"
              placeholder="e.g. target.com"
              value={subDomain}
              onChange={(e) => setSubDomain(e.target.value)}
            />
            <button
              onClick={handleSubdomains}
              disabled={subLoading}
              className="px-3 py-2 text-sm bg-green-500 text-black font-semibold rounded hover:bg-green-400 disabled:opacity-60"
            >
              {subLoading ? "Asking AI…" : "Generate"}
            </button>
          </div>
          <ResultBox>
            {subLoading && <p>Generating recon plan…</p>}
            {!subLoading && subResult && (
              <pre className="text-xs whitespace-pre-wrap">
                {subResult}
              </pre>
            )}
          </ResultBox>
        </Card>
      </div>
    </div>
  );
}

function Card({ title, description, children }) {
  return (
    <div className="border border-green-700 rounded-xl p-4 bg-black/60 text-sm text-green-200">
      <h2 className="text-sm font-semibold text-green-300 mb-1">
        {title}
      </h2>
      <p className="text-xs text-green-500 mb-3">{description}</p>
      {children}
    </div>
  );
}

function ResultBox({ children }) {
  return (
    <div className="mt-2 min-h-[80px] max-h-64 overflow-y-auto border border-green-800 rounded bg-black/70 px-2 py-1">
      {children}
    </div>
  );
}
