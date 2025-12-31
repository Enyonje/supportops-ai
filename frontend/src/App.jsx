import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Zap, Send, User } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import SuccessPage from './pages/SuccessPage';

// --- CONFIGURATION ---
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:8000' 
  : 'https://supportops-ai.onrender.com';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [clientMessage, setClientMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // --- STRIPE UPGRADE FUNCTION ---
  const handleUpgrade = async () => {
    const toastId = toast.loading("Preparing secure checkout...");
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/stripe/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // PLUGGED IN YOUR ACTUAL ID FROM LOGS:
          price_id: 'price_1SkSsGPGjk4Kjz6d2fO4jMyQ', 
          customer_email: 'customer@example.com' 
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Stripe did not return a checkout URL.");
      }
    } catch (error) {
      console.error("Stripe Error:", error);
      toast.error("Checkout failed. Check your API keys!", { id: toastId });
    }
  };

  const handleClientSubmit = async (e) => {
    e.preventDefault();
    if (!clientMessage) return;
    setIsProcessing(true);
    const toastId = toast.loading("Sending ticket to AI...");

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/tickets/resolve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticket_id: `TKT-${Math.floor(Math.random() * 10000)}`,
          resolution_status: "analyzing",
          agent_name: "Customer Portal"
        }),
      });
      if (!response.ok) throw new Error("Backend Error");
      setClientMessage("");
      toast.success("Ticket Received!", { id: toastId });
    } catch (error) {
      toast.error("Backend offline. Check Render logs!", { id: toastId });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-200">
      <aside className="w-64 border-r border-white/5 bg-[#020617] p-6 hidden md:flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <Zap className="text-blue-500 fill-blue-500" size={24} />
          <span className="text-xl font-bold italic tracking-tighter">SupportOps</span>
        </div>
        <nav className="space-y-2 flex-1">
          {['Dashboard', 'Tickets', 'Analytics'].map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === tab ? 'bg-blue-600' : 'hover:bg-white/5 text-slate-400'}`}
            >
              {tab}
            </button>
          ))}
          
          <button 
            onClick={handleUpgrade}
            className="w-full mt-6 flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:scale-[1.02] transition-transform border border-white/10 shadow-xl"
          >
            <Zap size={18} fill="white" />
            Upgrade to Pro
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-8 flex flex-col">
        <header className="mb-8">
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">{activeTab}</h1>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
            Network: <span className="text-green-500">{API_BASE_URL}</span>
          </p>
        </header>
        
        <section className="mt-auto border-t border-white/10 pt-8">
          <div className="max-w-2xl mx-auto bg-slate-900/50 border border-blue-500/20 p-6 rounded-[2.5rem] shadow-2xl">
            <form onSubmit={handleClientSubmit} className="relative">
              <input 
                type="text" 
                value={clientMessage}
                onChange={(e) => setClientMessage(e.target.value)}
                placeholder="Describe your issue..." 
                className="w-full bg-[#020617] border border-white/5 rounded-2xl py-4 pl-6 pr-16 outline-none focus:border-blue-500 text-sm"
              />
              <button type="submit" disabled={isProcessing} className="absolute right-2 top-2 p-2.5 bg-blue-600 rounded-xl hover:bg-blue-500 disabled:opacity-50">
                <Send size={18} />
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

const App = () => (
  <Router>
    <Toaster position="top-right" />
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/success" element={<SuccessPage />} />
    </Routes>
  </Router>
);

export default App;