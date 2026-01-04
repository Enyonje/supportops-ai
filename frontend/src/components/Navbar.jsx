// src/components/Navbar.jsx
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.jsx"; // ✅ correct import
import CTAButton from "./CTAButton";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-[#0B1220]/80 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-blue-600" />
            <span className="font-semibold">SupportOps</span>
          </div>
          <span className="text-xs text-slate-400 hidden md:inline">
            Real-time support automation
          </span>
        </div>

        {/* Nav links (optional quick access) */}
        <nav className="hidden md:flex items-center gap-4 text-sm">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `px-2 py-1 rounded ${
                isActive ? "bg-white/10 text-white" : "text-slate-300 hover:text-white"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `px-2 py-1 rounded ${
                isActive ? "bg-white/10 text-white" : "text-slate-300 hover:text-white"
              }`
            }
          >
            Analytics
          </NavLink>
          <NavLink
            to="/brain"
            className={({ isActive }) =>
              `px-2 py-1 rounded ${
                isActive ? "bg-white/10 text-white" : "text-slate-300 hover:text-white"
              }`
            }
          >
            Brain
          </NavLink>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <CTAButton onClick={() => alert("Action clicked!")}>Quick Action</CTAButton>

          {/* User capsule */}
          <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-white/5 border border-white/10">
            <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-slate-300">
              {user?.role ?? "guest"}
            </span>
            <span className="text-sm text-slate-200 hidden sm:inline">
              {user?.email ?? "Not signed in"}
            </span>
            <img
              src="/avatar.png"
              alt="User avatar"
              className="h-8 w-8 rounded-full border border-white/10"
            />
          </div>

          <button
            onClick={logout}
            className="px-3 py-2 rounded-lg text-sm bg-white/10 hover:bg-white/20 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}