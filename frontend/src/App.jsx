import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

/* AUTH */
import LoginPage from "./pages/LoginPage";

/* CORE DASHBOARDS */
import Dashboard from "./pages/Dashboard";
import ExecutiveDashboard from "./pages/ExecutiveDashboard";
import AdminAnalytics from "./pages/AdminAnalytics";
import InvestorMode from "./pages/InvestorMode";

/* AI & OPERATIONS */
import AutonomousBrain from "./pages/AutonomousBrain";
import AIReviewInbox from "./pages/AIReviewInbox";
import IncidentCommandCenter from "./pages/IncidentCommandCenter";
import Playbooks from "./pages/Playbooks";

/* ANALYTICS & FINANCE */
import AnalyticsPage from "./pages/AnalyticsPage";
import RevenueForecast from "./pages/RevenueForecast";
import Billing from "./pages/Billing";

/* PAYMENTS */
import SuccessPage from "./pages/SuccessPage";
import CancelPage from "./pages/CancelPage";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <AnalyticsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/billing"
            element={
              <ProtectedRoute role="admin">
                <Billing />
              </ProtectedRoute>
            }
          />

          <Route
            path="/investor"
            element={
              <ProtectedRoute role="admin">
                <InvestorMode />
              </ProtectedRoute>
            }
          />

          <Route
            path="/autonomous-brain"
            element={
              <ProtectedRoute>
                <AutonomousBrain />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default function App() {
  return (
    <Routes>
      {/* AUTH */}
      <Route path="/login" element={<LoginPage />} />

      {/* DEFAULT ENTRY */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* DASHBOARDS */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/executive" element={<ExecutiveDashboard />} />
      <Route path="/admin/analytics" element={<AdminAnalytics />} />
      <Route path="/investor" element={<InvestorMode />} />

      {/* AI & OPERATIONS */}
      <Route path="/ai/brain" element={<AutonomousBrain />} />
      <Route path="/ai/review-inbox" element={<AIReviewInbox />} />
      <Route path="/incidents" element={<IncidentCommandCenter />} />
      <Route path="/playbooks" element={<Playbooks />} />

      {/* ANALYTICS & FINANCE */}
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/revenue-forecast" element={<RevenueForecast />} />
      <Route path="/billing" element={<Billing />} />

      {/* PAYMENTS */}
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/cancel" element={<CancelPage />} />

      {/* 404 FALLBACK */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}