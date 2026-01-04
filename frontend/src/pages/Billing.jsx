import { useEffect, useState } from "react";
import api from "../lib/api";
import { CreditCard } from "lucide-react";

export default function Billing() {
  const [usage, setUsage] = useState([]);

  useEffect(() => {
    api
      .get("/billing/usage")
      .then((res) => setUsage(res.data))
      .catch((err) => console.error("Failed to load billing usage", err));
  }, []);

  return (
    <div className="space-y-8 p-8 text-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
          Billing & Usage
        </h1>
      </div>

      {/* Usage grid */}
      {usage.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center text-gray-400">
          No usage data available.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {usage.map((u, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition"
            >
              <div>
                <h3 className="text-lg font-semibold text-white">{u.metric}</h3>
                <p className="text-sm text-slate-400">
                  {u.quantity} units this month
                </p>
              </div>
              <CreditCard className="text-blue-500" size={24} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}