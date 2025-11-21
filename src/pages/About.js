import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-black text-green-400 flex flex-col items-center justify-center px-8 py-16">
      <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">
        About Cyber Pinnacle
      </h1>
      <p className="max-w-3xl text-lg text-green-300 text-center mb-6 leading-relaxed">
        Cyber Pinnacle is a forward-thinking cybersecurity organization 
        focused on empowering individuals and institutions through innovation, 
        ethical hacking, and advanced defensive technologies. 
        We believe in a safer digital future built on trust, resilience, and knowledge.
      </p>
      <div className="mt-8 space-y-6 text-green-300">
        <div>
          <h2 className="text-2xl font-semibold mb-2">🌍 Our Vision</h2>
          <p>
            To be the pinnacle of cybersecurity innovation in Africa — 
            inspiring a generation of ethical hackers and digital defenders.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">💡 Our Mission</h2>
          <p>
            To provide cutting-edge solutions, training, and security intelligence 
            that empower individuals and organizations to stay ahead of threats.
          </p>
        </div>
      </div>
    </div>
  );
}
