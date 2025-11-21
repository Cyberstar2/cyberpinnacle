import React from "react";
import { Link } from "react-router-dom";

export default function TrainingPaths() {
  const paths = [
    {
      level: "Beginner",
      description: "Start from zero. Understand cybersecurity basics and tools.",
      modules: [
        "Cybersecurity Fundamentals",
        "Linux Basics",
        "Networking Foundations",
        "Introduction to Ethical Hacking",
        "Basic Terminal & Scripting",
      ],
      color: "border-green-400",
      button: "Start Beginner Path",
    },
    {
      level: "Intermediate",
      description: "Develop real hacking capabilities and lab experience.",
      modules: [
        "Web Application Security",
        "Wi-Fi Hacking",
        "OSINT & Reconnaissance",
        "Password Attacks & Cracking",
        "Exploit Research Basics",
      ],
      color: "border-yellow-400",
      button: "Start Intermediate Path",
    },
    {
      level: "Professional",
      description: "Become employable. Work with offensive security tools.",
      modules: [
        "Advanced Penetration Testing",
        "Metasploit & Post-Exploitation",
        "Red Teaming Basics",
        "Active Directory Attacks",
        "Incident Response & Forensics",
      ],
      color: "border-blue-400",
      button: "Start Professional",
    },
    {
      level: "Expert / Red Team",
      description: "Elite tier. Real world simulations & advanced environments.",
      modules: [
        "Red Team Ops / Adversary Simulation",
        "Cloud Pen-Testing",
        "SCADA/ICS Hacking",
        "Zero-Day Analysis",
        "OSCP / OSEP Preparation",
      ],
      color: "border-red-500",
      button: "Join Expert Level",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-green-400 pt-32 px-6">
      <h1 className="text-4xl font-bold text-center mb-4">Training Paths</h1>
      <p className="text-center text-green-300 mb-10 max-w-2xl mx-auto">
        Follow structured and progressive cybersecurity learning stages designed to
        take you from beginner to professional hacker.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {paths.map((p, i) => (
          <div
            key={i}
            className={`bg-gray-900 border ${p.color} rounded-2xl p-8 shadow-lg hover:scale-105 transition`}
          >
            <h2 className="text-3xl font-bold mb-3">{p.level}</h2>
            <p className="text-green-300 mb-5">{p.description}</p>

            <ul className="mb-6 space-y-2">
              {p.modules.map((m, index) => (
                <li key={index}>• {m}</li>
              ))}
            </ul>

            <Link
              to="/signup"
              className="block bg-green-500 text-black font-bold text-center py-2 rounded-lg hover:bg-green-400"
            >
              {p.button}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
