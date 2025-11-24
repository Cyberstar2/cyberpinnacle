import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo/cyberpinnacle-logo.jpg";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "react-feather";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [articlesOpen, setArticlesOpen] = useState(false);
  const [trainingOpen, setTrainingOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/90 backdrop-blur-lg border-b border-green-400 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} alt="CyberPinnacle" className="w-12 h-12 rounded-md" />
          <span className="text-green-400 text-xl font-bold">CyberPinnacle</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-green-400 font-semibold">

          <Link to="/" className="hover:text-green-300">Home</Link>
          <Link to="/about" className="hover:text-green-300">About</Link>
          <Link to="/team" className="hover:text-green-300">Team</Link>
          <Link to="/projects" className="hover:text-green-300">Projects</Link>
          <Link to="/contact" className="hover:text-green-300">Contact</Link>
          <Link to="/ctf" className="hover:text-green-300">CTF</Link>
          <Link to="/leaderboard" className="hover:text-green-300">Leaderboard</Link>
          <Link to="/courses" className="hover:text-green-300">Courses</Link>

          {/* Training Dropdown */}
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => setTrainingOpen(true)}
            onMouseLeave={() => setTrainingOpen(false)}
          >
            <span className="hover:text-green-300">Training ▾</span>

            {trainingOpen && (
              <div className="absolute top-6 left-0 bg-black border border-green-400 rounded-lg p-3 space-y-2 w-56">
                <Link to="/memberships" className="hover:text-green-300 block">Memberships</Link>
                <Link to="/training-packages" className="hover:text-green-300 block">Training Packages</Link>
                <Link to="/career-training" className="hover:text-green-300 block">Career Training</Link>
                <Link to="/for-organizations" className="hover:text-green-300 block">For Organizations</Link>
                <Link to="/list-courses" className="hover:text-green-300 block">List of Courses</Link>
                <Link to="/training-paths" className="hover:text-green-300 block">Training Paths</Link>
                <Link to="/compare-packages" className="hover:text-green-300 block">Compare Packages</Link>
              </div>
            )}
          </div>

          {/* Articles Dropdown */}
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => setArticlesOpen(true)}
            onMouseLeave={() => setArticlesOpen(false)}
          >
            <span className="hover:text-green-300">Articles ▾</span>

            {articlesOpen && (
              <div className="absolute top-6 left-0 bg-black border border-green-400 rounded-lg p-3 grid grid-cols-1 gap-2 w-64">
                <Link to="/articles/ip-camera-hacking" className="hover:text-green-300 block">IP Camera Hacking</Link>
                <Link to="/articles/bluetooth-hacking" className="hover:text-green-300 block">Bluetooth Hacking</Link>
                <Link to="/articles/wifi-hacking" className="hover:text-green-300 block">Wi-Fi Hacking</Link>
                <Link to="/articles/mobile-hacking" className="hover:text-green-300 block">Mobile Hacking</Link>
                <Link to="/articles/cybersecurity-tools" className="hover:text-green-300 block">Cybersecurity Tools</Link>
                <Link to="/articles/network-exploitation" className="hover:text-green-300 block">Network Exploitation</Link>
                <Link to="/articles/database-hacking" className="hover:text-green-300 block">Database Hacking</Link>
                <Link to="/articles/anti-forensics" className="hover:text-green-300 block">Anti-Forensics & OpSec</Link>
                <Link to="/articles/osint" className="hover:text-green-300 block">OSINT & Recon</Link>
                <Link to="/articles/bug-bounty" className="hover:text-green-300 block">Bug Bounty</Link>
                <Link to="/articles/mrrobot" className="hover:text-green-300 block">Mr. Robot Hacks</Link>
                <Link to="/articles/metasploit" className="hover:text-green-300 block">Metasploit</Link>
                <Link to="/articles/web-exploitation" className="hover:text-green-300 block">Web Application Exploitation</Link>
                <Link to="/articles/vuln-scanning" className="hover:text-green-300 block">Vulnerability Scanning</Link>
                <Link to="/articles/fundamentals" className="hover:text-green-300 block">Hacking Fundamentals</Link>
                <Link to="/articles/crypto" className="hover:text-green-300 block">Bitcoin & Crypto</Link>
                <Link to="/articles/malware" className="hover:text-green-300 block">Malware Analysis</Link>
                <Link to="/articles/linux" className="hover:text-green-300 block">Linux</Link>
              </div>
            )}
          </div>

          {/* AI Assistant */}
          <Link to="/ai" className="hover:text-green-300">AI Assistant</Link>

          {/* Auth */}
          {user ? (
            <div className="relative group">
              <button className="text-green-400 font-semibold">
                Hello, {user.email} ▼
              </button>
              <div className="absolute right-0 mt-2 bg-black border border-green-400 rounded-lg p-3 w-48 opacity-0 group-hover:opacity-100 transition">
                <Link to="/dashboard" className="block hover:text-green-300">Dashboard</Link>
                <Link to="/profile" className="block hover:text-green-300 mt-1">Profile</Link>
                <button onClick={logout} className="text-left w-full hover:text-red-300 mt-2">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="bg-green-500 text-black px-4 py-1 rounded-lg hover:bg-green-400">
              Login
            </Link>
          )}

          {/* Sun / Moon Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-green-500 hover:bg-green-500 hover:text-black transition"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-green-400 text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>
    </nav>
  );
}
