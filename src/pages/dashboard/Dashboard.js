import React, { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useAuth } from "../../context/AuthContext";
import { getScore } from "../../services/scoreService";

export default function Dashboard() {
  const { user } = useAuth();
  const [score, setScore] = useState(0);
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    async function loadData() {
      if (!user) return;

      // Get the score from Firestore service
      const scoreValue = await getScore();
      setScore(scoreValue);

      // Fetch badge information
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setBadges(userSnap.data().badges || []);
      }
    }

    loadData();
  }, [user]);

  return (
    <div className="min-h-screen bg-black text-green-400 pt-32 px-6">
      <h1 className="text-4xl font-bold mb-4">Welcome to Your Dashboard</h1>

      <p className="text-green-300 text-lg mb-8">
        Logged in as: <span className="font-semibold">{user?.email}</span>
      </p>

      {/* Score and Rank Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto gap-6">
        <div className="bg-gray-900 border border-green-400 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-2">CTF Score</h2>
          <p className="text-3xl font-bold">{score}</p>
        </div>

        <div className="bg-gray-900 border border-green-400 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-2">Challenges Completed</h2>
          <p className="text-3xl font-bold">{Math.floor(score / 50)}</p>
        </div>

        <div className="bg-gray-900 border border-green-400 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-2">Rank</h2>
          <p className="text-3xl font-bold">
            {score >= 200 ? "Elite Hacker" :
             score >= 100 ? "Pro Hacker" :
             score >= 50  ? "Skilled Hacker" :
                            "Rookie Hacker"}
          </p>
        </div>
      </div>

      {/* Badges */}
      <div className="max-w-6xl mx-auto mt-10 bg-gray-900 border border-green-500 p-6 rounded-xl">
        <h2 className="text-2xl font-semibold mb-4">🏅 Earned Badges</h2>

        {badges.length === 0 ? (
          <p className="text-green-300">No badges earned yet — start CTF challenges!</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {badges.map((badge, index) => (
              <div
                key={index}
                className="bg-green-500 text-black font-bold rounded-lg p-3 text-center shadow-lg"
              >
                {badge}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
