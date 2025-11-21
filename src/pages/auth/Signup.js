import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/login"); // redirect after successful signup
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 flex flex-col items-center justify-center px-8 py-16">
      <h1 className="text-4xl font-bold mb-10">Create Account</h1>

      <form onSubmit={handleSignup} className="w-full max-w-md bg-gray-900 p-8 rounded-xl border border-green-500 space-y-4">
        
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
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 bg-transparent border border-green-500 rounded-lg focus:outline-none text-green-300"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-2 rounded-lg transition-transform transform hover:scale-105"
        >
          Sign Up
        </button>

        <p className="text-center text-green-300 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-green-400 underline hover:text-green-300">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
