import { useEffect, useState } from "react";
import api from "../lib/api";
import { CreditCard } from "lucide-react";

export default function Billing() {
  const [usage, setUsage] = useState([]);

  useEffect(() => {
    api.get("/billing/usage").then(res => setUsage(res.data));
  }, []);

  return (
    <div className="p-10 text-white space-y-6">
      <h1 className="text-4xl font-black">Billing & Usage</h1>

      <div className="grid gap-4">
        {usage.map((u, i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 flex justify-between"
          >
            <div>
              <h3 className="font-bold">{u.metric}</h3>
              <p className="text-slate-400 text-sm">
                {u.quantity} units this month
              </p>
            </div>
            <CreditCard className="text-blue-500" />
          </div>
        ))}
      </div>
    </div>
  );
}
