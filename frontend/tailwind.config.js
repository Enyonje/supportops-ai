/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#020617",
        panel: "#0f172a",
        accent: "#3b82f6",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.37)",
      },
    },
  },
  plugins: [],
};
