export const challengesData = [
  {
    id: "intro-ctf",
    title: "Intro to CTF",
    category: "Hacking Fundamentals",
    difficulty: "Easy",
    points: 50,
    unlockScore: 0,

    description:
      "Welcome to CyberPinnacle CTF Arena. Before you can submit a flag, understand how flags work in cybersecurity challenges.",

    task:
      "Find the hidden flag format used across all CyberPinnacle challenges.",

    hint: "Flags usually look like CPCTF{something_here}",

    flag: "CPCTF{welcome123}",
  },

  {
    id: "osint-email",
    title: "OSINT: Find the Email",
    category: "OSINT & Recon",
    difficulty: "Easy",
    points: 75,
    unlockScore: 50,

    description:
      "Open Source Intelligence challenge. Investigate publicly available information.",

    task:
      "Find the email address of the target using OSINT techniques.",

    hint:
      "Try searching usernames across platforms or check metadata leaks.",

    flag: "CPCTF{osint_master}",
  },

  {
    id: "wifi-handshake",
    title: "Wi-Fi Handshake Capture",
    category: "Wireless Security",
    difficulty: "Medium",
    points: 100,
    unlockScore: 125,

    description:
      "A WPA handshake was captured. Your mission is to analyze it.",

    task:
      "Identify the correct handshake file and extract the hidden flag.",

    hint: "Wireshark or aircrack-ng might help here.",

    flag: "CPCTF{handshake_cracked}",
  },

  {
    id: "sqli-login",
    title: "SQLi Login Bypass",
    category: "Web Exploitation",
    difficulty: "Hard",
    points: 200,
    unlockScore: 225,

    description:
      "A login page is vulnerable to SQL injection.",

    task:
      "Bypass authentication and retrieve admin access.",

    hint: "Try classic SQLi payloads like ' OR 1=1 --",

    flag: "CPCTF{sqli_mastered}",
  },
];