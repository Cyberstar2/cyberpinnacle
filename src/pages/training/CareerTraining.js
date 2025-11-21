import React from "react";
import { Link } from "react-router-dom";

export default function CareerTraining() {
  const roadmap = [
    {
      title: "Beginner Level",
      color: "border-green-400",
      desc: "Fundamentals required to start a cybersecurity journey.",
      modules: [
        "Introduction to Cybersecurity",
        "Linux Basics & Command Line",
        "Networking Fundamentals",
        "Cybersecurity Tools Overview",
        "Beginner CTF challenges",
      ],
      button: "Start Beginner Path",
    },
    {
      title: "Intermediate Level",
      color: "border-blue-400",
      desc: "Hands-on practical cybersecurity training and tools usage.",
      modules: [
        "Kali Linux for Penetration Testing",
        "Vulnerability Scanning & Reporting",
        "Web App Exploitation (OWASP)",
        "Wireless Attacks & OSINT",
        "Intermediate CTF challenges",
      ],
      button: "Start Intermediate Path",
    },
    {
      title: "Advanced / Red Team",
      color: "border-red-500",
      desc: "Professional offensive security & real-world simulation.",
      modules: [
        "Red Teaming & Active Directory Attacks",
        "Exploit Development",
        "Privilege Escalation (Windows & Linux)",
        "Cloud Security Attacks",
        "Advanced CTF & Custom Labs",
      ],
      button: "Apply for Red Team Program",
    },
  ];

  const careers = [
    "Penetration Tester",
    "Cybersecurity Analyst",
    "SOC Analyst (Blue Team)",
    "Malware Reverse Engineer",
    "Red Team Operator",
    "Threat Intelligence Analyst",
    "Digital Forensics & Incident Response (DFIR)",
    "OSINT Specialist",
  ];

  return (
    <div className="min-h-screen bg-black text-green-400 pt-32 px-6">
      <h1 className="text-4xl font-bold text-center">Cybersecurity Career Training</h1>
      <p className="text-center text-green-300 mt-4 max-w-3xl mx-auto">
        A structured cybersecurity career roadmap designed to grow you from beginner level
        to a certified & employable cybersecurity professional.
      </p>

      {/* Roadmap Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto mt-10 gap-6">
        {roadmap.map((stage, index) => (
          <div
            key={index}
            className={`bg-gray-900 border ${stage.color} rounded-2xl p-8 shadow-lg hover:scale-105 transition`}
          >
            <h2 className="text-2xl font-bold mb-2">{stage.title}</h2>
            <p className="text-green-300 mb-4">{stage.desc}</p>

            <ul className="space-y-2 mb-6">
              {stage.modules.map((m, i) => (
                <li key={i}>• {m}</li>
              ))}
            </ul>

            <Link
              to="/signup"
              className="block bg-green-500 text-black font-bold text-center py-2 rounded-lg hover:bg-green-400"
            >
              {stage.button}
            </Link>
          </div>
        ))}
      </div>

      {/* Career Paths Section */}
      <div className="max-w-5xl mx-auto text-center mt-14">
        <h2 className="text-3xl font-bold mb-4">Cybersecurity Career Opportunities</h2>
        <p className="text-green-300 mb-6">
          These are the most in-demand cybersecurity roles you can pursue:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {careers.map((c, i) => (
            <div
              key={i}
              className="bg-gray-900 border border-green-400 rounded-xl p-4 font-semibold"
            >
              {c}
            </div>
          ))}
        </div>

        <Link
          to="/compare-packages"
          className="inline-block mt-8 bg-green-500 text-black font-bold py-3 px-6 rounded-lg hover:bg-green-400"
        >
          Explore Training Packages
        </Link>
      </div>
    </div>
  );
}
