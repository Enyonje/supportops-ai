import { useState } from "react";
import { Brain, Zap, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

export default function AutonomousBrain() {
  const [result, setResult] = useState(null);
  const [running, setRunning] = useState(false);

  const runBrain = async () => {
    setRunning(true);
    toast.loading("AI Brain running…");

    const res = await fetch("/api/v1/brain/run", { method: "POST" });
    const data = await res.json();

    toast.dismiss();
    toast.success("Optimization cycle complete");

    setResult(data);
    setRunning(false);
  };

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-4xl font-black uppercase italic">
          Autonomous SaaS Brain
        </h1>
        <p className="text-slate-400 mt-2">
          Self-optimizing AI control system
        </p>
      </header>

      <button
        onClick={runBrain}
        disabled={running}
        className="px-8 py-4 bg-blue-600 rounded-2xl font-black text-white hover:bg-blue-500 transition flex items-center gap-3"
      >
        <Brain /> Run Optimization Cycle
      </button>

      {result && (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
          <Stat icon={Zap} label="AI Resolution Rate" value={`${result.ai_resolution_rate}%`} />
          <Stat icon={ShieldCheck} label="Avg AI Confidence" value={result.avg_confidence} />

          <div>
            <h3 className="text-sm uppercase font-bold text-slate-400 mb-3">
              AI Decisions
            </h3>
            {result.decisions.length === 0 ? (
              <p className="text-slate-500 italic">No action needed. System optimal.</p>
            ) : (
              <ul className="space-y-2">
                {result.decisions.map((d, i) => (
                  <li key={i} className="bg-blue-500/10 border border-blue-500/30 px-4 py-2 rounded-xl text-blue-300">
                    {d}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4">
      <Icon className="text-blue-400" />
      <div>
        <p className="text-xs uppercase text-slate-400">{label}</p>
        <p className="text-2xl font-black text-white">{value}</p>
      </div>
    </div>
  );
}
