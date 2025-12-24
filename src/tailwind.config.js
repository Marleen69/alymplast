/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // ОБЯЗАТЕЛЬНО должно быть это значение
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}