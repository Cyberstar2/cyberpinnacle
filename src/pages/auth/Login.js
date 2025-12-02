// src/pages/auth/Login.js
import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { createUserRecord } from "../../services/scoreService";
import { doc, getDoc } from "firebase/firestore";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      await user.reload();

      // Block login if email is unverified
      if (!user.emailVerified) {
        setError("⚠ Email not verified. Check your inbox.");
        return;
      }

      // Check Firestore account status
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists() && snap.data().status === "restricted") {
        setError("🚫 Your account has been restricted by the admin.");
        return;
      }

      // Create or update Firestore user
      await createUserRecord(user.uid, user.email);

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Enter your email first");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("📩 Password reset link sent to your email.");
    } catch (err) {
      console.error(err);
      setError("Failed to send reset email");
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 flex flex-col items-center justify-center px-8 py-16">
      <h1 className="text-4xl font-bold mb-10">Welcome Back</h1>

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-gray-900 p-8 rounded-xl border border-green-500 space-y-4"
      >
        {error && <p className="text-red-400 text-center">{error}</p>}
        {message && <p className="text-green-300 text-center">{message}</p>}

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 bg-transparent border border-green-500 rounded-lg text-green-300"
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 bg-transparent border border-green-500 rounded-lg text-green-300"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-2 rounded-lg transition-transform transform hover:scale-105"
        >
          Login
        </button>

        <p
          onClick={handleForgotPassword}
          className="text-sm text-green-300 underline cursor-pointer hover:text-green-200 text-center"
        >
          Forgot password?
        </p>

        <p className="text-center text-green-300 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-green-400 underline hover:text-green-300">
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
}
