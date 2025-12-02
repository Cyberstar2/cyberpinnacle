// src/components/Navbar.js
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo/cyberpinnacle-logo.jpg";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [articlesOpen, setArticlesOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  // Username + initials (fallback to A)
  const username =
    user?.displayName || (user?.email ? user.email.split("@")[0] : "");
  const initials = username ? username[0].toUpperCase() : "A";

  const isActive = (path) =>
    location.pathname === path
      ? "text-green-300"
      : "text-green-400 hover:text-green-300";

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-black via-slate-950 to-black/95 backdrop-blur-xl border-b border-green-500/70 shadow-[0_0_25px_rgba(34,197,94,0.35)] z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-3 group"
          onClick={() => setMenuOpen(false)}
        >
          <div className="relative">
            <img
              src={logo}
              alt="CyberPinnacle"
              className="w-10 h-10 md:w-12 md:h-12 rounded-md border border-green-500/60 shadow-[0_0_18px_rgba(34,197,94,0.5)]"
            />
          </div>
          <span className="text-green-400 text-lg md:text-xl font-extrabold tracking-wide group-hover:text-green-300 transition-colors">
            CyberPinnacle
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {/* Left links */}
          <div className="flex items-center space-x-5 text-green-400">
            <Link to="/" className={isActive("/")}>
              Home
            </Link>
            <Link to="/about" className={isActive("/about")}>
              About
            </Link>
            <Link to="/projects" className={isActive("/projects")}>
              Projects
            </Link>
            <Link to="/ctf" className={isActive("/ctf")}>
              CTF
            </Link>
            <Link to="/leaderboard" className={isActive("/leaderboard")}>
              Leaderboard
            </Link>
            <Link to="/courses" className={isActive("/courses")}>
              Courses
            </Link>
          </div>

          {/* Articles Dropdown */}
          <div
            className="relative text-green-400 cursor-pointer"
            onMouseEnter={() => setArticlesOpen(true)}
            onMouseLeave={() => setArticlesOpen(false)}
          >
            <span className="hover:text-green-300 flex items-center gap-1">
              Articles ▾
            </span>

            {articlesOpen && (
              <div className="absolute top-8 right-0 bg-black/95 border border-green-500 rounded-xl p-4 w-72 max-h-72 overflow-y-auto grid grid-cols-1 gap-2 shadow-[0_0_28px_rgba(34,197,94,0.55)]">
                <Link
                  to="/articles/ip-camera-hacking"
                  className="hover:text-green-300"
                >
                  IP Camera Hacking
                </Link>
                <Link
                  to="/articles/bluetooth-hacking"
                  className="hover:text-green-300"
                >
                  Bluetooth Hacking
                </Link>
                <Link
                  to="/articles/wifi-hacking"
                  className="hover:text-green-300"
                >
                  Wi-Fi Hacking
                </Link>
                <Link to="/articles/osint" className="hover:text-green-300">
                  OSINT & Recon
                </Link>
                <Link to="/articles/bug-bounty" className="hover:text-green-300">
                  Bug Bounty
                </Link>
                <Link to="/articles/mrrobot" className="hover:text-green-300">
                  Mr. Robot Hacks
                </Link>
                <Link to="/articles/malware" className="hover:text-green-300">
                  Malware Analysis
                </Link>
                <Link to="/articles/linux" className="hover:text-green-300">
                  Linux
                </Link>
              </div>
            )}
          </div>

          {/* AI Assistant */}
          <Link to="/ai" className={isActive("/ai")}>
            AI Assistant
          </Link>

          {/* User Section */}
          {user ? (
            <div className="relative group ml-4">
              <button className="flex items-center gap-2 text-green-300">
                <div className="w-8 h-8 flex items-center justify-center rounded-full border border-green-400/70 bg-black/70 shadow-[0_0_20px_rgba(34,197,94,0.5)] text-xs font-bold">
                  {initials}
                </div>
                <span className="text-xs md:text-sm font-semibold">
                  {username || "User"}
                </span>
                <span className="text-[10px] opacity-70">▼</span>
              </button>

              <div className="absolute right-0 mt-2 bg-black border border-green-500 rounded-xl p-3 w-52 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-150 shadow-[0_0_25px_rgba(34,197,94,0.55)] text-sm">
                <Link
                  to="/dashboard"
                  className="block py-1 hover:text-green-300"
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="block py-1 hover:text-green-300"
                >
                  Profile
                </Link>

                {/* Admin panel link for main admin */}
                {user.email === "cyberpinnacle7@gmail.com" && (
                  <>
                    <div className="border-t border-green-800 my-2" />
                    <Link
                      to="/admin"
                      className="block py-1 text-amber-300 hover:text-amber-200"
                    >
                      Admin Panel
                    </Link>
                  </>
                )}

                <div className="border-t border-green-800 my-2" />
                <button
                  onClick={logout}
                  className="w-full text-left text-red-300 hover:text-red-200 text-sm"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="ml-4 bg-green-500 text-black px-4 py-1.5 rounded-lg hover:bg-green-400 font-semibold text-sm shadow-[0_0_18px_rgba(34,197,94,0.6)]"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-green-400 text-3xl"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Slide-down Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 border-t border-green-500 px-6 py-4 space-y-4 text-green-300 text-sm">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link to="/projects" onClick={() => setMenuOpen(false)}>
            Projects
          </Link>
          <Link to="/ctf" onClick={() => setMenuOpen(false)}>
            CTF
          </Link>
          <Link to="/leaderboard" onClick={() => setMenuOpen(false)}>
            Leaderboard
          </Link>
          <Link to="/courses" onClick={() => setMenuOpen(false)}>
            Courses
          </Link>
          <Link to="/ai" onClick={() => setMenuOpen(false)}>
            AI Assistant
          </Link>
          <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
            Dashboard
          </Link>

          {user && user.email === "cyberpinnacle7@gmail.com" && (
            <Link
              to="/admin"
              onClick={() => setMenuOpen(false)}
              className="text-amber-300"
            >
              Admin Panel
            </Link>
          )}

          {user ? (
            <button
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
              className="text-left w-full text-red-400 mt-2"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="text-green-300"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
