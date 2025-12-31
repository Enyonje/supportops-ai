import { useEffect, useState } from "react";
import { Activity } from "lucide-react";

const WS_URL =
  import.meta.env.VITE_WS_URL ||
  "wss://supportops-ai.onrender.com/ws/tickets";

export default function LiveActivityFeed() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    let socket;

    const connect = () => {
      socket = new WebSocket(WS_URL);

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setEvents((prev) => [data, ...prev].slice(0, 6));
        } catch {
          console.warn("Invalid WebSocket message");
        }
      };

      socket.onclose = () => {
        setTimeout(connect, 3000); // auto reconnect
      };
    };

    connect();
    return () => socket && socket.close();
  }, []);

  return (
    <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
      <div className="flex items-center gap-3 mb-6">
        <Activity className="text-blue-500" />
        <h2 className="text-xl font-bold">Live Ticket Activity</h2>
      </div>

      {events.length === 0 ? (
        <p className="text-slate-400 italic text-center py-10">
          Waiting for live events…
        </p>
      ) : (
        <ul className="space-y-4">
          {events.map((e, i) => (
            <li
              key={i}
              className="flex justify-between items-center p-4 rounded-xl 
                         bg-black/30 border border-white/10 hover:bg-white/5 transition"
            >
              <div>
                <p className="font-semibold">{e.event}</p>
                <span className="text-xs text-slate-400">
                  Ticket {e.ticket_id}
                </span>
              </div>
              <span className="text-xs text-slate-500">{e.time}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
