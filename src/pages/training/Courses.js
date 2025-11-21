import React from "react";
import { Link } from "react-router-dom";

export default function Courses() {
  const courses = [
    {
      id: 1,
      title: "Ethical Hacking & Penetration Testing",
      category: "Cybersecurity",
      duration: "6 Weeks",
      difficulty: "Intermediate",
      points: 200,
    },
    {
      id: 2,
      title: "Digital Forensics & Incident Response",
      category: "Forensics",
      duration: "5 Weeks",
      difficulty: "Intermediate",
      points: 180,
    },
    {
      id: 3,
      title: "OSINT & Intelligence Gathering",
      category: "OSINT",
      duration: "4 Weeks",
      difficulty: "Beginner",
      points: 120,
    },
    {
      id: 4,
      title: "Web Application Security",
      category: "Web Exploitation",
      duration: "7 Weeks",
      difficulty: "Advanced",
      points: 250,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-green-400 pt-32 px-6">
      <h1 className="text-4xl font-bold text-center mb-6">CyberPinnacle Training Courses</h1>
      <p className="text-center text-green-300 max-w-3xl mx-auto mb-10">
        Choose a course and start your journey to becoming an elite cybersecurity professional.
      </p>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((c) => (
          <div
            key={c.id}
            className="bg-gray-900 border border-green-500 rounded-xl p-6 hover:scale-105 transition shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-2">{c.title}</h2>
            <p className="text-green-300 mb-1">Category: {c.category}</p>
            <p className="text-green-300 mb-1">Duration: {c.duration}</p>
            <p className="text-green-300 mb-4">Difficulty: {c.difficulty}</p>

            <Link to={`/course/${c.id}`}>
              <button className="w-full bg-green-500 text-black font-bold py-2 rounded-lg hover:bg-green-400">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
