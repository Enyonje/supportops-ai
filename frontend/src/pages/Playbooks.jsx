import { useEffect, useState } from "react";
import api from "../lib/api";
import { Wand2, PlusCircle } from "lucide-react";

export default function Playbooks() {
  const [playbooks, setPlaybooks] = useState([]);

  useEffect(() => {
    api.get("/playbooks").then(res => setPlaybooks(res.data));
  }, []);

  return (
    <div className="p-10 text-white space-y-8">
      <header className="flex justify-between items-center">
        <h1 className="text-4xl font-black">AI Playbooks</h1>
        <button className="flex items-center gap-2 bg-blue-600 px-5 py-3 rounded-xl font-bold">
          <PlusCircle size={18} /> New Playbook
        </button>
      </header>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {playbooks.map(p => (
          <div
            key={p.id}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3"
          >
            <div className="flex items-center gap-2">
              <Wand2 className="text-blue-500" />
              <h2 className="font-bold">{p.name}</h2>
            </div>
            <p className="text-slate-400 text-sm">{p.description}</p>
            <span className="text-xs uppercase tracking-widest text-green-500">
              {p.enabled ? "Active" : "Disabled"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
