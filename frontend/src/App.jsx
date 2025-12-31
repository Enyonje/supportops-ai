import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Zap, Send } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import SuccessPage from './pages/SuccessPage';
import CancelPage from './pages/CancelPage'; // NEW IMPORT

const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:8000' 
  : 'https://supportops-ai.onrender.com';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [clientMessage, setClientMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpgrade = async () => {
    const toastId = toast.loading("Preparing secure checkout...");
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/stripe/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price_id: 'price_1SkSsGPGjk4Kjz6d2fO4jMyQ', 
          customer_email: 'customer@example.com' 
        }),
      });
      const data = await response.json();
      if (data.url) window.location.href = data.url;
    } catch (error) {
      toast.error("Checkout failed!", { id: toastId });
    }
  };

  const handleClientSubmit = async (e) => {
    e.preventDefault();
    if (!clientMessage) return;
    setIsProcessing(true);
    const toastId = toast.loading("Sending...");
    try {
      await fetch(`${API_BASE_URL}/api/v1/tickets/resolve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticket_id: `TKT-${Math.floor(Math.random() * 10000)}`,
          resolution_status: "analyzing",
          agent_name: "Customer Portal"
        }),
      });
      setClientMessage("");
      toast.success("Ticket Received!", { id: toastId });
    } catch (error) {
      toast.error("Error connecting to backend.", { id: toastId });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-200">
      <aside className="w-64 border-r border-white/5 bg-[#020617] p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <Zap className="text-blue-500 fill-blue-500" size={24} />
          <span className="text-xl font-bold">SupportOps</span>
        </div>
        <nav className="space-y-2 flex-1">
          {['Dashboard', 'Tickets', 'Analytics'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${activeTab === tab ? 'bg-blue-600' : 'text-slate-400'}`}>
              {tab}
            </button>
          ))}
          <button onClick={handleUpgrade} className="w-full mt-6 flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold">
            <Zap size={18} fill="white" /> Upgrade to Pro
          </button>
        </nav>
      </aside>
      <main className="flex-1 p-8 flex flex-col">
        <h1 className="text-3xl font-black mb-8 italic uppercase">{activeTab}</h1>
        <section className="mt-auto border-t border-white/10 pt-8">
          <form onSubmit={handleClientSubmit} className="relative max-w-2xl mx-auto">
            <input type="text" value={clientMessage} onChange={(e) => setClientMessage(e.target.value)} placeholder="Describe your issue..." className="w-full bg-[#020617] border border-white/5 rounded-2xl py-4 px-6 outline-none focus:border-blue-500" />
            <button type="submit" disabled={isProcessing} className="absolute right-2 top-2 p-2.5 bg-blue-600 rounded-xl"><Send size={18} /></button>
          </form>
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
      <Route path="/cancel" element={<CancelPage />} /> {/* NEW ROUTE */}
    </Routes>
  </Router>
);

export default App;