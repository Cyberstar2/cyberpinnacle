import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getScore } from "../../services/scoreService";

// Export challenges array so ChallengeDetails.js can use it
export const challenges = [
  {
    title: "Intro to CTF",
    category: "Hacking Fundamentals",
    difficulty: "Easy",
    points: 50,
    unlockScore: 0,
  },
  {
    title: "OSINT: Find the Email",
    category: "OSINT & Recon",
    difficulty: "Easy",
    points: 75,
    unlockScore: 50,
  },
  {
    title: "Wi-Fi Handshake Capture",
    category: "Wi-Fi Hacking",
    difficulty: "Medium",
    points: 100,
    unlockScore: 125,
  },
  {
    title: "SQLi Login Bypass",
    category: "Web App Exploitation",
    difficulty: "Hard",
    points: 200,
    unlockScore: 225,
  },
];

export default function CTF() {
  const { user } = useAuth();
  const [score, setScore] = useState(0);

  useEffect(() => {
    async function loadScore() {
      if (user) {
        const s = await getScore(user.uid);
        setScore(s);
      }
    }
    loadScore();
  }, [user]);

  return (
    <div className="min-h-screen bg-black text-green-400 pt-32 px-6">
      <h1 className="text-4xl font-bold text-center mb-4">
        CyberPinnacle CTF Arena
      </h1>
      <p className="text-center text-green-300 max-w-2xl mx-auto mb-8">
        Gamified learning with Capture The Flag style challenges. Solve tasks, collect flags,
        and climb the leaderboard while learning real-world hacking skills.
      </p>

      {/* Scoreboard */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-gray-900 border border-green-500 rounded-xl p-4 text-center">
          <h2 className="text-2xl font-bold">{score}</h2>
          <p className="text-green-300">Your Score</p>
        </div>
        <div className="bg-gray-900 border border-green-500 rounded-xl p-4 text-center">
          <h2 className="text-2xl font-bold">{challenges.length}</h2>
          <p className="text-green-300">Total Challenges</p>
        </div>
        <div className="bg-gray-900 border border-green-500 rounded-xl p-4 text-center">
          <h2 className="text-2xl font-bold">{Math.floor(score / 50)}</h2>
          <p className="text-green-300">Completed</p>
        </div>
      </div>

      {/* Challenges List */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {challenges.map((ch, i) => (
          <div
            key={i}
            className="bg-gray-900 border border-green-500 rounded-2xl p-6 shadow-lg hover:scale-105 transition"
          >
            <h3 className="text-2xl font-bold mb-2">{ch.title}</h3>
            <p className="text-green-300 mb-1">Category: {ch.category}</p>
            <p className="text-green-300 mb-1">Difficulty: {ch.difficulty}</p>
            <p className="text-green-300 mb-4">Points: {ch.points}</p>

            <Link to={`/ctf/${ch.title}`} state={ch} className="w-full block">
              <button
                disabled={score < ch.unlockScore}
                className={`w-full font-bold py-2 rounded-lg ${
                  score >= ch.unlockScore
                    ? "bg-green-500 text-black hover:bg-green-400"
                    : "bg-gray-700 text-green-300 cursor-not-allowed"
                }`}
              >
                {score >= ch.unlockScore
                  ? "View Challenge"
                  : `Locked (Need ${ch.unlockScore} pts)`}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
