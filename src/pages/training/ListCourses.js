import React from "react";

const courseTable = [
  { title: "Hacking Fundamentals", level: "Beginner", code: "CP-HF101" },
  { title: "Wi-Fi & Wireless Attacks", level: "Intermediate", code: "CP-WF201" },
  { title: "Web Application Exploitation", level: "Intermediate", code: "CP-WEB210" },
  { title: "OSINT & Reconnaissance", level: "Beginner", code: "CP-OS105" },
  { title: "Red Team Operations", level: "Advanced", code: "CP-RT300" },
];

export default function ListCourses() {
  return (
    <div className="min-h-screen bg-black text-green-400 pt-32 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Courses List</h1>
        <p className="text-green-300 mb-6">
          Compact view of all CyberPinnacle courses with codes and levels.
        </p>

        <div className="bg-gray-900 border border-green-500 rounded-xl p-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-green-500 text-green-300">
                <th className="py-2">Code</th>
                <th className="py-2">Title</th>
                <th className="py-2">Level</th>
              </tr>
            </thead>
            <tbody>
              {courseTable.map((c, i) => (
                <tr key={i} className="border-b border-green-800">
                  <td className="py-2">{c.code}</td>
                  <td className="py-2">{c.title}</td>
                  <td className="py-2">{c.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
