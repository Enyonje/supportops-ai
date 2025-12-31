export default function Dashboard() {
  return (
    <div className="app">
      <aside className="sidebar">
        <h1>⚡ SupportOps AI</h1>
        <nav className="nav">
          <a href="#">Dashboard</a>
          <a href="#">Tickets</a>
          <a href="#">Analytics</a>
          <a href="#">Audit Logs</a>
        </nav>
      </aside>

      <main className="main">
        <div className="header">
          <h2>Operations Overview</h2>
          <p>Real-time AI ticket orchestration</p>
          <button className="button">⚡ Force AI Sync</button>
        </div>

        <section className="stats">
          <div className="card">
            <h4>Active Workflows</h4>
            <span>12</span>
          </div>
          <div className="card">
            <h4>Auto-Resolved</h4>
            <span>842</span>
          </div>
          <div className="card">
            <h4>AI Accuracy</h4>
            <span>98.2%</span>
          </div>
        </section>

        <div className="card">
          <h4>Live Ticket Stream</h4>
          <p>Streaming soon…</p>
        </div>
      </main>
    </div>
  );
}
