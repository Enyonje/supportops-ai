import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("agent");

  const handleLogin = () => {
    login({
      email,
      role,
      token: "demo-jwt-token",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">
      <div className="bg-white/5 border border-white/10 rounded-3xl p-10 w-full max-w-md">
        <div className="flex items-center gap-2 mb-8">
          <Zap className="text-blue-500" />
          <h1 className="text-2xl font-bold">SupportOps Login</h1>
        </div>

        <div className="space-y-6">
          <input
            className="w-full bg-slate-900 border border-white/10 p-4 rounded-xl"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <select
            className="w-full bg-slate-900 border border-white/10 p-4 rounded-xl"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="agent">Agent</option>
            <option value="admin">Admin</option>
          </select>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-500 transition p-4 rounded-xl font-bold"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
