// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/auth";

// ✅ add .jsx extension and match case exactly
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { RequireAuth, RequireRole } from "./components/RoleGuard.jsx";

import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ExecutiveDashboard from "./pages/ExecutiveDashboard.jsx";
import AdminAnalytics from "./pages/AdminAnalytics.jsx";
import InvestorMode from "./pages/InvestorMode.jsx";
import RevenueForecast from "./pages/RevenueForecast.jsx";
import AutonomousBrain from "./pages/AutonomousBrain.jsx";
import AnalyticsPage from "./pages/AnalyticsPage.jsx";

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