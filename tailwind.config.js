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
        "normal": '#A8A77A',      // Soft beige
        "fire": '#EE8130',        // Fiery orange
        "water": '#6390F0',       // Cool blue
        "electric": '#F7D02C',    // Bright yellow
        "grass": '#7AC74C',       // Leafy green
        "ice": '#96D9D6',         // Icy blue
        "fighting": '#C22E28',    // Bold red
        "poison": '#A33EA1',      // Purple toxin
        "ground": '#E2BF65',      // Earthy brown
        "flying": '#A98FF3',      // Light violet
        "psychic": '#F95587',     // Mystic pink
        "bug": '#A6B91A',         // Leafy green
        "rock": '#B6A136',        // Rocky brown
        "ghost": '#735797',       // Haunting purple
        "dragon": '#6F35FC',      // Majestic purple
        "dark": '#705746',        // Dark brown
        "steel": '#B7B7CE',       // Metallic grey
        "fairy": '#D685AD',       // Light pink
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