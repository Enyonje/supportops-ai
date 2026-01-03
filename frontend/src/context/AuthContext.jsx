import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(JSON.parse(localStorage.getItem("user")));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      { email, password }
    );

    localStorage.setItem("token", res.data.access_token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${res.data.access_token}`;

    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.clear();
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
