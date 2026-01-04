import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.jsx";

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("agent");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const newUser = await signup({ email, password, role });

      if (newUser?.token) {
        switch (newUser.role) {
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
      alert("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#020617] px-6">
      <form
        onSubmit={handleSignup}
        className="space-y-6 bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl w-full max-w-sm shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center text-white">Sign Up</h2>

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

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="w-full px-3 py-2 rounded-lg border border-white/10 bg-[#0B1220] text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-white/10 bg-[#0B1220] text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="agent">Agent User</option>
            <option value="management">Management</option>
            <option value="investor">Investor</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <p className="text-sm text-center text-slate-400">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Log in
          </a>
        </p>
      </form>
    </div>
  );
}