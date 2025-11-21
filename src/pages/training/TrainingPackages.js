import React from "react";
import { Link } from "react-router-dom";

export default function TrainingPackages() {
  const packages = [
    {
      name: "Starter",
      desc: "For beginners starting cybersecurity",
      price: "₦5,000 / month",
      color: "border-green-400",
      features: [
        "Beginner cybersecurity modules",
        "Basic hands-on labs",
        "Access to beginner CTF",
        "Email support",
      ],
      btn: "Get Starter",
    },
    {
      name: "Professional",
      desc: "For serious learners & career path",
      price: "₦15,000 / month",
      color: "border-blue-400",
      features: [
        "Intermediate & Advanced labs",
        "Real-world attack simulations",
        "Full CTF Arena Access",
        "Downloadable materials",
        "Certificate of Completion",
        "Exclusive webinars & workshops",
      ],
      btn: "Become Professional",
    },
    {
      name: "Enterprise",
      desc: "For teams, schools & organizations",
      price: "Custom Pricing",
      color: "border-red-500",
      features: [
        "Training for teams",
        "Custom cybersecurity curriculum",
        "Live Instructor mentoring",
        "Corporate dashboards",
        "Private CTF events",
        "Dedicated technical support",
      ],
      btn: "Contact Sales",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-green-400 pt-32 px-6">
      <h1 className="text-4xl font-bold text-center mb-4">Training Packages</h1>
      <p className="text-center text-green-300 max-w-3xl mx-auto mb-10">
        Tailored cybersecurity training packages built for individuals, professionals, and organizations seeking practical, real-world skills.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {packages.map((p, i) => (
          <div
            key={i}
            className={`bg-gray-900 border ${p.color} rounded-2xl p-8 shadow-lg hover:scale-105 transition`}
          >
            <h2 className="text-3xl font-bold mb-2">{p.name}</h2>
            <p className="mb-2">{p.desc}</p>
            <p className="text-2xl font-extrabold text-green-300 mb-6">
              {p.price}
            </p>

            <ul className="mb-6 space-y-2">
              {p.features.map((f, index) => (
                <li key={index}>✔ {f}</li>
              ))}
            </ul>

            <Link
              to={p.name === "Enterprise" ? "/contact" : "/signup"}
              className="block bg-green-500 text-black font-bold text-center py-2 rounded-lg hover:bg-green-400"
            >
              {p.btn}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
