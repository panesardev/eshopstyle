/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'base-100': 'hsl(26, 30%, 95%)',
        'base-200': 'hsl(26, 35%, 90%)',
        'base-300': 'hsl(35, 37%, 79%)',
        'primary': 'hsl(25, 38%, 48%)',
      },
    },
  },
  plugins: [],
}