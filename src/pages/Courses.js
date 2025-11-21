import React from "react";
import { Link } from "react-router-dom";

export default function Courses() {
  const categories = [
    {
      title: "Cybersecurity Fundamentals",
      desc: "Start from zero and build a strong foundation in cybersecurity basics.",
      color: "border-green-400",
      route: "/training-paths",
    },
    {
      title: "Penetration Testing & Red Teaming",
      desc: "Hands-on hacking courses covering real-world attack & defense simulation.",
      color: "border-red-500",
      route: "/training-paths",
    },
    {
      title: "Ethical Hacking / CEH Preparation",
      desc: "Prepare for professional certification and advanced exam-level tactics.",
      color: "border-blue-400",
      route: "/training-packages",
    },
    {
      title: "SOC / Blue Team Defense",
      desc: "Learn monitoring, incident response, detection engineering & SIEM tools.",
      color: "border-yellow-400",
      route: "/training-packages",
    },
    {
      title: "Forensics & Malware Analysis",
      desc: "Deep dive reverse engineering, malware behaviour & digital investigation.",
      color: "border-purple-500",
      route: "/training-packages",
    },
    {
      title: "OSINT & Cyber Intelligence",
      desc: "Master reconnaissance and intelligence collection like professionals.",
      color: "border-orange-500",
      route: "/training-paths",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-green-400 pt-32 px-6">
      <h1 className="text-4xl font-bold text-center">Cybersecurity Courses</h1>
      <p className="text-center text-green-300 mt-4 max-w-3xl mx-auto">
        Learn industry-standard cybersecurity skills through advanced hands-on training,
        real lab environments, and CTF gamified learning.
      </p>

      {/* Course Categories */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {categories.map((course, idx) => (
          <div
            key={idx}
            className={`bg-gray-900 border ${course.color} p-6 rounded-2xl hover:scale-105 shadow-lg transition`}
          >
            <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
            <p className="text-green-300 mb-4">{course.desc}</p>

            <Link
              to={course.route}
              className="block bg-green-500 text-black font-bold text-center py-2 rounded-lg hover:bg-green-400"
            >
              Explore Content
            </Link>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="text-center mt-12">
        <Link
          to="/compare-packages"
          className="inline-block bg-green-500 text-black font-bold py-3 px-8 rounded-lg hover:bg-green-400"
        >
          Compare Training Packages
        </Link>
      </div>
    </div>
  );
}
