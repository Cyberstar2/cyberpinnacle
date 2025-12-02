// src/pages/dashboard/Profile.js
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { auth, db } from "../../firebaseConfig";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function Profile() {
  const { user } = useAuth();
  const [username, setUsername] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;
      setError("");
      setMessage("");

      const defaultName = user.displayName || user.email?.split("@")[0];

      try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists() && snap.data().username) {
          setUsername(snap.data().username);
        } else {
          setUsername(defaultName || "");
        }
      } catch (err) {
        console.error(err);
        setUsername(defaultName || "");
      }
    }

    loadProfile();
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    setError("");
    setMessage("");

    try {
      // Update Firebase Auth displayName
      await updateProfile(auth.currentUser, {
        displayName: username,
      });

      // Update Firestore user profile
      const ref = doc(db, "users", user.uid);
      await updateDoc(ref, {
        username,
      });

      setMessage("✅ Profile updated successfully.");
    } catch (err) {
      console.error(err);
      setError("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-green-400 pt-24 px-6">
        <p>You need to be logged in to view this page.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-green-400 pt-24 px-6">
      <div className="max-w-3xl mx-auto bg-gray-900 border border-green-500 rounded-2xl p-8 shadow-lg shadow-green-900/40">
        <h1 className="text-3xl font-bold mb-2">Profile</h1>
        <p className="text-green-500 mb-6">
          Manage your CyberPinnacle identity and account details.
        </p>

        {error && (
          <p className="mb-3 text-red-400 text-sm bg-red-900/20 border border-red-700 rounded-lg px-3 py-2">
            {error}
          </p>
        )}
        {message && (
          <p className="mb-3 text-green-300 text-sm bg-green-900/20 border border-green-700 rounded-lg px-3 py-2">
            {message}
          </p>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm text-green-300 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-black border border-green-500 rounded-lg text-green-200 focus:outline-none focus:ring-1 focus:ring-green-400"
              required
            />
            <p className="text-xs text-green-500 mt-1">
              This is how your name appears on the dashboard, leaderboard and
              CTF.
            </p>
          </div>

          <div>
            <label className="block text-sm text-green-300 mb-1">
              Email (read-only)
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full px-4 py-2 bg-gray-950 border border-green-800 rounded-lg text-green-400 cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="mt-4 bg-green-500 hover:bg-green-400 text-black font-bold px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
