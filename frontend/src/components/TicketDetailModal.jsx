import React from 'react';
import { X, User, Bot, ShieldAlert } from 'lucide-react';

const TicketDetailModal = ({ ticket, onClose }) => {
  if (!ticket) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-white/10 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
          <div>
            <h3 className="text-xl font-bold">{ticket.ticket || "Ticket Detail"}</h3>
            <p className="text-xs text-slate-400">Status: {ticket.status}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition">
            <X size={20} />
          </button>
        </div>

        {/* Conversation Logs */}
        <div className="p-6 h-80 overflow-y-auto space-y-4 bg-slate-950/50">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center"><User size={14}/></div>
            <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none max-w-[80%]">
              <p className="text-sm">"I'm having trouble with my API key. It keeps returning a 401 error even though I refreshed it."</p>
            </div>
          </div>
          <div className="flex gap-3 flex-row-reverse">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center"><Bot size={14}/></div>
            <div className="bg-blue-600/20 border border-blue-500/30 p-3 rounded-2xl rounded-tr-none max-w-[80%]">
              <p className="text-sm">AI Attempt: "Searching documentation for Auth 401 errors..."</p>
            </div>
          </div>
          <div className="flex justify-center">
            <span className="text-[10px] bg-amber-500/10 text-amber-500 border border-amber-500/20 px-3 py-1 rounded-full flex items-center gap-2">
              <ShieldAlert size={10}/> AI Accuracy below threshold. Human intervention required.
            </span>
          </div>
        </div>

        {/* Human Takeover Input */}
        <div className="p-6 border-t border-white/10 bg-white/5">
          <textarea 
            className="w-full bg-slate-900 border border-white/10 p-4 rounded-xl text-sm outline-none focus:border-blue-500"
            placeholder="Type manual response to client..."
            rows="3"
          />
          <button className="w-full mt-4 bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold transition-colors">
            Send Manual Response & Resolve
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailModal;