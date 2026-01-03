import React from "react";
import { Routes, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

/* Pages */
import Dashboard from "./pages/Dashboard";
import IncidentCommandCenter from "./pages/IncidentCommandCenter";
import Billing from "./pages/Billing";
import InvestorMode from "./pages/InvestorMode";
import RevenueForecast from "./pages/RevenueForecast";
import AutonomousBrain from "./pages/AutonomousBrain";
import ExecutiveDashboard from "./pages/ExecutiveDashboard";
import SuccessPage from "./pages/SuccessPage";
import CancelPage from "./pages/CancelPage";

/* ---------- APP ROOT ---------- */

export default function App() {
  return (
    <>
      <Toaster position="bottom-center" />

      <Routes>
        {/* Core */}
        <Route path="/" element={<Dashboard />} />

        {/* Operations */}
        <Route path="/incidents" element={<IncidentCommandCenter />} />
        <Route path="/brain" element={<AutonomousBrain />} />

        {/* Business */}
        <Route path="/billing" element={<Billing />} />
        <Route path="/revenue-forecast" element={<RevenueForecast />} />
        <Route path="/investors" element={<InvestorMode />} />
        <Route path="/executive" element={<ExecutiveDashboard />} />

        {/* Payments */}
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
      </Routes>
    </>
  );
}