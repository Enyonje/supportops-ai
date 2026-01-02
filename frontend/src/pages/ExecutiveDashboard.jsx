import { useEffect, useState } from "react";
import { DollarSign, HeartPulse, AlertTriangle, Bot, Users } from "lucide-react";

export default function ExecutiveDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/v1/executive/overview")
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <div className="text-slate-400 p-10">Loading executive metrics…</div>;

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-4xl font-black uppercase italic">Executive Command Center</h1>
        <p className="text-slate-400 mt-2">Company health at a glance</p>
      </header>

      {/* TOP KPIs */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPI icon={<DollarSign />} label="Revenue at Risk" value={`$${data.revenue_at_risk}`} />
        <KPI icon={<AlertTriangle />} label="Open Tickets" value={data.open_tickets} />
        <KPI icon={<Bot />} label="AI Resolutions" value={data.ai_resolutions} />
        <KPI icon={<Users />} label="Critical Customers" value={data.critical_customers.length} />
      </section>

      {/* HEALTH DISTRIBUTION */}
      <section className="bg-white/5 border border-white/10 rounded-3xl p-8">
        <h3 className="font-bold mb-6 flex items-center gap-2">
          <HeartPulse /> Customer Health Distribution
        </h3>

        <div className="grid grid-cols-3 gap-6">
          {data.health_distribution.map(h => (
            <div key={h.status} className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
              <p className="text-xs uppercase text-slate-400">{h.status}</p>
              <p className="text-4xl font-black mt-2">{h.count}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CRITICAL ALERTS */}
      <section className="bg-red-500/5 border border-red-500/20 rounded-3xl p-8">
        <h3 className="font-bold mb-6 flex items-center gap-2 text-red-400">
          <AlertTriangle /> Immediate Attention Required
        </h3>

        <div className="space-y-4">
          {data.critical_customers.map(c => (
            <div key={c.customer_id} className="flex justify-between p-4 bg-black/30 rounded-xl">
              <span className="font-mono">{c.customer_id}</span>
              <span className="text-red-400 font-black">{c.health_score}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function KPI({ icon, label, value }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="flex items-center gap-2 text-slate-400 mb-2">
        {icon}
        <span className="text-xs uppercase">{label}</span>
      </div>
      <p className="text-4xl font-black">{value}</p>
    </div>
  );
}
