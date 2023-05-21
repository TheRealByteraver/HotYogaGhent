const colors = require('./colors');
const tailwindColors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      yellow: colors.yellow,
      gray: tailwindColors.gray,
      indigo: tailwindColors.indigo,
      transparent: tailwindColors.transparent,
      emerald: tailwindColors.emerald,
      red: tailwindColors.red,
      white: tailwindColors.white,
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

