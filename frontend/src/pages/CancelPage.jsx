import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle, ArrowLeft } from 'lucide-react';

const CancelPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6 bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-xl">
        <div className="flex justify-center">
          <div className="p-4 bg-red-500/10 rounded-full">
            <XCircle size={48} className="text-red-500" />
          </div>
        </div>
        
        <h1 className="text-3xl font-black italic uppercase tracking-tighter">Checkout Canceled</h1>
        <p className="text-slate-400">
          No worries! Your account hasn't been charged. You can continue using the dashboard in demo mode or try upgrading again later.
        </p>
        
        <button 
          onClick={() => navigate('/')}
          className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 py-4 rounded-xl font-bold transition-all"
        >
          <ArrowLeft size={18} /> Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default CancelPage;