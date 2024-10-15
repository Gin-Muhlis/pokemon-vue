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