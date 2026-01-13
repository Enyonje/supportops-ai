import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔐 Normal login
  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const loggedInUser = await login({ email, password });
      routeByRole(loggedInUser?.role);
    } catch (err) {
      console.error(err);
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  }

  // ⚡ Demo login
  async function demoLogin(role) {
    setLoading(true);

    try {
      const demoAccounts = {
        agent: {
          email: "agent@demo.com",
          password: "demo1234",
        },
        admin: {
          email: "admin@demo.com",
          password: "demo1234",
        },
        investor: {
          email: "investor@demo.com",
          password: "demo1234",
        },
      };

      const loggedInUser = await login(demoAccounts[role]);
      routeByRole(loggedInUser?.role);
    } catch (err) {
      console.error(err);
      alert("Demo login failed.");
    } finally {
      setLoading(false);
    }
  }

  // 🧭 Role routing
  function routeByRole(role) {
    switch (role) {
      case "admin":
      case "management":
        navigate("/admin/executive");
        break;
      case "investor":
        navigate("/investor");
        break;
      default:
        navigate("/agent/dashboard");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-6">
      <div className="w-full max-w-sm space-y-6 bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-xl">
        <h1 className="text-2xl font-bold text-white text-center">
          Sign in to SupportOps
        </h1>

        {/* Email / Password */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-3 py-2 rounded-lg border border-white/10 bg-[#0B1220] text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-3 py-2 rounded-lg border border-white/10 bg-[#0B1220] text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 text-slate-400 text-sm">
          <div className="flex-1 h-px bg-white/10" />
          or demo access
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Demo Buttons */}
        <div className="grid gap-3">
          <button
            onClick={() => demoLogin("agent")}
            className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
          >
            Demo as Agent
          </button>

          <button
            onClick={() => demoLogin("admin")}
            className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
          >
            Demo as Admin
          </button>

          <button
            onClick={() => demoLogin("investor")}
            className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
          >
            Demo as Investor
          </button>
        </div>

        {/* Signup */}
        <button
          onClick={() => navigate("/signup")}
          className="w-full py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition"
        >
          Create account
        </button>
      </div>
    </div>
  );
}
