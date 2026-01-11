import {
  Activity,
  Ticket,
  Bot,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      label: "Open Tickets",
      value: "12",
      icon: Ticket,
      change: "+3 today",
    },
    {
      label: "Auto-Resolved",
      value: "842",
      icon: Bot,
      change: "+18%",
    },
    {
      label: "System Health",
      value: "99.9%",
      icon: ShieldCheck,
      change: "Stable",
    },
    {
      label: "AI Actions",
      value: "1,294",
      icon: Activity,
      change: "+7%",
    },
  ];

  return (
    <div className="p-6 space-y-10 bg-slate-950 text-slate-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          SupportOps Dashboard
        </h1>
        <p className="text-slate-400 max-w-2xl">
          Live AI-powered support operations. Monitor performance, automate
          resolutions, and scale customer experience in real time.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col gap-4 hover:border-indigo-500/40 transition"
          >
            <div className="flex items-center justify-between">
              <stat.icon className="w-5 h-5 text-indigo-400" />
              <ArrowUpRight className="w-4 h-4 text-slate-500" />
            </div>
            <div>
              <h3 className="text-sm text-slate-400">{stat.label}</h3>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
            <span className="text-xs text-emerald-400">{stat.change}</span>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Activity */}
        <div className="xl:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">
            Live System Activity
          </h2>
          <ul className="space-y-4">
            {[
              "AI resolved ticket #4211",
              "New ticket from enterprise client",
              "Revenue forecast updated",
              "Playbook triggered for incident response",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-3 text-slate-300"
              >
                <span className="w-2 h-2 bg-indigo-500 rounded-full" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* AI Status */}
        <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/10 border border-indigo-500/30 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-3">
            Autonomous AI Status
          </h2>
          <p className="text-slate-300 text-sm mb-6">
            Your AI agents are actively resolving tickets and optimizing
            workflows across all tenants.
          </p>

          <div className="space-y-3">
            <StatusRow label="Ticket Resolution" status="Active" />
            <StatusRow label="Revenue Forecasting" status="Running" />
            <StatusRow label="Incident Monitoring" status="Online" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusRow({ label, status }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-300">{label}</span>
      <span className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400">
        {status}
      </span>
    </div>
  );
}
