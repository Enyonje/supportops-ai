import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/auth.jsx"; // ✅ match actual filename (auth.jsx)

// ---------- Public pages ----------
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import CancelPage from "./pages/CancelPage.jsx";
import SuccessPage from "./pages/SuccessPage.jsx";
import FeaturesPage from "./pages/FeaturesPage.jsx";

// ---------- Layouts ----------
import AgentLayout from "./layouts/AgentLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import InvestorLayout from "./layouts/InvestorLayout.jsx";

// ---------- Agent pages ----------
import Dashboard from "./pages/Dashboard.jsx";
import AnalyticsPage from "./pages/AnalyticsPage.jsx";
import RevenueForecast from "./pages/RevenueForecast.jsx";
import AutonomousBrain from "./pages/AutonomousBrain.jsx";
import AIReviewInbox from "./pages/AIReviewInbox.jsx";
import Billing from "./pages/Billing.jsx";
import Playbooks from "./pages/Playbooks.jsx";

// ---------- Admin pages ----------
import ExecutiveDashboard from "./pages/ExecutiveDashboard.jsx";
import AdminAnalytics from "./pages/AdminAnalytics.jsx";
import IncidentCommandCenter from "./pages/IncidentCommandCenter.jsx";

// ---------- Investor pages ----------
import InvestorMode from "./pages/InvestorMode.jsx";

// ---------- Protected Route Wrapper ----------
function ProtectedRoute({ children }) {
  const auth = useAuth();
  if (!auth) {
    // ✅ graceful fallback if provider not initialized
    return <Navigate to="/login" replace />;
  }
  const { isAuth } = auth;
  return isAuth ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div className="min-h-screen bg-ink">
      <Routes>
        {/* ---------- PUBLIC ---------- */}
        <Route index element={<LandingPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/cancel" element={<CancelPage />} />
        <Route path="/success" element={<SuccessPage />} />

        {/* ---------- AGENT ---------- */}
        <Route
          path="/agent"
          element={
            <ProtectedRoute>
              <AgentLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="revenue" element={<RevenueForecast />} />
          <Route path="brain" element={<AutonomousBrain />} />
          <Route path="inbox" element={<AIReviewInbox />} />
          <Route path="billing" element={<Billing />} />
          <Route path="playbooks" element={<Playbooks />} />
        </Route>

        {/* ---------- ADMIN ---------- */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="executive" replace />} />
          <Route path="executive" element={<ExecutiveDashboard />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="incidents" element={<IncidentCommandCenter />} />
        </Route>

        {/* ---------- INVESTOR ---------- */}
        <Route
          path="/investor"
          element={
            <ProtectedRoute>
              <InvestorLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<InvestorMode />} />
        </Route>

        {/* ---------- FALLBACK ---------- */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}