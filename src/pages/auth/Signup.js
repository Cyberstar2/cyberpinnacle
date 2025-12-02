// src/pages/auth/Signup.js
import React, { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { createUserRecord } from "../../services/scoreService";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      // Sign up with Firebase Auth
      const result = await createUserWithEmailAndPassword(auth, email, password);

      // Update Firebase user profile (adds displayName)
      await updateProfile(result.user, {
        displayName: username,
      });

      // Store full user record in firestore
      await createUserRecord(result.user.uid, email, username);

      // Send verification email
      await sendEmailVerification(result.user);

      setMessage("📩 Verification email sent! Check your inbox.");
      
      // log user out so they must verify before login
      auth.signOut();

      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Signup failed — email may already exist.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 flex flex-col items-center justify-center px-8 py-16">
      <h1 className="text-4xl font-bold mb-10">Create Account</h1>

      <form
        onSubmit={handleSignup}
        className="w-full max-w-md bg-gray-900 p-8 rounded-xl border border-green-500 space-y-4"
      >
        {error && <p className="text-red-400 text-center">{error}</p>}
        {message && <p className="text-green-400 text-center">{message}</p>}

        <input
          type="text"
          placeholder="Choose Username"
          className="w-full px-4 py-2 bg-transparent border border-green-500 rounded-lg text-green-300"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          className="w-full px-4 py-2 bg-transparent border border-green-500 rounded-lg text-green-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Create Password"
          className="w-full px-4 py-2 bg-transparent border border-green-500 rounded-lg text-green-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-2 rounded-lg"
        >
          Sign Up
        </button>

        <p className="text-center text-green-300 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-green-400 underline hover:text-green-300">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
