import { useEffect, useState } from "react";
import api from "../lib/api";
import AuditLogTable from "../components/AuditLogTable";

export default function AnalyticsPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api.get("/audit").then(res => setLogs(res.data));
  }, []);

  return (
    <div className="space-y-10">
      <AuditLogTable logs={logs} />
    </div>
  );
}
