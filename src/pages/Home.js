import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-green-400 flex flex-col items-center justify-center px-6 pt-28">
      
      {/* Hero Title */}
      <h1 className="text-4xl sm:text-6xl font-extrabold text-center leading-tight">
        Become an Elite Cybersecurity Professional
      </h1>

      <p className="text-green-300 text-center mt-6 text-lg max-w-2xl">
        Join Africa’s fastest-growing cybersecurity academy. Learn Ethical Hacking, 
        Penetration Testing, Digital Forensics, Bug Bounty, Networking, OSINT, 
        Cyber Defense & more with hands-on real-world training.
      </p>

      {/* Buttons */}
      <div className="mt-10 flex space-x-6">
        <Link
          to="/courses"
          className="bg-green-500 text-black px-8 py-3 rounded-lg font-bold hover:bg-green-400 transition"
        >
          Explore Courses
        </Link>
        <Link
          to="/training"
          className="border border-green-500 px-8 py-3 rounded-lg font-bold hover:bg-green-500 hover:text-black transition"
        >
          Join Training
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-14 text-center">
        <div>
          <h2 className="text-3xl font-bold">450+</h2>
          <p className="text-green-300">Students Trained</p>
        </div>
        <div>
          <h2 className="text-3xl font-bold">25+</h2>
          <p className="text-green-300">Specialized Courses</p>
        </div>
        <div>
          <h2 className="text-3xl font-bold">10+</h2>
          <p className="text-green-300">Countries Reached</p>
        </div>
      </div>
    </div>
  );
}
