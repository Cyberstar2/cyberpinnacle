import React from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FaRobot,
  FaTachometerAlt,
  FaSatelliteDish,
  FaFlask,
  FaUserSecret,
  FaChartBar,
  FaBook,
  FaCog,
} from "react-icons/fa";

export default function AILayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActiveRoot = location.pathname === "/ai";

  return (
    <div className="flex min-h-[calc(100vh-6rem)] bg-black text-green-400">
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-green-700 bg-gradient-to-b from-black to-[#020617] px-4 py-6">
        <div
          className="flex items-center gap-3 mb-8 cursor-pointer"
          onClick={() => navigate("/ai/dashboard")}
        >
          <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center text-black font-extrabold">
            CP
          </div>
          <div>
            <h1 className="text-sm font-bold text-green-300 tracking-wide">
              CyberPinnacle AI
            </h1>
            <p className="text-[11px] text-green-600">
              Cybersecurity Command Center
            </p>
          </div>
        </div>

        <nav className="space-y-1 text-sm">
          <SidebarLink
            to="/ai/dashboard"
            icon={<FaTachometerAlt />}
            label="Dashboard"
          />
          <SidebarLink
            to="/ai"
            icon={<FaRobot />}
            label="AI Assistant"
            isRoot={true}
            isActiveRoot={isActiveRoot}
          />
          <SidebarLink
            to="/ai/recon"
            icon={<FaSatelliteDish />}
            label="Recon Tools"
          />
          <SidebarLink
            to="/ai/lab"
            icon={<FaFlask />}
            label="Attack Lab"
          />
          <SidebarLink
            to="/ai/forensics"
            icon={<FaUserSecret />}
            label="Forensics Lab"
          />
          <SidebarLink
            to="/ai/reports"
            icon={<FaChartBar />}
            label="Reports"
          />
        </nav>

        <div className="mt-8 border-t border-green-800 pt-4 space-y-2 text-[12px]">
          <button
            onClick={() => (window.location.href = "/admin/logs")}
            className="w-full text-left px-3 py-2 rounded-lg border border-green-700 hover:border-green-500 hover:bg-green-950/40 flex items-center gap-2"
          >
            <FaBook className="text-green-400" />
            <span>Admin Logs</span>
          </button>

          <button className="w-full text-left px-3 py-2 rounded-lg border border-green-700 hover:border-green-500 hover:bg-green-950/40 flex items-center gap-2">
            <FaCog className="text-green-400" />
            <span>Settings (coming)</span>
          </button>
        </div>
      </aside>

      {/* MAIN AREA */}
      <main className="flex-1 flex flex-col bg-gradient-to-b from-black via-[#020617] to-black">
        <div className="flex-1 px-4 sm:px-8 py-6 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function SidebarLink({ to, icon, label, isRoot = false, isActiveRoot = false }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        const active = isRoot ? isActiveRoot : isActive;
        return [
          "flex items-center gap-3 px-3 py-2 rounded-lg transition-all",
          active
            ? "bg-green-600/20 border border-green-500 text-green-200 shadow-[0_0_12px_rgba(34,197,94,0.5)]"
            : "border border-transparent text-green-500 hover:border-green-700 hover:bg-green-950/40",
        ].join(" ");
      }}
    >
      <span className="text-base">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}
