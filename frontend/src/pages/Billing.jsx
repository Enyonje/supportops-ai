import api from "../lib/api";

const plans = [
  {
    name: "Starter",
    price: "$29",
    interval: "month",
    features: [
      "AI Ticket Resolution",
      "Basic Analytics",
      "1 Agent Seat",
      "Email Support",
    ],
    priceId: "price_starter", // Stripe Price ID
  },
  {
    name: "Pro",
    price: "$99",
    interval: "month",
    highlight: true,
    features: [
      "Everything in Starter",
      "AI Inbox Automation",
      "Predictive Analytics",
      "5 Agent Seats",
      "Priority Support",
    ],
    priceId: "price_pro",
  },
  {
    name: "Enterprise",
    price: "Custom",
    interval: "",
    features: [
      "Unlimited Agents",
      "Dedicated AI Models",
      "SLA & Compliance",
      "Investor Dashboard",
      "Dedicated Support",
    ],
    priceId: "price_enterprise",
  },
];

export default function Billing() {
  async function subscribe(priceId) {
    try {
      const { data } = await api.post("/billing/create-checkout-session", {
        price_id: priceId,
      });
      window.location.href = data.checkout_url;
    } catch (err) {
      console.error(err);
      alert("Unable to start checkout.");
    }
  }

  return (
    <main className="p-8 max-w-7xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-3xl font-bold text-white">
          Choose Your Plan
        </h1>
        <p className="text-slate-400 mt-2">
          Scale support operations with confidence
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl p-6 border ${
              plan.highlight
                ? "border-blue-500 bg-blue-500/10"
                : "border-white/10 bg-white/5"
            } backdrop-blur-xl`}
          >
            <h2 className="text-xl font-semibold text-white">
              {plan.name}
            </h2>

            <p className="text-3xl font-bold text-white mt-4">
              {plan.price}
              <span className="text-sm text-slate-400">
                {plan.interval && ` / ${plan.interval}`}
              </span>
            </p>

            <ul className="mt-6 space-y-3">
              {plan.features.map((f) => (
                <li
                  key={f}
                  className="text-slate-300 text-sm"
                >
                  ✓ {f}
                </li>
              ))}
            </ul>

            <button
              onClick={() => subscribe(plan.priceId)}
              className={`mt-8 w-full py-3 rounded-lg font-semibold transition ${
                plan.highlight
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
            >
              Get Started
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}
