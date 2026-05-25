import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { addScore } from "../../services/scoreService";
import { auth } from "../../firebaseConfig";

export default function ChallengeDetails() {
  const { id } = useParams();
  const location = useLocation();

  const challenge = location.state;

  const [flag, setFlag] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    if (flag.trim() === challenge.flag) {
      await addScore(uid, challenge.points, challenge.title);
      setStatus("correct");
    } else {
      setStatus("wrong");
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 pt-28 px-6">
      <h1 className="text-3xl font-bold">{challenge.title}</h1>

      <p className="mt-3 text-green-300">{challenge.description}</p>

      <input
        className="mt-6 w-full p-3 bg-black border border-green-600"
        placeholder="Enter flag"
        value={flag}
        onChange={(e) => setFlag(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="mt-4 bg-green-500 text-black px-6 py-2 font-bold"
      >
        Submit
      </button>

      {status === "correct" && (
        <p className="mt-4 text-green-400">Correct Flag!</p>
      )}

      {status === "wrong" && (
        <p className="mt-4 text-red-400">Wrong Flag</p>
      )}
    </div>
  );
}