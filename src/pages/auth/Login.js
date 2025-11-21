import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { createUserRecord } from "../../services/scoreService";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      // Create Firestore user record if does not exist
      await createUserRecord(result.user.uid);

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid login credentials");
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

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 bg-transparent border border-green-500 rounded-lg focus:outline-none text-green-300"
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 bg-transparent border border-green-500 rounded-lg focus:outline-none text-green-300"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-2 rounded-lg transition-transform transform hover:scale-105"
        >
          Login
        </button>

        <p className="text-center text-green-300 text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-green-400 underline hover:text-green-300"
          >
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
}
