import { NavLink } from "react-router-dom";
import CTAButton from "../components/CTAButton.jsx";

export default function LandingPage() {
  return (
    <div className="bg-[#020617] text-white min-h-screen flex flex-col">
      {/* HERO */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24">
        {/* Tagline */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
          SupportOps Pro — The Only AI Platform Built to Automate, Scale, and Transform Customer Support
        </h1>

        {/* Hero subtitle */}
        <p className="mt-6 text-slate-400 text-lg max-w-3xl leading-relaxed">
          Deliver instant ticket resolutions, predictive analytics, and role‑based dashboards for agents,
          executives, and investors. Deploy in minutes and scale effortlessly — the future of support starts here.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <NavLink to="/login">
            <CTAButton className="px-6 py-3 text-lg">Get Started</CTAButton>
          </NavLink>
          <NavLink
            to="/features"
            className="px-6 py-3 rounded-xl border border-white/20 text-slate-200 hover:bg-white/10 transition"
          >
            Learn More
          </NavLink>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="bg-white/5 border-t border-b border-white/10 py-12">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <p className="text-slate-400 text-lg">
            Trusted by forward‑thinking teams worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-slate-500 text-sm uppercase tracking-widest">
            <span>FinTech</span>
            <span>E‑Commerce</span>
            <span>SaaS</span>
            <span>Healthcare</span>
            <span>Education</span>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8"
      >
        {[
          {
            title: "Role‑Based Dashboards",
            desc: "Tailored views for agents, executives, and investors — ensuring clarity and control at every level.",
          },
          {
            title: "Real‑Time AI Inbox",
            desc: "Resolve tickets instantly with WebSocket‑powered sync and AI‑driven orchestration.",
          },
          {
            title: "Predictive Analytics",
            desc: "Forecast revenue, track system health, and unlock insights that drive strategic decisions.",
          },
        ].map((f) => (
          <div
            key={f.title}
            className="rounded-2xl bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition"
          >
            <h3 className="font-semibold text-xl text-white">{f.title}</h3>
            <p className="mt-3 text-slate-400 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-20 text-center">
        <h2 className="text-2xl md:text-4xl font-extrabold text-white">
          Ready to transform your support?
        </h2>
        <p className="mt-4 text-blue-100 text-lg max-w-2xl mx-auto">
          Join the only platform designed for modern support teams. Deploy in
          minutes, scale effortlessly, and deliver customer experiences that set
          you apart.
        </p>
        <div className="mt-8">
          <NavLink to="/login">
            <CTAButton className="px-6 py-3 text-lg">Start Free</CTAButton>
          </NavLink>
        </div>
      </section>
    </div>
  );
}