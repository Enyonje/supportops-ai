import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Zap, Send, LayoutDashboard, Ticket, BarChart3 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import SuccessPage from './pages/SuccessPage';
import CancelPage from './pages/CancelPage';

const API_BASE_URL = "https://supportops-ai.onrender.com";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [clientMessage, setClientMessage] = useState("");

  const handleUpgrade = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/stripe/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price_id: 'price_1SkSsGPGjk4Kjz6d2fO4jMyQ', 
          customer_email: 'user@example.com' 
        }),
      });
      const data = await response.json();
      if (data.url) window.location.href = data.url;
    } catch (error) {
      toast.error("Checkout failed!");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#020617] text-white">
      {/* Sidebar - FORCED VISIBLE */}
      <aside className="w-64 border-r border-white/10 p-6 flex flex-col bg-[#020617]">
        <div className="flex items-center gap-2 mb-10">
          <Zap className="text-blue-500" />
          <span className="font-bold text-xl">SupportOps</span>
        </div>
        
        <nav className="flex-1 space-y-4">
          <button onClick={() => setActiveTab('Dashboard')} className="w-full text-left p-3 rounded-lg hover:bg-white/5">Dashboard</button>
          <button onClick={() => setActiveTab('Tickets')} className="w-full text-left p-3 rounded-lg hover:bg-white/5">Tickets</button>
          <button onClick={() => setActiveTab('Analytics')} className="w-full text-left p-3 rounded-lg hover:bg-white/5">Analytics</button>
          
          <button 
            onClick={handleUpgrade}
            className="w-full mt-4 p-4 bg-blue-600 rounded-xl font-bold shadow-lg hover:bg-blue-500 transition-all"
          >
            Upgrade to Pro
          </button>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-10 flex flex-col">
        <h1 className="text-4xl font-black uppercase italic mb-10">{activeTab}</h1>
        
        {activeTab === 'Analytics' && (
          <div className="p-10 border border-white/10 rounded-3xl bg-white/5 max-w-sm">
            <h2 className="text-slate-400 font-bold uppercase text-xs mb-2">Live Status</h2>
            <p className="text-4xl font-bold">Idle</p>
          </div>
        )}

        <div className="mt-auto">
          <form className="relative max-w-2xl" onSubmit={(e) => e.preventDefault()}>
            <input 
              className="w-full bg-slate-900 border border-white/10 p-5 rounded-2xl outline-none"
              placeholder="Type message..."
              value={clientMessage}
              onChange={(e) => setClientMessage(e.target.value)}
            />
          </form>
        </div>
      </main>
    </div>
  );
};

const App = () => (
  <Router>
    <Toaster />
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/cancel" element={<CancelPage />} />
    </Routes>
  </Router>
);

export default App;