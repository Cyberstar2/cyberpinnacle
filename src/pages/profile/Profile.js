import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updatePassword } from "firebase/auth";

export default function Profile() {
  const { user } = useAuth();
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setUsername(snap.data().username || "");
      }
    }
    loadProfile();
  }, [user]);

  const handleSave = async () => {
    if (!username.trim()) return setMessage("Username cannot be empty");

    await updateDoc(doc(db, "users", user.uid), { username });
    setMessage("Profile updated successfully ✔");
  };

  const handlePasswordChange = () => {
    const newPassword = prompt("Enter your new password:");
    if (!newPassword) return;

    updatePassword(user, newPassword)
      .then(() => setMessage("Password updated successfully ✔"))
      .catch(() => setMessage("Failed to update password ❌"));
  };

  return (
    <div className="min-h-screen bg-black text-green-400 pt-28 px-6">
      <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>

      {message && <p className="mb-4 text-green-300">{message}</p>}

      <div className="space-y-4 max-w-md">
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 text-green-300 bg-transparent border border-green-500 rounded-lg"
        />

        <label>Email (read only)</label>
        <input
          type="text"
          value={user?.email}
          disabled
          className="w-full px-4 py-2 bg-gray-800 border border-green-600 rounded-lg opacity-60"
        />

        <button
          onClick={handleSave}
          className="w-full mt-4 bg-green-500 text-black font-bold py-2 rounded-lg"
        >
          Save Changes
        </button>

        <button
          onClick={handlePasswordChange}
          className="w-full bg-yellow-500 text-black font-bold py-2 rounded-lg"
        >
          Change Password
        </button>
      </div>
    </div>
  );
}
