// postcss.config.cjs (CommonJS)
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},   // ✅ correct plugin
    autoprefixer: {},
  },
}