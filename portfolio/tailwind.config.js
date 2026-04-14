/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'os-dark': '#0a0a0a',
        'os-panel': 'rgba(25, 25, 25, 0.4)',
      }
    },
  },
  plugins: [],
}
