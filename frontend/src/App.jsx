import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Ticket, BarChart3, Shield, Zap, Send, User } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [clientMessage, setClientMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // --- 1. Client Submission Function ---
  const handleClientSubmit = async (e) => {
    e.preventDefault();
    if (!clientMessage) return;

    setIsProcessing(true);
    toast.loading("Sending ticket to AI...", { id: 'processing' });

    try {
      // Pinging your FastAPI backend
      const response = await fetch('http://localhost:8000/api/v1/tickets/resolve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticket_id: `TKT-${Math.floor(Math.random() * 10000)}`,
          resolution_status: "analyzing",
          agent_name: "Customer Portal"
        }),
      });

      if (response.ok) {
        setClientMessage("");
        toast.success("Ticket Received! AI is reviewing...", { id: 'processing' });
      }
    } catch (error) {
      toast.error("Backend offline. Check FastAPI!", { id: 'processing' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-200">
      <Toaster position="top-right" />
      
      {/* Sidebar (Admin View) */}
      <aside className="w-64 border-r border-white/5 bg-[#020617] p-6 hidden md:flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <Zap className="text-blue-500 fill-blue-500" size={24} />
          <span className="text-xl font-bold tracking-tighter italic">SupportOps</span>
        </div>
        <nav className="space-y-2 flex-1">
          {['Dashboard', 'Tickets', 'Analytics'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer ${activeTab === tab ? 'bg-blue-600' : 'hover:bg-white/5 text-slate-400'}`}>
              {tab}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-8 flex flex-col gap-8">
        {/* --- ADMIN DASHBOARD VIEW --- */}
        <section>
          <header className="mb-6">
            <h1 className="text-3xl font-black italic uppercase tracking-tighter">{activeTab}</h1>
            <p className="text-slate-500 text-xs font-bold uppercase">Admin Intelligence Monitor</p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
                <p className="text-[10px] text-slate-500 uppercase font-black">Live Traffic</p>
                <p className="text-2xl font-bold">{isProcessing ? "1 Active" : "Idle"}</p>
             </div>
          </div>
        </section>

        {/* --- REAL CLIENT SCENARIO: THE PORTAL --- */}
        <section className="mt-auto border-t border-white/10 pt-8">
          <div className="max-w-2xl mx-auto bg-slate-900/50 border border-blue-500/20 p-6 rounded-[2.5rem] shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                <User size={16} className="text-blue-400" />
              </div>
              <h3 className="font-bold text-sm">Client Portal <span className="text-slate-500 font-normal">(User View)</span></h3>
            </div>

            <form onSubmit={handleClientSubmit} className="relative">
              <input 
                type="text" 
                value={clientMessage}
                onChange={(e) => setClientMessage(e.target.value)}
                placeholder="Describe your issue (e.g. Need a refund)..." 
                className="w-full bg-midnight border border-white/5 rounded-2xl py-4 pl-6 pr-16 outline-none focus:border-blue-500 transition-all text-sm"
              />
              <button 
                type="submit"
                disabled={isProcessing}
                className="absolute right-2 top-2 p-2.5 bg-blue-600 rounded-xl hover:bg-blue-500 transition-colors disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </form>
            <p className="text-[10px] text-slate-500 mt-3 text-center uppercase tracking-widest font-bold">
              AI Agent typically responds in &lt; 2 seconds
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;