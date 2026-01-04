import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { Metric } from "../components/ui/Metric";
import Skeleton from "../components/ui/Skeleton";

export default function Dashboard() {
  const loading = false; // wire to data fetcher

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Operations Overview
        </h1>
        <div className="flex gap-3">
          <Button variant="ghost" className="hover:bg-white/10">
            Refresh
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            New Ticket
          </Button>
        </div>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <>
            <Skeleton className="h-28 rounded-xl" />
            <Skeleton className="h-28 rounded-xl" />
            <Skeleton className="h-28 rounded-xl" />
            <Skeleton className="h-28 rounded-xl" />
          </>
        ) : (
          <>
            <Metric label="Active Workers Online" value="12" />
            <Metric label="Open Tickets" value="0" tone="success" />
            <Metric label="Closed Issues (24H)" value="842" />
            <Metric label="System Health" value="99.9%" tone="success" />
          </>
        )}
      </div>

      {/* Live feed */}
      <Card title="Live Ticket Feed" hint="WebSocket updates">
        <div className="h-56 flex items-center justify-center text-sm text-gray-400">
          Waiting for live tickets...
        </div>
      </Card>
    </div>
  );
}