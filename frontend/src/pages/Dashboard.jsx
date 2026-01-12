import {
  Activity,
  Cpu,
  Inbox,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

const stats = [
  {
    label: "Open Tickets",
    value: "12",
    icon: Inbox,
    accent: "text-blue-500",
  },
  {
    label: "AI Auto-Resolved",
    value: "842",
    icon: Cpu,
    accent: "text-emerald-500",
  },
  {
    label: "System Health",
    value: "99.9%",
    icon: ShieldCheck,
    accent: "text-indigo-400",
  },
  {
    label: "Active Workflows",
    value: "6",
    icon: Activity,
    accent: "text-orange-400",
  },
];

export default function Dashboard() {
  return (
    <main className="p-6 lg:p-10 space-y-10">
      {/* Header */}
      <section className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          SupportOps Dashboard
        </h1>
        <p className="text-slate-400 max-w-2xl">
          Live AI-powered support operations overview. Monitor tickets,
          automation performance, and system health in real time.
        </p>
      </section>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="relative overflow-hidden rounded-2xl bg-panel border border-white/10 p-6 shadow-glass"
          >
            <div className="flex items-center justify-between">
              <stat.icon
                className={`h-8 w-8 ${stat.accent}`}
              />
              <TrendingUp className="h-5 w-5 text-slate-500" />
            </div>

            <div className="mt-6">
              <p className="text-sm text-slate-400">
                {stat.label}
              </p>
              <p className="text-3xl font-semibold mt-1">
                {stat.value}
              </p>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        ))}
      </section>

      {/* Main Grid */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <div className="xl:col-span-2 rounded-2xl bg-panel border border-white/10 p-6 shadow-glass">
          <h2 className="text-lg font-semibold mb-4">
            Live AI Activity
          </h2>

          <ul className="space-y-4">
            {[
              "AI resolved ticket #3921 in 1.2s",
              "New ticket received from Stripe webhook",
              "Workflow escalation triggered for VIP client",
              "Revenue forecast model refreshed",
            ].map((item, idx) => (
              <li
                key={idx}
                className="flex items-center gap-3 text-sm text-slate-300"
              >
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* System Status */}
        <div className="rounded-2xl bg-panel border border-white/10 p-6 shadow-glass">
          <h2 className="text-lg font-semibold mb-4">
            System Status
          </h2>

          <div className="space-y-4">
            {[
              { name: "AI Brain", status: "Operational" },
              { name: "WebSockets", status: "Stable" },
              { name: "Billing Engine", status: "Operational" },
              { name: "Data Pipelines", status: "Healthy" },
            ].map((service) => (
              <div
                key={service.name}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-slate-300">
                  {service.name}
                </span>
                <span className="text-emerald-400 font-medium">
                  {service.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
