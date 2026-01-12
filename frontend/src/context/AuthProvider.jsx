import { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

/**
 * ============================
 * AUTH PROVIDER
 * ============================
 */
export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * ----------------------------
   * LOGIN
   * ----------------------------
   */
  const login = async ({ email, password }) => {
    const res = await api.post("/auth/login", {
      email,
      password,
    });

    const { access_token, user: userData, tenant_id } = res.data;

    if (!access_token || !userData) {
      throw new Error("Invalid login response");
    }

    // Persist session
    localStorage.setItem("access_token", access_token);
    if (tenant_id) {
      localStorage.setItem("tenant_id", tenant_id);
    }

    setUser(userData);
    return {
      token: access_token,
      role: userData.role,
    };
  };

  /**
   * ----------------------------
   * LOGOUT
   * ----------------------------
   */
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("tenant_id");
    setUser(null);
    navigate("/login");
  };

  /**
   * ----------------------------
   * SESSION RESTORE
   * ----------------------------
   */
  const restoreSession = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await api.get("/auth/me");
      setUser(res.data);
    } catch (err) {
      console.warn("Session restore failed");
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    restoreSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * ----------------------------
   * CONTEXT VALUE
   * ----------------------------
   */
  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

/**
 * ============================
 * HOOK
 * ============================
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
