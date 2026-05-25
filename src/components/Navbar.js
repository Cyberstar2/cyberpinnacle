// src/components/Navbar.js

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo/cyberpinnacle-logo.jpg";
import { useAuth } from "../context/AuthContext";
import { getScore } from "../services/scoreService";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [articlesOpen, setArticlesOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [score, setScore] = useState(0);

  /* =========================
     LOAD USER SCORE
  ========================= */
  useEffect(() => {
    async function loadScore() {
      if (user) {
        const s = await getScore(user.uid);
        setScore(s);
      }
    }

    loadScore();
  }, [user]);

  /* =========================
     THEME
  ========================= */
  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved === "light") {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const next = !prev;

      localStorage.setItem("theme", next ? "dark" : "light");

      document.documentElement.classList.toggle("dark", next);

      return next;
    });
  };

  const username =
    user?.displayName ||
    (user?.email ? user.email.split("@")[0] : "");

  const initials = username
    ? username[0].toUpperCase()
    : "A";

  const isActive = (path) =>
    location.pathname === path
      ? "text-green-300 border-b border-green-400 pb-1"
      : "text-green-400 hover:text-green-300";

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/95 backdrop-blur-xl border-b border-green-500/40 z-50 shadow-lg shadow-green-500/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex justify-between items-center">

        {/* =========================
            LOGO
        ========================= */}
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={() => setMenuOpen(false)}
        >
          <img
            src={logo}
            alt="CyberPinnacle"
            className="w-11 h-11 rounded-lg border border-green-500 shadow-md shadow-green-500/20"
          />

          <div>
            <h1 className="text-green-400 font-extrabold text-lg leading-none">
              CyberPinnacle
            </h1>

            <p className="text-[10px] text-green-600 tracking-widest">
              CYBER SECURITY PLATFORM
            </p>
          </div>
        </Link>

        {/* =========================
            DESKTOP NAV
        ========================= */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">

          <Link to="/" className={isActive("/")}>
            Home
          </Link>

          <Link to="/about" className={isActive("/about")}>
            About
          </Link>

          <Link to="/projects" className={isActive("/projects")}>
            Projects
          </Link>

          {/* CTF */}
          <Link
            to="/ctf"
            className={`${isActive("/ctf")} flex items-center gap-2`}
          >
            CTF

            <span className="bg-green-500 text-black text-[10px] px-2 py-[2px] rounded-full font-bold animate-pulse">
              LIVE
            </span>
          </Link>

          <Link
            to="/leaderboard"
            className={isActive("/leaderboard")}
          >
            Leaderboard
          </Link>

          <Link
            to="/courses"
            className={isActive("/courses")}
          >
            Courses
          </Link>

          {/* =========================
              ARTICLES DROPDOWN
          ========================= */}
          <div
            className="relative"
            onMouseEnter={() => setArticlesOpen(true)}
            onMouseLeave={() => setArticlesOpen(false)}
          >
            <button className="text-green-400 hover:text-green-300">
              Articles ▾
            </button>

            {articlesOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-black border border-green-500 rounded-2xl p-4 space-y-2 shadow-2xl">

                {[
                  "ip-camera-hacking",
                  "bluetooth-hacking",
                  "wifi-hacking",
                  "osint",
                  "bug-bounty",
                  "mrrobot",
                  "malware",
                  "linux",
                ].map((slug) => (
                  <Link
                    key={slug}
                    to={`/articles/${slug}`}
                    className="block hover:text-green-300 transition"
                  >
                    {slug.replace("-", " ").toUpperCase()}
                  </Link>
                ))}

              </div>
            )}
          </div>

          {/* AI */}
          <Link
            to="/ai"
            className={`${isActive("/ai")} flex items-center gap-2`}
          >
            AI Assistant

            <span className="w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
          </Link>

          {/* =========================
              THEME TOGGLE
          ========================= */}
          <button
            onClick={toggleTheme}
            className="text-green-400 border border-green-500 px-3 py-1 rounded-lg hover:bg-green-500 hover:text-black transition"
          >
            {darkMode ? "🌙" : "☀️"}
          </button>

          {/* =========================
              USER SECTION
          ========================= */}
          {user ? (
            <div className="relative group ml-2">

              <button className="flex items-center gap-3 border border-green-500 rounded-full px-3 py-1 hover:bg-green-500/10 transition">

                {/* Avatar */}
                <div className="w-9 h-9 rounded-full border border-green-400 flex items-center justify-center font-bold">
                  {initials}
                </div>

                {/* User Info */}
                <div className="text-left">
                  <p className="text-xs text-green-300 leading-none">
                    {username}
                  </p>

                  <p className="text-[10px] text-green-500">
                    {score} pts
                  </p>
                </div>
              </button>

              {/* DROPDOWN */}
              <div className="absolute right-0 mt-3 bg-black border border-green-500 rounded-2xl p-4 w-60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-2xl">

                <div className="border-b border-green-500/30 pb-3 mb-3">
                  <p className="text-green-300 text-sm font-bold">
                    {username}
                  </p>

                  <p className="text-green-500 text-xs">
                    {score} Total Points
                  </p>
                </div>

                <Link
                  to="/dashboard"
                  className="block py-2 hover:text-green-300"
                >
                  Dashboard
                </Link>

                <Link
                  to="/profile"
                  className="block py-2 hover:text-green-300"
                >
                  Profile
                </Link>

                <Link
                  to="/leaderboard"
                  className="block py-2 hover:text-green-300"
                >
                  Leaderboard
                </Link>

                {/* ADMIN */}
                {user.email === "cyberpinnacle7@gmail.com" && (
                  <Link
                    to="/admin"
                    className="block py-2 text-amber-300"
                  >
                    Admin Panel
                  </Link>
                )}

                <button
                  onClick={logout}
                  className="mt-3 w-full bg-red-500/10 border border-red-500 text-red-400 py-2 rounded-lg hover:bg-red-500 hover:text-white transition"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-green-500 text-black px-5 py-2 rounded-lg font-bold hover:bg-green-400 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* =========================
            MOBILE MENU BUTTON
        ========================= */}
        <button
          className="md:hidden text-green-400 text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* =========================
          MOBILE MENU
      ========================= */}
      {menuOpen && (
        <div className="md:hidden bg-black border-t border-green-500 px-6 py-5 space-y-4 text-green-300">

          {[
            ["/", "Home"],
            ["/about", "About"],
            ["/projects", "Projects"],
            ["/ctf", "CTF Arena"],
            ["/leaderboard", "Leaderboard"],
            ["/courses", "Courses"],
            ["/ai", "AI Assistant"],
          ].map(([path, label]) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMenuOpen(false)}
              className="block hover:text-green-400"
            >
              {label}
            </Link>
          ))}

          <button
            onClick={toggleTheme}
            className="block border border-green-500 px-4 py-2 rounded-lg"
          >
            Toggle Theme
          </button>

          {user ? (
            <>
              <div className="border-t border-green-500/30 pt-4">
                <p className="text-green-300">
                  {username}
                </p>

                <p className="text-green-500 text-sm">
                  {score} pts
                </p>
              </div>

              <button
                onClick={logout}
                className="text-red-400"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}