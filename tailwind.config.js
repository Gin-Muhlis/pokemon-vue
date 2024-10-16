/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "background": "#E6E9F1",
        "normal": '#A8A77A',
        "fire": '#EE8130',
        "water": '#6390F0',
        "electric": '#F7D02C',
        "grass": '#7AC74C',
        "ice": '#96D9D6',
        "fighting": '#C22E28',
        "poison": '#A33EA1',
        "ground": '#E2BF65',
        "flying": '#A98FF3',
        "psychic": '#F95587',
        "bug": '#A6B91A',
        "rock": '#B6A136',
        "ghost": '#735797',
        "dragon": '#6F35FC',
        "dark": '#705746',
        "steel": '#B7B7CE',
        "fairy": '#D685AD',
      },
      gridTemplateColumns: {
        "auto-fit": 'repeat(auto-fit, minmax(360px, 1fr))'
      }
    },
    fontFamily: {
      "poppins": ["Poppins", "sans-serif"]
    }
  },
  plugins: [require('daisyui'), require('tailwind-scrollbar')],
  daisyui: {
    themes: ["light", "cyberpunk"],
  },
}