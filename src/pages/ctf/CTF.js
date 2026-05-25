import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getScore } from "../../services/scoreService";
import {
  FaFlag,
  FaSkullCrossbones,
  FaWifi,
  FaGlobe,
  FaDatabase,
} from "react-icons/fa";

/* =========================
   CHALLENGE DATA
========================= */
export const challenges = [
  {
    id: "intro-ctf",
    title: "Intro to CTF",
    category: "Hacking Fundamentals",
    difficulty: "Easy",
    points: 50,
    unlockScore: 0,
    description:
      "Your first CyberPinnacle challenge. Learn how flags work and submit your first capture.",
    tags: ["Beginner", "Flags", "Basics"],
    icon: <FaFlag />,
  },

  {
    id: "osint-email",
    title: "OSINT: Find the Email",
    category: "OSINT & Recon",
    difficulty: "Easy",
    points: 75,
    unlockScore: 50,
    description:
      "Use reconnaissance techniques to discover hidden email intelligence.",
    tags: ["OSINT", "Recon", "Google Dorking"],
    icon: <FaGlobe />,
  },

  {
    id: "wifi-handshake",
    title: "Wi-Fi Handshake Capture",
    category: "Wi-Fi Hacking",
    difficulty: "Medium",
    points: 100,
    unlockScore: 125,
    description:
      "Analyze wireless traffic and identify handshake capture methodology.",
    tags: ["WiFi", "Aircrack-ng", "Packets"],
    icon: <FaWifi />,
  },

  {
    id: "sqli-login",
    title: "SQLi Login Bypass",
    category: "Web Exploitation",
    difficulty: "Hard",
    points: 200,
    unlockScore: 225,
    description:
      "Exploit authentication weaknesses to bypass a vulnerable login portal.",
    tags: ["SQL Injection", "Web", "Authentication"],
    icon: <FaDatabase />,
  },
];

export default function CTF() {
  const { user } = useAuth();
  const [score, setScore] = useState(0);

  useEffect(() => {
    async function loadScore() {
      if (user) {
        const s = await getScore(user.uid);
        setScore(s || 0);
      }
    }
    loadScore();
  }, [user]);

  const completed = Math.floor(score / 50);

  const getDifficultyColor = (diff) => {
    if (diff === "Easy") return "text-green-400 border-green-500";
    if (diff === "Medium") return "text-yellow-400 border-yellow-500";
    return "text-red-400 border-red-500";
  };

  return (
    <div className="min-h-screen bg-black text-green-400 pt-28 px-6 pb-16">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="border border-green-700 rounded-3xl p-8 bg-[#03120a]">
          <div className="flex items-center gap-3 mb-3">
            <FaSkullCrossbones className="text-4xl text-green-400" />
            <h1 className="text-4xl font-extrabold">
              CyberPinnacle CTF Arena
            </h1>
          </div>

          <p className="text-green-300">
            Real-world cybersecurity challenges: OSINT, Web Exploitation, WiFi attacks & more.
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="max-w-6xl mx-auto grid grid-cols-3 gap-5 mb-10">
        <div className="border border-green-700 p-6 rounded-xl text-center">
          <h2 className="text-3xl font-bold">{score}</h2>
          <p>Your Score</p>
        </div>

        <div className="border border-green-700 p-6 rounded-xl text-center">
          <h2 className="text-3xl font-bold">{challenges.length}</h2>
          <p>Total Challenges</p>
        </div>

        <div className="border border-green-700 p-6 rounded-xl text-center">
          <h2 className="text-3xl font-bold">{completed}</h2>
          <p>Completed</p>
        </div>
      </div>

      {/* CHALLENGES */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {challenges.map((ch) => {
          const unlocked = score >= ch.unlockScore;

          return (
            <div
              key={ch.id}
              className="border border-green-700 bg-[#050b07] p-6 rounded-2xl"
            >
              {/* HEADER */}
              <div className="flex justify-between mb-3">
                <div className="flex gap-3 items-center">
                  <div className="text-green-400 text-xl">{ch.icon}</div>
                  <div>
                    <h2 className="text-xl font-bold">{ch.title}</h2>
                    <p className="text-green-500 text-sm">{ch.category}</p>
                  </div>
                </div>

                <div
                  className={`px-2 py-1 text-xs border rounded ${getDifficultyColor(
                    ch.difficulty
                  )}`}
                >
                  {ch.difficulty}
                </div>
              </div>

              {/* DESC */}
              <p className="text-green-300 text-sm mb-4">
                {ch.description}
              </p>

              {/* FOOTER */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold">{ch.points} pts</p>
                  <p className="text-xs text-green-500">
                    {unlocked ? "Unlocked" : `Locked (${ch.unlockScore} pts)`}
                  </p>
                </div>

                <Link to={`/ctf/${ch.id}`} state={ch}>
                  <button
                    disabled={!unlocked}
                    className={`px-4 py-2 rounded font-bold ${
                      unlocked
                        ? "bg-green-500 text-black"
                        : "bg-gray-800 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {unlocked ? "Start" : "Locked"}
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}