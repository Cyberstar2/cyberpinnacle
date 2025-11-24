import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Main pages
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Team from "./pages/Team";
import AdminLogs from "./pages/AdminLogs";
import AdminDashboard from "./pages/AdminDashboard";
import SOCMonitor from "./pages/admin/SOCMonitor";


// Articles / Blog
import Articles from "./pages/Articles";
import ArticleTemplate from "./pages/articles/ArticleTemplate";

// AI Platform
import AILayout from "./pages/ai/AILayout";
import CyberAI from "./pages/ai/CyberAI";
import AIDashboardHome from "./pages/ai/AIDashboardHome";
import ReconTools from "./pages/ai/ReconTools";
import AttackLab from "./pages/ai/AttackLab";
import ForensicsLab from "./pages/ai/ForensicsLab";
import Reports from "./pages/ai/Reports";

// CTF
import CTF from "./pages/ctf/CTF";
import ChallengeDetails from "./pages/ctf/ChallengeDetails";

// Auth & Dashboard
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Leaderboard from "./pages/leaderboard/Leaderboard";

// Training & Courses
import Training from "./pages/training/Training";
import Courses from "./pages/Courses";
import Memberships from "./pages/training/Memberships";
import TrainingPackages from "./pages/training/TrainingPackages";
import CareerTraining from "./pages/training/CareerTraining";
import ForOrganizations from "./pages/training/ForOrganizations";
import ListCourses from "./pages/training/ListCourses";
import TrainingPaths from "./pages/training/TrainingPaths";
import ComparePackages from "./pages/training/ComparePackages";
import CourseDetails from "./pages/training/CourseDetails";

function App() {
  return (
    <Router>
      <div className="bg-black min-h-screen text-green-400 flex flex-col pt-24">
        <Navbar />

        <div className="flex-grow">
          <Routes>

            {/* Main */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/team" element={<Team />} />

            {/* Articles */}
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:slug" element={<ArticleTemplate />} />

            {/* AI Platform (Nested Routes) */}
            <Route path="/ai" element={<AILayout />}>
              <Route index element={<CyberAI />} />
              <Route path="dashboard" element={<AIDashboardHome />} />
              <Route path="recon" element={<ReconTools />} />
              <Route path="lab" element={<AttackLab />} />
              <Route path="forensics" element={<ForensicsLab />} />
              <Route path="reports" element={<Reports />} />
              
            </Route>

            {/* Admin */}
            <Route path="/admin/logs" element={<AdminLogs />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/soc" element={<SOCMonitor />} />

            {/* CTF */}
            <Route path="/ctf" element={<CTF />} />
            <Route
              path="/ctf/:title"
              element={
                <ProtectedRoute>
                  <ChallengeDetails />
                </ProtectedRoute>
              }
            />

            {/* Auth */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            {/* Dashboard (User) */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Leaderboard */}
            <Route path="/leaderboard" element={<Leaderboard />} />

            {/* Training & Courses */}
            <Route path="/training" element={<Training />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route path="/memberships" element={<Memberships />} />
            <Route path="/training-packages" element={<TrainingPackages />} />
            <Route path="/career-training" element={<CareerTraining />} />
            <Route path="/for-organizations" element={<ForOrganizations />} />
            <Route path="/list-courses" element={<ListCourses />} />
            <Route path="/training-paths" element={<TrainingPaths />} />
            <Route path="/compare-packages" element={<ComparePackages />} />

          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      {/* existing code */}
    </ThemeProvider>
  );
}

export default App;


