import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { addScore } from "../../services/scoreService";
import { awardBadge } from "../../services/badgeService";
import { auth } from "../../firebaseConfig";

const correctFlags = {
  "Intro to CTF": "CPCTF{welcome123}",
  "OSINT: Find the Email": "CPCTF{osint_master}",
};

const challengePoints = {
  "Intro to CTF": 50,
  "OSINT: Find the Email": 75,
};

export default function ChallengeDetails() {
  const { title } = useParams();
  const [flag, setFlag] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    if (flag === correctFlags[title]) {
      await addScore(auth.currentUser.uid, challengePoints[title]);

      if (challengePoints[title] === 50) {
        await awardBadge("First Blood");
      }
      if (challengePoints[title] === 75) {
        await awardBadge("Recon Expert");
      }

      setStatus("correct");
    } else {
      setStatus("wrong");
    }
  };

  return (
    <div className="min-h-screen bg-black pt-32 text-center text-green-400 px-6">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>

      <input
        className="w-full max-w-xl mx-auto px-4 py-3 bg-gray-900 border border-green-500 rounded-lg mb-4"
        placeholder="Enter flag here"
        value={flag}
        onChange={(e) => setFlag(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-green-500 text-black px-8 py-2 rounded-lg font-bold hover:bg-green-400"
      >
        Submit Flag
      </button>

      {status === "correct" && (
        <p className="text-green-400 mt-4">🎉 Correct flag! Points awarded.</p>
      )}
      {status === "wrong" && (
        <p className="text-red-400 mt-4">❌ Wrong flag. Try again.</p>
      )}
    </div>
  );
}
