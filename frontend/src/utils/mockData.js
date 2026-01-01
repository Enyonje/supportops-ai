const ACTIONS = [
  "Analyzing sentiment",
  "Scanning documentation",
  "Checking system logs",
  "Drafting response",
  "Verifying API status",
  "Routing to specialized agent"
];

const TICKETS = ["TKT-882", "TKT-441", "TKT-102", "TKT-909", "TKT-552"];

export const generateMockEvent = () => {
  const ticket = TICKETS[Math.floor(Math.random() * TICKETS.length)];
  const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    ticket: ticket,
    action: action,
    status: Math.random() > 0.4 ? "processing" : "completed",
    priority: Math.random() > 0.7 ? "High" : "Normal",
    customerMessage: "I'm experiencing an issue with my integration. Can you check the logs?"
  };
};