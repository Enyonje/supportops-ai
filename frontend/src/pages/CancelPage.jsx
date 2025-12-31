import React from 'react';

const CancelPage = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] max-w-md">
        <h1 className="text-3xl font-black mb-4">Payment Cancelled 🛑</h1>
        <p className="text-slate-400 mb-8">
          No worries! Your account hasn't been charged. You can upgrade whenever you're ready.
        </p>
        <button 
          onClick={() => window.location.href = '/'}
          className="bg-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-500 transition-colors"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

export default CancelPage;