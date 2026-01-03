// src/context/auth.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState("user"); // default

  useEffect(() => {
    const t = localStorage.getItem("access_token");
    const r = localStorage.getItem("role"); // set at login
    setToken(t || null);
    setRole(r || "user");
  }, []);

  const login = (newToken, userRole = "user") => {
    localStorage.setItem("access_token", newToken);
    localStorage.setItem("role", userRole);
    setToken(newToken);
    setRole(userRole);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    setToken(null);
    setRole("user");
  };

  const value = useMemo(() => ({ token, role, login, logout, isAuth: !!token }), [token, role]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}