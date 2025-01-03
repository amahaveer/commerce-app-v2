module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",   // Correct frontend pattern
    "./apps/backoffice/app/**/*.{js,ts,jsx,tsx}",  // Correct backoffice pattern
    "./components/**/*.{js,ts,jsx,tsx}",  // Include shared components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
