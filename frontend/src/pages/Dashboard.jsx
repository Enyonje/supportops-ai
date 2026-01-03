import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Zap,
  Ticket,
  BarChart3,
  Workflow,
  Sparkles,
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
      {/* SIDEBAR */}
      <aside className="hidden md:flex w-72 flex-col border-r border-white/10 p-6">
        <div className="flex items-center gap-2 mb-10">
          <Zap className="text-blue-500" />
          <span className="font-black text-xl">SupportOps</span>
        </div>

        <nav className="space-y-1">
          <SidebarLink to="/" icon={BarChart3} label="Dashboard" />
          <SidebarLink to="/tickets" icon={Ticket} label="Ticket Inbox" />
          <SidebarLink to="/analytics" icon={LineChart} label="Analytics" />
          <SidebarLink to="/ai-review" icon={Bot} label="AI Review Inbox" />
          <SidebarLink to="/autonomous-brain" icon={Brain} label="Autonomous Brain" />
          <SidebarLink to="/incident-command" icon={ShieldAlert} label="Incidents" />
          <SidebarLink to="/billing" icon={CreditCard} label="Billing" />
          <SidebarLink to="/investor" icon={Users} label="Investor Mode" />
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10 space-y-10 overflow-y-auto">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black">Dashboard</h1>
            <p className="text-slate-400 mt-2">
              Live AI-powered support operations
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
            <Sparkles className="text-blue-500" size={16} />
            REAL-TIME SYNC
          </div>
        </header>

        {/* STATS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <Stat title="Active Workflows" value="12" icon={Workflow} />
          <Stat title="Open Tickets" value={tickets.length} icon={Ticket} />
          <Stat title="Auto Resolved" value="842" icon={Zap} />
          <Stat title="System Health" value="99.9%" icon={BarChart3} />
        </section>

        {/* LIVE TICKETS PREVIEW */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">Live Ticket Feed</h2>

          {tickets.length === 0 && (
            <div className="text-slate-400 italic">
              Waiting for live tickets…
            </div>
          )}

          {tickets.slice(0, 5).map((ticket) => (
            <TicketRow key={ticket.id} ticket={ticket} />
          ))}
        </section>

        {/* ROUTED PAGES RENDER HERE */}
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
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-slate-300 hover:bg-white/5"
        }`
      }
    >
      <Icon size={18} />
      <span className="font-medium">{label}</span>
    </NavLink>
  );
}

function Stat({ title, value, icon: Icon }) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
      <div className="flex justify-between items-center">
        <p className="text-xs uppercase font-bold text-slate-400">
          {title}
        </p>
        <Icon className="text-blue-500" size={18} />
      </div>
      <h2 className="text-4xl font-black mt-4">{value}</h2>
    </div>
  );
}
