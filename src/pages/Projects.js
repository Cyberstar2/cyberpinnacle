import React from "react";

export default function Projects() {
  const projects = [
    {
      title: "Vulnerability Scanner",
      desc: "An automated tool that detects security flaws in web servers and applications.",
    },
    {
      title: "Red Team Simulation",
      desc: "A full-fledged penetration testing lab setup for ethical hacking demonstrations.",
    },
    {
      title: "AI Threat Analyzer",
      desc: "AI-driven system that predicts and analyzes potential cyber threats.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-green-400 px-8 py-16">
      <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">
        Our Projects
      </h1>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map((p, index) => (
          <div
            key={index}
            className="border border-green-400 rounded-xl p-6 hover:scale-105 transition-transform bg-gray-900/40"
          >
            <h2 className="text-2xl font-semibold mb-3">{p.title}</h2>
            <p className="text-green-300">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
