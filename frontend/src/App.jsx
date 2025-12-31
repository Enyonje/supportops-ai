import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Zap } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import SuccessPage from './pages/SuccessPage';
import CancelPage from './pages/CancelPage';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [clientMessage, setClientMessage] = useState("");

  const handleUpgrade = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/stripe/create-checkout-session`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            price_id: 'price_1SkSsGPGjk4Kjz6d2fO4jMyQ',
            customer_email: 'user@example.com'
          }),
        }
      );

      const data = await response.json();
      if (data.url) window.location.href = data.url;
    } catch {
      toast.error("Checkout failed!");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#020617] text-white">
      <aside className="w-64 border-r border-white/10 p-6 bg-[#020617]">
        <div className="flex items-center gap-2 mb-10">
          <Zap className="text-blue-500" />
          <span className="font-bold text-xl">SupportOps</span>
        </div>

        <nav className="space-y-4">
          <button onClick={() => setActiveTab('Dashboard')} className="w-full p-3 rounded-lg hover:bg-white/5">Dashboard</button>
          <button onClick={() => setActiveTab('Tickets')} className="w-full p-3 rounded-lg hover:bg-white/5">Tickets</button>
          <button onClick={() => setActiveTab('Analytics')} className="w-full p-3 rounded-lg hover:bg-white/5">Analytics</button>

          <button
            onClick={handleUpgrade}
            className="w-full mt-6 p-4 bg-blue-600 rounded-xl font-bold hover:bg-blue-500"
          >
            Upgrade to Pro
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-10">
        <h1 className="text-4xl font-black italic mb-10">{activeTab}</h1>

        <input
          className="w-full max-w-2xl bg-slate-900 border border-white/10 p-5 rounded-2xl"
          placeholder="Type message..."
          value={clientMessage}
          onChange={(e) => setClientMessage(e.target.value)}
        />
      </main>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
      </Routes>
    </Router>
  );
}
