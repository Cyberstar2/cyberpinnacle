import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getScore } from "../../services/scoreService";
import { challengesData } from "./challengesData.js";
import { isUnlocked } from "./engine.j";

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

  return (
    <div className="min-h-screen bg-black text-green-400 pt-28 px-6 pb-16">
      <h1 className="text-4xl font-bold text-center mb-6">
        CyberPinnacle CTF Arena
      </h1>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-4 mb-10 text-center">
        <div className="p-4 border border-green-600 rounded-xl">
          Score: {score}
        </div>
        <div className="p-4 border border-green-600 rounded-xl">
          Total: {challengesData.length}
        </div>
        <div className="p-4 border border-green-600 rounded-xl">
          Completed: {Math.floor(score / 5)}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {challengesData.map((ch) => {
          const unlocked = isUnlocked(ch, score);

          return (
            <div
              key={ch.id}
              className="border border-green-700 p-5 rounded-xl"
            >
              <h2 className="text-xl font-bold">{ch.title}</h2>
              <p>{ch.category}</p>
              <p>{ch.difficulty}</p>
              <p>{ch.points} pts</p>

              <Link to={`/ctf/${ch.title}`} state={ch}>
                <button
                  disabled={!unlocked}
                  className={`mt-3 px-4 py-2 rounded ${
                    unlocked
                      ? "bg-green-500 text-black"
                      : "bg-gray-700 text-gray-400"
                  }`}
                >
                  {unlocked ? "Start Challenge" : "Locked"}
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}