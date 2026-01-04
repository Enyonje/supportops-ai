import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const loggedInUser = await login({ email, password });
      if (loggedInUser?.token) {
        switch (loggedInUser.role) {
          case "agent":
            navigate("/agent/dashboard");
            break;
          case "management":
          case "admin":
            navigate("/admin/executive");
            break;
          case "investor":
            navigate("/investor");
            break;
          default:
            navigate("/agent/dashboard");
        }
      }
    } catch (err) {
      console.error(err);
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm space-y-6 bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl"
      >
        <h1 className="text-2xl font-bold text-white text-center">Login</h1>

        <div className="space-y-4">
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
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="w-full py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition"
        >
          Sign up
        </button>
      </form>
    </div>
  );
}