export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#020617",
        panel: "#0B1220",
        border: "#1F2937",
        accent: "#3B82F6",
        success: "#22C55E",
        warn: "#F59E0B",
        danger: "#EF4444",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(0,0,0,0.25)",
        card: "0 8px 30px rgba(0,0,0,0.25)",
      },
    },
    container: { center: true, padding: "1rem" },
  },
  plugins: [],
};