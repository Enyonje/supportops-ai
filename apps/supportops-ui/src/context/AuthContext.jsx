import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const API_BASE = (import.meta.env.VITE_SUPPORTOPS_API_URL || import.meta.env.VITE_API_BASE_URL || "https://supportops-ai.onrender.com").replace(/\/$/, "").replace(/\/api\/v1$/, "").replace(/\/api$/, "") + "/api/v1";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [workspace, setWorkspace] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("supportops_token"));
  const [loading, setLoading] = useState(true);

  const refreshSession = useCallback(async () => {
    const storedToken = localStorage.getItem("supportops_token");
    if (!storedToken) { setUser(null); setWorkspace(null); setLoading(false); return null; }
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/supportops/me`, { headers: { Authorization: `Bearer ${storedToken}`, Accept: "application/json", "X-App-Slug": "supportops" } });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success) {
        localStorage.removeItem("supportops_token"); setToken(null); setUser(null); setWorkspace(null); return null;
      }
      setUser(data.user || null); setWorkspace(data.workspace || null); return data;
    } catch (error) {
      console.error("[SupportOps session verification]", error);
      throw error;
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { refreshSession().catch(() => setLoading(false)); }, [token, refreshSession]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/supportops/login`, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json", "X-App-Slug": "supportops" }, body: JSON.stringify({ email, password }) });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success || !data?.token) throw new Error(data?.message || data?.error || "Authentication failed.");
      localStorage.setItem("supportops_token", data.token); setToken(data.token);
      setUser(data.user || null); setWorkspace(data.workspace || null);
      window.location.assign(data.redirectUrl || "/supportops/admin/executive");
      return data;
    } finally { setLoading(false); }
  };

  const logout = () => {
    localStorage.removeItem("supportops_token"); setToken(null); setUser(null); setWorkspace(null);
    window.location.assign("/supportops/login");
  };

  return <AuthContext.Provider value={{ user, workspace, role: user?.role || null, token, isAuth: Boolean(token), isAuthenticated: Boolean(token), loading, login, logout, refreshSession, refetchAuth: refreshSession }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within SupportOps AuthProvider");
  return context;
}
