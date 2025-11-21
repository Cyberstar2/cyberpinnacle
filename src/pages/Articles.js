import React from "react";
import { Link } from "react-router-dom";

export default function Articles() {
  const topics = [
    { title: "IP Camera Hacking", path: "ip-camera-hacking" },
    { title: "Bluetooth Hacking", path: "bluetooth-hacking" },
    { title: "Wi-Fi Hacking", path: "wifi-hacking" },
    { title: "Mobile Hacking", path: "mobile-hacking" },
    { title: "Cybersecurity Tools", path: "cybersecurity-tools" },
    { title: "Network Exploitation", path: "network-exploitation" },
    { title: "Database Hacking", path: "database-hacking" },
    { title: "Anti-Forensics & OpSec", path: "anti-forensics" },
    { title: "OSINT & Reconnaissance", path: "osint" },
    { title: "Bug Bounty", path: "bug-bounty" },
    { title: "Mr. Robot Hacks", path: "mrrobot" },
    { title: "Metasploit", path: "metasploit" },
    { title: "Web Application Exploitation", path: "web-exploitation" },
    { title: "Vulnerability Scanning", path: "vuln-scanning" },
    { title: "Hacking Fundamentals", path: "fundamentals" },
    { title: "Bitcoin & Cryptocurrency Hacking", path: "crypto" },
    { title: "Malware Analysis", path: "malware" },
    { title: "Linux", path: "linux" },
  ];

  return (
    <div className="min-h-screen bg-black text-green-400 pt-32 px-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        Cybersecurity Articles & Hacking Tutorials
      </h1>

      <p className="text-center text-green-300 max-w-3xl mx-auto mb-12">
        Explore hands-on hacking tutorials, cybersecurity research, exploitation techniques
        and advanced penetration testing guides. Click a topic below to begin learning.
      </p>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {topics.map((topic, index) => (
          <Link
            key={index}
            to={`/articles/${topic.path}`}
            className="bg-gray-900 p-6 border border-green-500 rounded-xl hover:scale-105 transition cursor-pointer shadow-lg hover:shadow-green-400/20"
          >
            <h2 className="text-2xl font-bold text-center">{topic.title}</h2>
            <p className="text-green-300 text-center mt-2">Click to explore →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
