// src/components/Navbar.jsx
import { useAuth } from "../context/auth";
import CTAButton from "./CTAButton";

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-[#020617]/80 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="font-black">SupportOps</div>
          <span className="text-xs text-slate-400">Real-time support automation</span>
        </div>
        <div className="flex items-center gap-3">
          <CTAButton onClick={() => alert("Action clicked!")}>Quick Action</CTAButton>
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