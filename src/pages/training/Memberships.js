import React from "react";
import { Link } from "react-router-dom";

export default function Memberships() {
  const plans = [
    {
      name: "Free",
      price: "₦0",
      color: "border-green-400",
      features: [
        "Access to beginner courses",
        "Participate in basic CTF challenges",
        "Community Support",
        "Dashboard & Basic tracking"
      ],
      btnText: "Start for Free",
    },
    {
      name: "Pro",
      price: "₦7,500 / month",
      color: "border-blue-400",
      features: [
        "Intermediate & Advanced labs",
        "Full CTF Arena Access",
        "CTF Leaderboard Ranking",
        "Certificate after completion",
        "Downloadable study materials",
        "Access to training paths",
        "Email Support"
      ],
      btnText: "Upgrade to Pro",
    },
    {
      name: "Elite",
      price: "₦25,000 / month",
      color: "border-red-500",
      features: [
        "Everything in Pro",
        "Red Team Real-World Simulations",
        "1-on-1 Mentorship",
        "Career Coaching Support",
        "Live instructor-led training",
        "Exclusive research materials",
        "Private Community Group"
      ],
      btnText: "Join Elite",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-green-400 pt-32 px-6">
      <h1 className="text-4xl font-bold text-center mb-4">Membership Plans</h1>
      <p className="text-center text-green-300 max-w-2xl mx-auto mb-10">
        Choose a membership plan that matches your learning journey and unlock access to
        deeper cybersecurity knowledge and hands-on training.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((p, i) => (
          <div
            key={i}
            className={`bg-gray-900 border ${p.color} rounded-2xl p-8 shadow-lg hover:scale-105 transition`}
          >
            <h2 className="text-3xl font-bold mb-2">{p.name}</h2>
            <p className="text-2xl font-extrabold mb-4 text-green-300">{p.price}</p>

            <ul className="mb-6 space-y-2">
              {p.features.map((f, index) => (
                <li key={index}>✔ {f}</li>
              ))}
            </ul>

            <Link
              to="/signup"
              className="block bg-green-500 text-black font-bold text-center py-2 rounded-lg hover:bg-green-400"
            >
              {p.btnText}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
