import React from "react";
import { Link } from "react-router-dom";

export default function ComparePackages() {
  const plans = [
    {
      name: "Starter",
      price: "₦0",
      description: "Free access to basic cybersecurity learning materials",
      features: [
        "Beginner Lessons",
        "Access to 5 CTF Challenges",
        "Community Support",
      ],
      button: "Start Free",
      highlighted: false,
    },
    {
      name: "Pro Hacker",
      price: "₦25,000 / month",
      description: "Full hands-on hacking training with advanced content",
      features: [
        "All Courses & Training Paths",
        "Unlimited CTF Challenges",
        "Downloadable Resources",
        "Pro Lab Environments",
        "AI Cyber Mentor Access",
      ],
      button: "Join Pro",
      highlighted: true,
    },
    {
      name: "Elite Red Team",
      price: "₦120,000 / month",
      description: "For professionals and real offensive security operations",
      features: [
        "Red Team Ops / Blue Team Defense",
        "Advanced Labs (AD, Cloud, Wi-Fi, SCADA)",
        "Career Mentorship & Job Support",
        "Certification Preparation (OSCP, CEH, Pentest+)",
        "Private Coaching Calls",
      ],
      button: "Join Elite",
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-green-400 pt-32 px-6">
      <h1 className="text-4xl font-extrabold text-center mb-4">
        Compare Training Packages
      </h1>
      <p className="text-green-300 text-center mb-12 max-w-3xl mx-auto">
        Choose your learning plan and begin your journey to becoming a world-class
        cybersecurity expert.
      </p>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((p, i) => (
          <div
            key={i}
            className={`border rounded-2xl p-8 shadow-lg transition hover:scale-105 ${
              p.highlighted
                ? "bg-green-900 border-green-400"
                : "bg-gray-900 border-green-700"
            }`}
          >
            <h2 className="text-3xl font-extrabold mb-2 text-center">{p.name}</h2>
            <p className="text-4xl font-bold text-center mb-4">{p.price}</p>
            <p className="text-green-300 mb-6 text-center">{p.description}</p>

            <ul className="space-y-3 mb-6">
              {p.features.map((f, index) => (
                <li key={index} className="flex items-center gap-2">
                  ✅ {f}
                </li>
              ))}
            </ul>

            <Link
              to="/signup"
              className="block text-center font-bold bg-green-500 text-black py-2 rounded-lg hover:bg-green-400"
            >
              {p.button}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
