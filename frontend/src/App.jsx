import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthProvider.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import CancelPage from "./pages/CancelPage.jsx";
import SuccessPage from "./pages/SuccessPage.jsx";
import FeaturesPage from "./pages/FeaturesPage.jsx";

// Layouts
import AgentLayout from "./layouts/AgentLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import InvestorLayout from "./layouts/InvestorLayout.jsx";

// Agent pages
import Dashboard from "./pages/Dashboard.jsx";
import AnalyticsPage from "./pages/AnalyticsPage.jsx";
import RevenueForecast from "./pages/RevenueForecast.jsx";
import AutonomousBrain from "./pages/AutonomousBrain.jsx";
import AIReviewInbox from "./pages/AIReviewInbox.jsx";
import Billing from "./pages/Billing.jsx";
import Playbooks from "./pages/Playbooks.jsx";

// Admin pages
import ExecutiveDashboard from "./pages/ExecutiveDashboard.jsx";
import AdminAnalytics from "./pages/AdminAnalytics.jsx";
import IncidentCommandCenter from "./pages/IncidentCommandCenter.jsx";

// Investor pages
import InvestorMode from "./pages/InvestorMode.jsx";

export default function App() {
  const { isAuth } = useAuth() || {};

  return (
    <div className="min-h-screen bg-ink">
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/cancel" element={<CancelPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<FeaturesPage />} />

        {/* Agent layout */}
        <Route path="/agent" element={<AgentLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="revenue" element={<RevenueForecast />} />
          <Route path="brain" element={<AutonomousBrain />} />
          <Route path="inbox" element={<AIReviewInbox />} />
          <Route path="billing" element={<Billing />} />
          <Route path="playbooks" element={<Playbooks />} />
        </Route>

        {/* Admin layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="executive" element={<ExecutiveDashboard />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="incidents" element={<IncidentCommandCenter />} />
        </Route>

        {/* Investor layout */}
        <Route path="/investor" element={<InvestorLayout />}>
          <Route index element={<InvestorMode />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}