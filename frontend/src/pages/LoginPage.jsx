import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth) {
    return <div className="text-white p-8">Auth not initialized</div>;
  }

  const { login } = auth;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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

  function routeByRole(role) {
    switch (role) {
      case "agent":
        navigate("/agent/dashboard");
        break;
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

  function demoLogin(role) {
    const demoUser = {
      name: "Demo User",
      email: `demo-${role}@supportops.ai`,
      role,
      token: "demo-token",
    };

    login(demoUser);
    routeByRole(role);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm space-y-6 bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl"
      >
        <h1 className="text-2xl font-bold text-white text-center">
          Login to SupportOps
        </h1>

        {/* Email / Password */}
        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-3 py-2 rounded-lg border border-white/10 bg-[#0B1220] text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-3 py-2 rounded-lg border border-white/10 bg-[#0B1220] text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Login */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Demo Access */}
        <div className="space-y-2 pt-2">
          <p className="text-xs text-slate-400 text-center">
            Demo access (no signup required)
          </p>

          <button
            type="button"
            onClick={() => demoLogin("agent")}
            className="w-full py-2 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 font-medium"
          >
            Demo Agent Dashboard
          </button>

          <button
            type="button"
            onClick={() => demoLogin("admin")}
            className="w-full py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-medium"
          >
            Demo Admin View
          </button>

          <button
            type="button"
            onClick={() => demoLogin("investor")}
            className="w-full py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-medium"
          >
            Demo Investor Mode
          </button>
        </div>

        {/* Signup */}
        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="w-full py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
