import { useEffect, useState } from "react";
import {
  DollarSign,
  TrendingUp,
  Users,
  Bot,
  ShieldCheck
} from "lucide-react";

export default function InvestorMode() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/v1/investors/metrics")
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) {
    return <div className="p-10 text-slate-400">Loading investor metrics…</div>;
  }

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-4xl font-black uppercase italic">
          Investor Metrics
        </h1>
        <p className="text-slate-400 mt-2">
          Boardroom-grade SaaS performance snapshot
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6">
        <Metric icon={DollarSign} label="MRR" value={`$${data.mrr}`} />
        <Metric icon={TrendingUp} label="ARR" value={`$${data.arr}`} />
        <Metric icon={Users} label="Customers" value={data.customer_count} />
        <Metric icon={ShieldCheck} label="NRR" value={`${data.net_revenue_retention}%`} />
        <Metric icon={Bot} label="AI Resolution" value={`${data.ai_resolution_rate}%`} />
      </section>

      <section className="bg-white/5 border border-white/10 rounded-3xl p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <DeepMetric label="Churn Rate" value={`${data.churn_rate}%`} />
        <DeepMetric label="LTV" value={`$${data.ltv}`} />
        <DeepMetric label="LTV / CAC" value={data.ltv_cac_ratio} highlight />
      </section>
    </div>
  );
}

function Metric({ icon: Icon, label, value }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="flex items-center gap-2 text-slate-400 mb-2">
        <Icon size={14} />
        <span className="text-xs uppercase font-bold">{label}</span>
      </div>
      <p className="text-3xl font-black text-white">{value}</p>
    </div>
  );
}

function DeepMetric({ label, value, highlight }) {
  return (
    <div className={`rounded-2xl p-6 ${
      highlight
        ? "bg-blue-500/10 border border-blue-500/30"
        : "bg-white/5 border border-white/10"
    }`}>
      <p className="text-xs uppercase text-slate-400 mb-2">{label}</p>
      <p className={`text-4xl font-black ${
        highlight ? "text-blue-400" : "text-white"
      }`}>
        {value}
      </p>
    </div>
  );
}
