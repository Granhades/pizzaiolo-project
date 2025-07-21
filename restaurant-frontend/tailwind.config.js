/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation : {
        'fade-in' : 'fadeIn 0.6s ease-out forwards',
      },
      fontFamily: {
        fredericka: ['"Fredericka the Great"', 'serif'],
      },
      keyframes:{
        fadeIn: {
          '0%' : {opacity : 0, transform : 'translateY(10px)'},
          '100%' : {opacity : 1, transform: 'translateY(0)'},
        },
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
