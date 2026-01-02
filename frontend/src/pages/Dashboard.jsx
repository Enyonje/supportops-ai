import React, { useEffect, useState } from "react";
import {
  Zap,
  Ticket,
  BarChart3,
  Workflow,
  Sparkles,
} from "lucide-react";

// ✅ FIXED PATHS
import { connectSocket, disconnectSocket } from "../lib/socket";
import TicketRow from "../components/TicketRow";

/* ---------- SMALL UI COMPONENT ---------- */

const Stat = ({ title, value, icon: Icon }) => (
  <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
    <div className="flex justify-between items-center">
      <p className="text-xs uppercase font-bold text-slate-400">
        {title}
      </p>
      <Icon className="text-blue-500" size={18} />
    </div>
    <h2 className="text-4xl font-black mt-4 text-white">
      {value}
    </h2>
  </div>
);

/* ---------- DASHBOARD ---------- */

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [activeTab, setActiveTab] = useState("Dashboard");

  useEffect(() => {
    // connect websocket
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

    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white flex">
      
      {/* ---------- SIDEBAR ---------- */}
      <aside className="hidden md:flex w-64 flex-col border-r border-white/10 p-6">
        <div className="flex items-center gap-2 mb-10">
          <Zap className="text-blue-500" />
          <span className="font-bold text-xl">SupportOps</span>
        </div>

        <nav className="space-y-2">
          {["Dashboard", "Tickets", "Analytics"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-4 py-3 rounded-xl transition
                ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "hover:bg-white/5 text-slate-300"
                }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </aside>

      {/* ---------- MAIN ---------- */}
      <main className="flex-1 p-10 space-y-10">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black">
              {activeTab}
            </h1>
            <p className="text-slate-400 mt-2">
              Live AI-powered support operations
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Sparkles className="text-blue-500" />
            <span className="text-xs uppercase font-bold text-slate-400">
              Real-time Sync
            </span>
          </div>
        </header>

        {/* ---------- DASHBOARD TAB ---------- */}
        {activeTab === "Dashboard" && (
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            <Stat title="Active Workflows" value="12" icon={Workflow} />
            <Stat title="Open Tickets" value={tickets.length} icon={Ticket} />
            <Stat title="Auto Resolved" value="842" icon={Zap} />
            <Stat title="System Health" value="99.9%" icon={BarChart3} />
          </section>
        )}

        {/* ---------- TICKETS TAB ---------- */}
        {activeTab === "Tickets" && (
          <section className="space-y-4">
            {tickets.length === 0 && (
              <div className="text-slate-400 italic text-center">
                Waiting for live tickets…
              </div>
            )}

            {tickets.map((ticket) => (
              <TicketRow key={ticket.id} ticket={ticket} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
