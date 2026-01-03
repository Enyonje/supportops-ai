// src/pages/LandingPage.jsx
import { NavLink } from "react-router-dom";
import CTAButton from "../components/CTAButton";

export default function LandingPage() {
  return (
    <div className="bg-[#020617] text-white">
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight">
          AI-powered Support Operations
        </h1>
        <p className="mt-4 text-slate-400 text-lg">
          Automate, analyze, and scale customer support with live ticket sync and robust role-based access.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <NavLink to="/login">
            <CTAButton>Get Started</CTAButton>
          </NavLink>
          <a href="#features" className="px-4 py-2 rounded-xl border border-white/20 text-slate-200 hover:bg-white/10">
            Learn More
          </a>
        </div>
      </section>

      <section id="features" className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-6">
        {[
          { title: "Role-based access", desc: "Keep admin tools safe and user flows smooth." },
          { title: "Real-time tickets", desc: "WebSocket-backed live inbox and updates." },
          { title: "Analytics & insights", desc: "Understand performance with executive dashboards." },
        ].map((f) => (
          <div key={f.title} className="rounded-2xl bg-white/5 border border-white/10 p-6">
            <h3 className="font-bold text-xl">{f.title}</h3>
            <p className="mt-2 text-slate-400">{f.desc}</p>
          </div>
        ))}
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl md:text-4xl font-black">Ready to automate support?</h2>
        <p className="mt-3 text-slate-400">Deploy on Vercel and plug into your existing stack.</p>
        <div className="mt-6">
          <NavLink to="/login">
            <CTAButton>Start Free</CTAButton>
          </NavLink>
        </div>
      </section>
    </div>
  );
}