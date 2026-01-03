// src/components/RoleGuard.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth";

export function RequireAuth({ children }) {
  const { isAuth } = useAuth();
  return isAuth ? children : <Navigate to="/login" replace />;
}

export function RequireRole({ roles = [], children }) {
  const { isAuth, role } = useAuth();
  if (!isAuth) return <Navigate to="/login" replace />;
  return roles.includes(role) ? children : <Navigate to="/dashboard" replace />;
}