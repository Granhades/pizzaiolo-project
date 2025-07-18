/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        fredericka: ['"Fredericka the Great"', 'serif'],
      },
      colors: {
        menuitem: '#4D4D4D',
        peach: '#FAD7AC',
        cream: '#FFF2CC',
        chalk: '#FFFFFF',
        price: '#F6AA1C',
      },
    },
  },
  plugins: [],
}
