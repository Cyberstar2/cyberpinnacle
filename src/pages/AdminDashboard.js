import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://cyberpinnacle-backend.onrender.com"
    : "http://localhost:5000";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await axios.get(`${API_BASE}/admin/stats`);
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    loadStats();
  }, []);

  if (!stats) return <p className="text-center text-green-400">Loading...</p>;

  const pieData = {
  labels: ["Critical", "Warning", "Info"],
  datasets: [
    {
      data: [
        stats?.threatCounts?.CRITICAL || 0,
        stats?.threatCounts?.WARNING || 0,
        stats?.threatCounts?.INFO || 0,
      ],
      backgroundColor: ["#f87171", "#facc15", "#4ade80"],
    },
  ],
};

const timelineData = {
  labels: stats?.timeline?.map((t) => t.date) || [],
  datasets: [
    {
      label: "Cases per Day",
      data: stats?.timeline?.map((t) => t.count) || [],
      borderWidth: 2,
    },
  ],
};

    

  const timelineData = {
    labels: stats.timeline.map((t) => t.date),
    datasets: [
      {
        label: "Cases per Day",
        data: stats.timeline.map((t) => t.count),
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-green-400 mb-6 text-center">
        CyberPinnacle Admin Analytics Dashboard
      </h1>

      {/* Summary boxes */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-900 border border-green-700 p-4 rounded-xl text-center">
          <h2 className="text-xl font-bold text-green-300">Total Cases</h2>
          <p className="text-3xl font-bold text-green-500 mt-2">
            {stats.totalCases}
          </p>
        </div>

        <div className="bg-gray-900 border border-green-700 p-4 rounded-xl text-center">
          <h2 className="text-xl font-bold text-green-300">Suspicious IPs</h2>
          <p className="text-2xl font-bold text-green-500 mt-2">
            {stats.totalIPs}
          </p>
        </div>

        <div className="bg-gray-900 border border-green-700 p-4 rounded-xl text-center">
          <h2 className="text-xl font-bold text-green-300">Reports Created</h2>
          <p className="text-2xl font-bold text-green-500 mt-2">
            {stats.totalReports}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-green-700 p-4 rounded-xl">
          <h3 className="text-lg font-bold text-green-400 mb-3">
            Threat Level Distribution
          </h3>
          <Pie data={pieData} />
        </div>

        <div className="bg-gray-900 border border-green-700 p-4 rounded-xl">
          <h3 className="text-lg font-bold text-green-400 mb-3">
            Cases Timeline
          </h3>
          <Line data={timelineData} />
        </div>
      </div>
    </div>
  );
}
