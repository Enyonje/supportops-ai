import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import FeaturesPage from "./pages/FeaturesPage";

// Layouts
import AgentLayout from "./layouts/AgentLayout";
import AdminLayout from "./layouts/AdminLayout";
import InvestorLayout from "./layouts/InvestorLayout";

// Agent
import Dashboard from "./pages/Dashboard";
import AnalyticsPage from "./pages/AnalyticsPage";

// Admin
import ExecutiveDashboard from "./pages/ExecutiveDashboard";

// Investor
import InvestorMode from "./pages/InvestorMode";

// Guards
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const { isAuth, user } = useAuth();

  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/features" element={<FeaturesPage />} />

      <Route
        path="/login"
        element={isAuth ? <Navigate to="/agent/dashboard" /> : <LoginPage />}
      />
      <Route
        path="/signup"
        element={isAuth ? <Navigate to="/agent/dashboard" /> : <SignupPage />}
      />

      {/* Agent */}
      <Route
        path="/agent"
        element={
          <ProtectedRoute>
            <AgentLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="analytics" element={<AnalyticsPage />} />
      </Route>

      {/* Admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="executive" element={<ExecutiveDashboard />} />
      </Route>

      {/* Investor */}
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

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
