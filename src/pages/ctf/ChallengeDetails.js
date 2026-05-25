import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { addScore } from "../../services/scoreService";
import { awardBadge } from "../../services/badgeService";
import { auth } from "../../firebaseConfig";

import {
  FaFlag,
  FaTerminal,
  FaLightbulb,
  FaCheckCircle,
} from "react-icons/fa";

const correctFlags = {
  "Intro to CTF": "CPCTF{welcome123}",
  "OSINT: Find the Email": "CPCTF{osint_master}",
};

const challengePoints = {
  "Intro to CTF": 50,
  "OSINT: Find the Email": 75,
};

const challengeHints = {
  "Intro to CTF":
    "Flags usually follow the format CPCTF{example_flag}",

  "OSINT: Find the Email":
    "Think like an investigator. Search engines and metadata are your allies.",
};

export default function ChallengeDetails() {
  const { title } = useParams();

  const location = useLocation();

  const challenge = location.state;

  const [flag, setFlag] = useState("");

  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!flag.trim()) return;

    setLoading(true);

    setMessage("");

    try {
      if (flag.trim() === correctFlags[title]) {
        const result = await addScore(
          auth.currentUser.uid,
          challengePoints[title],
          title
        );

        // Prevent duplicate scoring
        if (!result.success) {
          setStatus("already");

          setMessage("You already solved this challenge.");

          setLoading(false);

          return;
        }

        // Award badges
        if (challengePoints[title] === 50) {
          await awardBadge("First Blood");
        }

        if (challengePoints[title] === 75) {
          await awardBadge("Recon Expert");
        }

        setStatus("correct");

        setMessage(
          `+${challengePoints[title]} XP earned • Rank: ${result.rank}`
        );
      } else {
        setStatus("wrong");

        setMessage("Incorrect flag. Keep digging.");
      }
    } catch (err) {
      console.error(err);

      setStatus("wrong");

      setMessage("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-green-400 pt-28 px-6 pb-16">
      <div className="max-w-4xl mx-auto">
        {/* MAIN CONTAINER */}
        <div className="border border-green-700 rounded-3xl bg-[#050b07] overflow-hidden shadow-[0_0_40px_rgba(34,197,94,0.15)]">
          
          {/* HEADER */}
          <div className="border-b border-green-800 bg-gradient-to-r from-green-950/40 to-black px-6 py-4">
            <div className="flex items-center gap-3">
              <FaTerminal className="text-3xl text-green-400" />

              <div>
                <h1 className="text-3xl font-extrabold">
                  {title}
                </h1>

                <p className="text-green-500 text-sm">
                  CyberPinnacle Offensive Security Challenge
                </p>
              </div>
            </div>
          </div>

          {/* BODY */}
          <div className="p-6">
            
            {/* DESCRIPTION */}
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-2 text-green-300">
                Mission Brief
              </h2>

              <p className="text-green-200 leading-relaxed">
                {challenge?.description ||
                  "Analyze the challenge carefully, discover the hidden flag, and submit it below."}
              </p>
            </div>

            {/* HINT */}
            <div className="border border-yellow-700 bg-yellow-900/10 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-2 text-yellow-400">
                <FaLightbulb />
                <span className="font-bold">Hint</span>
              </div>

              <p className="text-yellow-200 text-sm">
                {challengeHints[title] ||
                  "No hint available for this challenge."}
              </p>
            </div>

            {/* TERMINAL */}
            <div className="border border-green-800 rounded-xl bg-black overflow-hidden">
              
              {/* TERMINAL HEADER */}
              <div className="flex items-center gap-2 px-4 py-2 border-b border-green-800 bg-green-950/20">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span className="w-2 h-2 rounded-full bg-yellow-500" />
                <span className="w-2 h-2 rounded-full bg-green-500" />

                <span className="ml-3 text-xs text-green-400 font-mono">
                  challenge-terminal
                </span>
              </div>

              {/* TERMINAL BODY */}
              <div className="p-4">
                
                <div className="flex items-center gap-2 text-sm text-green-500 mb-2">
                  <FaFlag />
                  <span>Enter captured flag below:</span>
                </div>

                <input
                  className="w-full px-4 py-3 bg-black border border-green-700 rounded-lg outline-none text-green-300 font-mono mb-4"
                  placeholder="CPCTF{...}"
                  value={flag}
                  onChange={(e) => setFlag(e.target.value)}
                />

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-green-500 text-black px-6 py-3 rounded-lg font-bold hover:bg-green-400 transition disabled:opacity-60"
                >
                  {loading ? "Submitting..." : "Submit Flag"}
                </button>

                {/* SUCCESS */}
                {status === "correct" && (
                  <div className="mt-5 border border-green-700 bg-green-900/20 rounded-lg p-4 text-green-300">
                    <div className="flex items-center gap-2 font-bold mb-1">
                      <FaCheckCircle />
                      <span>Flag Accepted</span>
                    </div>

                    <p className="text-sm">
                      {message}
                    </p>
                  </div>
                )}

                {/* DUPLICATE */}
                {status === "already" && (
                  <div className="mt-5 border border-yellow-700 bg-yellow-900/10 rounded-lg p-4 text-yellow-300">
                    <p className="font-bold">
                      {message}
                    </p>
                  </div>
                )}

                {/* ERROR */}
                {status === "wrong" && (
                  <div className="mt-5 border border-red-700 bg-red-900/10 rounded-lg p-4 text-red-300">
                    <p className="font-bold">
                      {message}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* FOOTER */}
            <div className="mt-6 text-xs text-green-600 border-t border-green-900 pt-4">
              CyberPinnacle CTF Arena is built for ethical cybersecurity
              education and authorized skills development only.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}