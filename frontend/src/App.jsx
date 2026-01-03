// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/auth";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { RequireAuth, RequireRole } from "./components/RoleGuard";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ExecutiveDashboard from "./pages/ExecutiveDashboard";
import AdminAnalytics from "./pages/AdminAnalytics";
import InvestorMode from "./pages/InvestorMode";
import RevenueForecast from "./pages/RevenueForecast";
import AutonomousBrain from "./pages/AutonomousBrain";
import AnalyticsPage from "./pages/AnalyticsPage";

export default function App() {
  const { isAuth } = useAuth();

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {isAuth && <Navbar />}
      <div className="flex">
        {isAuth && <Sidebar />}
        <main className="flex-1 p-4 md:p-8">
          <Routes>
            {/* Public */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Protected: user */}
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/analytics"
              element={
                <RequireAuth>
                  <AnalyticsPage />
                </RequireAuth>
              }
            />
            <Route
              path="/revenue"
              element={
                <RequireAuth>
                  <RevenueForecast />
                </RequireAuth>
              }
            />
            <Route
              path="/brain"
              element={
                <RequireAuth>
                  <AutonomousBrain />
                </RequireAuth>
              }
            />

            {/* Protected: admin */}
            <Route
              path="/executive"
              element={
                <RequireRole roles={["admin"]}>
                  <ExecutiveDashboard />
                </RequireRole>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <RequireRole roles={["admin"]}>
                  <AdminAnalytics />
                </RequireRole>
              }
            />

            {/* Protected: investor */}
            <Route
              path="/investor"
              element={
                <RequireRole roles={["investor", "admin"]}>
                  <InvestorMode />
                </RequireRole>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}