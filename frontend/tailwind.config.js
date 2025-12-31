/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#020617",
        panel: "#0f172a",
        accent: "#3b82f6",
      },
    },
  },
  plugins: [],
};