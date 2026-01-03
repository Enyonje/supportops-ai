import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Zap,
  Ticket,
  BarChart3,
  Workflow,
  Sparkles,
  Menu,
  X,
  Brain,
  ShieldAlert,
  CreditCard,
  LineChart,
  Users,
  Bot,
} from "lucide-react";
import { connectSocket, disconnectSocket } from "../lib/socket";
import TicketRow from "../components/TicketRow";

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    connectSocket((event) => {
      if (event.type === "NEW_TICKET") {
        setTickets((prev) => [event.payload, ...prev]);
      }
      if (event.type === "UPDATE_TICKET") {
        setTickets((prev) =>
          prev.map((t) =>
            t.id === event.payload.id ? event.payload : t
          )
        );
      }
    });

    return () => disconnectSocket();
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white flex">
      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/70 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed md:static z-50 top-0 left-0 h-full w-72 bg-[#020617]
        border-r border-white/10 p-6 transform transition-transform duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <Zap className="text-blue-500" />
            <span className="font-black text-xl">SupportOps</span>
          </div>
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <X />
          </button>
        </div>

        <nav className="space-y-1">
          <SidebarLink to="/" icon={BarChart3} label="Dashboard" />
          <SidebarLink to="/tickets" icon={Ticket} label="Ticket Inbox" />
          <SidebarLink to="/analytics" icon={LineChart} label="Analytics" />
          <SidebarLink to="/ai-review" icon={Bot} label="AI Review" />
          <SidebarLink to="/autonomous-brain" icon={Brain} label="Autonomous Brain" />
          <SidebarLink to="/incident-command" icon={ShieldAlert} label="Incidents" />
          <SidebarLink to="/billing" icon={CreditCard} label="Billing" />
          <SidebarLink to="/investor" icon={Users} label="Investor Mode" />
        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-4 md:p-10 space-y-10 w-full">
        {/* HEADER */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-lg bg-white/5"
            >
              <Menu />
            </button>

            <div>
              <h1 className="text-2xl md:text-4xl font-black">
                Operations Overview
              </h1>
              <p className="text-slate-400 mt-1 text-sm md:text-base">
                Live AI-powered support operations
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-400">
            <Sparkles className="text-blue-500" size={16} />
            REAL-TIME SYNC
          </div>
        </header>

        {/* STATS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
          <Stat title="Active Workflows" value="12" icon={Workflow} />
          <Stat title="Open Tickets" value={tickets.length} icon={Ticket} />
          <Stat title="Auto Resolved" value="842" icon={Zap} />
          <Stat title="System Health" value="99.9%" icon={BarChart3} />
        </section>

        {/* LIVE FEED */}
        <section className="space-y-4">
          <h2 className="text-lg md:text-xl font-bold">
            Live Ticket Feed
          </h2>

          {tickets.length === 0 && (
            <div className="text-slate-400 italic text-sm">
              Waiting for live tickets…
            </div>
          )}

          <div className="space-y-3">
            {tickets.slice(0, 6).map((ticket) => (
              <TicketRow key={ticket.id} ticket={ticket} />
            ))}
          </div>
        </section>

        {/* ROUTED CONTENT */}
        <Outlet />
      </main>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function SidebarLink({ to, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      end
      onClick={() => window.innerWidth < 768 && window.scrollTo(0, 0)}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition text-sm
        ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-slate-300 hover:bg-white/5"
        }`
      }
    >
      <Icon size={18} />
      {label}
    </NavLink>
  );
}

function Stat({ title, value, icon: Icon }) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-5 md:p-6">
      <div className="flex justify-between items-center">
        <p className="text-xs uppercase font-bold text-slate-400">
          {title}
        </p>
        <Icon className="text-blue-500" size={18} />
      </div>
      <h2 className="text-3xl md:text-4xl font-black mt-3">
        {value}
      </h2>
    </div>
  );
}
