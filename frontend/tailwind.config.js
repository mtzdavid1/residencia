/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: ["class"],
  theme: {
    extend: {
      backgroundColor: {
        "main-dark-bg": "#20232A",
      },
      colors: {
        "light-gray": "#F7F7F7",
      },
    },
  },
  plugins: [],
};
