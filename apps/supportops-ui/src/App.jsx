import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SupportOpsRoutes from "./routes/SupportOpsRoutes";

export default function App() {
  return <Routes>
    <Route path="/supportops/*" element={<SupportOpsRoutes />} />
    <Route path="/" element={<Navigate to="/supportops" replace />} />
    <Route path="*" element={<Navigate to="/supportops" replace />} />
  </Routes>;
}
