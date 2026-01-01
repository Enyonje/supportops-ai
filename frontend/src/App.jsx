import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { 
  Zap, Ticket, BarChart3, Workflow, Sparkles, LayoutDashboard, Send, X, User, Bot, ShieldAlert, ArrowUpRight 
} from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import LiveActivityFeed from "./components/LiveActivityFeed";
import SuccessPage from './pages/SuccessPage';

// Import Mock Data
import { MOCK_TICKETS } from "./utils/mockTickets";
import { MOCK_ANALYTICS } from "./utils/mockAnalytics";

const API_BASE_URL = "https://supportops-ai.onrender.com";

// --- SUB-COMPONENT: STAT CARD ---
const StatCard = ({ title, value, icon: Icon }) => (
  <div className="group rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-all cursor-pointer">
    <div className="flex items-center justify-between">
      <p className="text-xs uppercase tracking-widest text-slate-400">{title}</p>
      <Icon className="w-5 h-5 text-blue-500 group-hover:scale-110 transition" />
    </div>
    <h2 className="text-5xl font-extrabold mt-4">{value}</h2>
  </div>
);

// --- SUB-COMPONENT: INTERVENTION MODAL ---
const TicketDetailModal = ({ ticket, onClose }) => {
  if (!ticket) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md no-print">
      <div className="bg-slate-900 border border-white/10 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
          <div>
            <h3 className="text-xl font-bold">{ticket.ticket || ticket.id}</h3>
            <p className="text-xs text-slate-400 font-mono">Customer: {ticket.customer || "Anonymous"}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition"><X size={20} /></button>
        </div>
        <div className="p-6 h-80 overflow-y-auto space-y-4 bg-slate-950/50">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0"><User size={14}/></div>
            <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none text-sm text-slate-300">
              "{ticket.customerMessage || "I'm having trouble with my API integration."}"
            </div>
          </div>
          <div className="flex gap-3 flex-row-reverse">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0"><Bot size={14}/></div>
            <div className="bg-blue-600/20 border border-blue-500/30 p-3 rounded-2xl rounded-tr-none text-sm text-blue-200">
              AI Status: {ticket.action || "Analyzing logs"}...
            </div>
          </div>
          <div className="flex justify-center">
            <span className="text-[10px] bg-amber-500/10 text-amber-500 border border-amber-500/20 px-3 py-1 rounded-full flex items-center gap-2">
              <ShieldAlert size={10}/> AI Confidence: {ticket.ai_confidence || "64%"}. Human review suggested.
            </span>
          </div>
        </div>
        <div className="p-6 border-t border-white/10 bg-white/5">
          <textarea className="w-full bg-slate-900 border border-white/10 p-4 rounded-xl text-sm outline-none focus:border-blue-500 text-white" placeholder="Type manual response..." rows="3" />
          <button onClick={() => {toast.success("Manual override successful!"); onClose();}} className="w-full mt-4 bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold transition-all">Resolve Manually</button>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [clientMessage, setClientMessage] = useState("");
  const [isDemoMode, setIsDemoMode] = useState(true); 
  const [selectedTicket, setSelectedTicket] = useState(null);
  
  const isPro = localStorage.getItem('isProUser') === 'true';

  // PDF Export Function
  const handleExportPDF = () => {
    const toastId = toast.loading("Generating PDF Report...");
    setTimeout(() => {
      toast.success("Ready to save", { id: toastId });
      window.print();
    }, 1000);
  };

  const handleUpgrade = async () => {
    const toastId = toast.loading("Connecting to Stripe...");
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/stripe/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price_id: 'price_1SkSsGPGjk4Kjz6d2fO4jMyQ', customer_email: 'user@example.com' }),
      });
      const data = await response.json();
      if (data.url) window.location.href = data.url;
    } catch (error) { toast.error("Stripe failed!"); }
  };

  return (
    <div style={{ backgroundColor: '#020617' }} className="min-h-screen text-white flex font-sans">
      {/* SIDEBAR - Hidden during PDF Print */}
      <aside className="hidden md:flex w-64 flex-col border-r border-white/10 p-6 shrink-0 no-print">
        <div className="flex items-center gap-2 mb-10">
          <Zap className="text-blue-500 fill-blue-500" />
          <span className="font-bold text-xl tracking-tighter">SupportOps</span>
          {isPro && <span className="ml-2 px-2 py-0.5 bg-blue-500/20 border border-blue-500/50 text-[10px] font-black text-blue-400 rounded-md">PRO</span>}
        </div>

        <nav className="space-y-2 flex-1">
          {[{ id: "Dashboard", icon: <LayoutDashboard size={18} /> }, { id: "Tickets", icon: <Ticket size={18} /> }, { id: "Analytics", icon: <BarChart3 size={18} /> }].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${activeTab === tab.id ? "bg-blue-600 text-white shadow-lg" : "hover:bg-white/5 text-slate-400"}`}>{tab.icon} {tab.id}</button>
          ))}
          <div className="mt-8 mb-4 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-slate-500">Mode: {isDemoMode ? 'Demo' : 'Live'}</span>
              <button onClick={() => setIsDemoMode(!isDemoMode)} className={`w-8 h-4 rounded-full relative transition-colors ${isDemoMode ? 'bg-blue-600' : 'bg-slate-700'}`}>
                <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${isDemoMode ? 'right-0.5' : 'left-0.5'}`} />
              </button>
            </div>
          </div>
        </nav>

        {!isPro ? (
          <button onClick={handleUpgrade} className="mt-auto bg-gradient-to-br from-blue-600 to-indigo-600 p-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-xl hover:opacity-90 transition"><Zap size={16} fill="white" /> Upgrade</button>
        ) : (
          <div className="mt-auto p-4 rounded-xl border border-white/5 bg-white/5 text-center text-[10px] text-blue-400 font-black tracking-widest uppercase">Subscription Active</div>
        )}
      </aside>

      <main className="flex-1 p-6 md:p-10 flex flex-col overflow-y-auto">
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-black tracking-tight italic uppercase">{activeTab === 'Dashboard' ? 'Operations Overview' : activeTab}</h1>
            <p className="text-slate-400 mt-2 font-medium italic">Autonomous AI Orchestration</p>
          </div>
          <div className="hidden md:flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10 no-print">
            <Sparkles className="text-blue-500 w-4 h-4" />
            <span className="text-xs font-bold text-slate-300 uppercase">AI Accuracy 98.2%</span>
          </div>
        </header>

        <div className="flex-1 space-y-10">
          {/* DASHBOARD TAB */}
          {activeTab === "Dashboard" && (
            <>
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                <StatCard title="Active Workflows" value="12" icon={Workflow} />
                <StatCard title="Auto-Resolved" value="842" icon={Zap} />
                <StatCard title="Open Tickets" value="27" icon={Ticket} />
                <StatCard title="System Health" value="99.9%" icon={BarChart3} />
                {isDemoMode && (
                  <div className="group rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6">
                    <p className="text-xs uppercase font-bold text-blue-400">Revenue Saved</p>
                    <h2 className="text-5xl font-extrabold mt-4 text-white">$14.2k</h2>
                  </div>
                )}
              </section>
              <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Live Activity Feed</h2>
                <LiveActivityFeed isDemoMode={isDemoMode} onTicketClick={(t) => setSelectedTicket(t)} />
              </section>
            </>
          )}

          {/* TICKETS TAB */}
          {activeTab === "Tickets" && (
            <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid gap-4">
                {MOCK_TICKETS.map(t => (
                  <div key={t.id} onClick={() => setSelectedTicket(t)} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition cursor-pointer flex justify-between items-center group">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-blue-500 font-bold font-mono text-sm">{t.id}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold ${t.priority === 'Urgent' ? 'bg-red-500/20 text-red-500' : 'bg-slate-500/20 text-slate-400'}`}>{t.priority}</span>
                      </div>
                      <h3 className="font-bold text-lg">{t.subject}</h3>
                      <p className="text-sm text-slate-400 italic">"{t.summary}"</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500 mb-2">{t.timestamp}</p>
                      <span className="bg-blue-600/20 text-blue-400 text-[10px] font-black px-3 py-1 rounded-full border border-blue-500/30 uppercase group-hover:bg-blue-600 group-hover:text-white transition-all">{t.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ANALYTICS TAB */}
          {activeTab === "Analytics" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-right-4 duration-700">
              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                <h3 className="text-blue-400 font-bold uppercase text-xs tracking-widest mb-8 flex items-center gap-2">
                  <BarChart3 size={14} /> Performance Audit
                </h3>
                <div className="grid grid-cols-3 gap-4 mb-10">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                    <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Avg Time</p>
                    <p className="text-xl font-black">{MOCK_ANALYTICS.kpi_metrics.avg_response_time}</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                    <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">CSAT</p>
                    <p className="text-xl font-black">{MOCK_ANALYTICS.kpi_metrics.customer_csat}</p>
                  </div>
                  <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-center">
                    <p className="text-[10px] text-blue-400 uppercase font-bold mb-1">ROI</p>
                    <p className="text-xl font-black text-blue-400">{MOCK_ANALYTICS.kpi_metrics.cost_reduction}</p>
                  </div>
                </div>
                
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Weekly Volume</h4>
                <div className="flex items-end justify-between h-32 gap-2">
                  {MOCK_ANALYTICS.traffic_volume.map(day => (
                    <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-blue-600/40 rounded-t-md hover:bg-blue-600 transition-all cursor-help" style={{ height: `${(day.tickets/250)*100}%` }}></div>
                      <span className="text-[10px] font-mono text-slate-600">{day.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                <h3 className="text-blue-400 font-bold uppercase text-xs tracking-widest mb-8">AI Workflow Distribution</h3>
                <div className="space-y-6">
                  {MOCK_ANALYTICS.resolution_split.map(item => (
                    <div key={item.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-bold">{item.name}</span>
                        <span className="text-sm font-mono text-blue-500">{item.value}%</span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600" style={{ width: `${item.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={handleExportPDF} className="w-full mt-10 py-4 rounded-2xl border border-blue-500/30 bg-blue-500/5 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-500/10 transition-all active:scale-95 no-print">
                  Export Audit Report <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* FOOTER INPUT - Hidden during PDF Print */}
      <footer className="fixed bottom-6 left-64 right-10 pointer-events-none md:flex hidden no-print">
        <form className="relative w-full max-w-3xl mx-auto pointer-events-auto" onSubmit={(e) => { e.preventDefault(); toast.success("AI is processing query..."); setClientMessage(""); }}>
          <input className="w-full bg-slate-900 border border-white/10 p-5 rounded-2xl outline-none focus:border-blue-500 shadow-2xl text-slate-200" placeholder="Ask AI to analyze logs or stats..." value={clientMessage} onChange={(e) => setClientMessage(e.target.value)} />
          <button className="absolute right-3 top-3 bottom-3 px-6 bg-blue-600 rounded-xl hover:bg-blue-500 transition-colors"><Send size={18} /></button>
        </form>
      </footer>

      <TicketDetailModal ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Toaster position="bottom-center" />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
}