/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        koodBg: "#0f1720",
        koodCard: "#1a232e",
        koodAccent: "#d6ff00",
      }
    },
  },
  plugins: [],
}