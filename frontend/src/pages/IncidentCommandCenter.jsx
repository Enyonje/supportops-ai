import { useEffect, useState } from "react";
import api from "../lib/api";
import { AlertOctagon } from "lucide-react";

export default function IncidentCommandCenter() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    api.get("/incidents").then(res => setIncidents(res.data));

    const ws = new WebSocket("wss://supportops-ai.onrender.com/ws");

    ws.onmessage = e => {
      const { event, payload } = JSON.parse(e.data);
      if (event.startsWith("incident")) {
        setIncidents(prev =>
          [payload, ...prev.filter(i => i._id !== payload._id)]
        );
      }
    };

    return () => ws.close();
  }, []);

  return (
    <div className="p-10 space-y-6 text-white">
      <h1 className="text-4xl font-black uppercase italic">
        Incident Command Center
      </h1>

      <div className="grid gap-4">
        {incidents.map(incident => (
          <div
            key={incident._id}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-lg">{incident.title}</h3>
              <span className={`px-3 py-1 text-xs font-black rounded-full
                ${incident.severity === "critical" ? "bg-red-600" :
                  incident.severity === "high" ? "bg-orange-500" :
                  "bg-slate-600"}`}>
                {incident.severity.toUpperCase()}
              </span>
            </div>

            <div className="text-sm text-slate-400 mb-4">
              Status: <strong>{incident.status}</strong>
            </div>

            <div className="space-y-2 text-sm">
              {incident.timeline.slice(-3).map((t, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <AlertOctagon size={14} className="text-blue-500 mt-1" />
                  <span>{t.message}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
