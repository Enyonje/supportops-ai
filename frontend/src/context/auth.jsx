import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);

  // Load persisted auth state on mount
  useEffect(() => {
    const t = localStorage.getItem("access_token");
    const r = localStorage.getItem("role");
    const u = localStorage.getItem("user");
    if (t) setToken(t);
    if (r) setRole(r);
    if (u) setUser(JSON.parse(u));
  }, []);

  // Login: persist token + role + user
  const login = (payload) => {
    if (typeof payload !== "object") {
      throw new Error("Invalid login payload");
    }

    const accessToken = payload.access_token || payload.token;
    const userRole = payload.role;
    const userObj = {
      email: payload.email ?? "unknown@example.com",
      name: payload.name ?? "User",
      role: userRole,
    };

    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("role", userRole);
    localStorage.setItem("user", JSON.stringify(userObj));

    setToken(accessToken);
    setRole(userRole);
    setUser(userObj);

    return { access_token: accessToken, role: userRole, user: userObj };
  };

  // Signup: call backend, then reuse login
  const signup = async ({ email, password, name }) => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/api/v1/auth/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      }
    );

    if (!res.ok) {
      throw new Error("Signup failed");
    }

    const data = await res.json();
    // Expecting { access_token, role, email, name }
    return login(data);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    setToken(null);
    setRole(null);
    setUser(null);
  };

  const value = {
    token,
    role,
    user,
    login,
    signup, // ✅ now available in context
    logout,
    isAuth: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};