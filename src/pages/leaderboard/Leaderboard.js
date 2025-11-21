import React, { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("score", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc, index) => ({
        id: doc.id,
        rank: index + 1,
        ...doc.data(),
      }));
      setUsers(list);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-black pt-32 px-6 text-green-400">
      <h1 className="text-4xl font-bold text-center mb-10">🏆 Leaderboard</h1>

      <div className="max-w-4xl mx-auto space-y-4">
        {users.map((u) => (
          <div
            key={u.id}
            className="bg-gray-900 border border-green-500 p-4 rounded-xl flex items-center justify-between hover:scale-105 transition"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-green-500 text-black w-10 h-10 rounded-full flex items-center justify-center font-bold">
                {u.rank}
              </div>
              <div>
                <p className="font-semibold text-lg">{u.email}</p>
                <p className="text-green-300 text-sm">
                  Badges: {u.badges?.length || 0}
                </p>
              </div>
            </div>

            <p className="text-2xl font-bold">{u.score} pts</p>
          </div>
        ))}
      </div>
    </div>
  );
}
