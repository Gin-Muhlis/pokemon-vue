/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "background": "#E6E9F1"
      },
      gridTemplateColumns: {
        "auto-fit": 'repeat(auto-fit, minmax(360px, 1fr))'
      }
    },
    fontFamily: {
      "poppins": ["Poppins", "sans-serif"]
    }
  },
  plugins: [require('daisyui'),],
  daisyui: {
    themes: ["light", "cyberpunk"],
  },
}