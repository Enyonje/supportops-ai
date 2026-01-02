import { useEffect, useState } from "react";

export default function AIReviewInbox() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/api/ai/pending")
      .then(r => r.json())
      .then(setItems);
  }, []);

  async function review(id, decision) {
    await fetch(`/api/ai/review/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ decision })
    });

    setItems(items.filter(i => i._id !== id));
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        AI Approval Queue
      </h1>

      {items.map(item => (
        <div
          key={item._id}
          className="p-6 border rounded-xl bg-white/5"
        >
          <p className="text-sm text-slate-400">
            Confidence: {Math.round(item.confidence * 100)}%
          </p>

          <p className="mt-4">{item.aiReply}</p>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => review(item._id, "approved")}
              className="bg-green-600 px-4 py-2 rounded"
            >
              Approve
            </button>
            <button
              onClick={() => review(item._id, "rejected")}
              className="bg-red-600 px-4 py-2 rounded"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
