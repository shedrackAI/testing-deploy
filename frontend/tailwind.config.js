/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./templates/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xsm': '400px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    colors: {
      'dark-blue': '#23354A',
      'mainBlue': '#73CFF4',
      'mainYellow': '#FFE590',
      'lit-Yellow': '#FFF7DC',
      'input-gray': '#FBFBFB',
      'lit-gray': '#A7A7A7',
      'dark-red': '#BF0000',
      'lit-red': '#FFE2E2',
      'white': '#FFF',
      'pink': '#FEBBC4',
      'gray': '#8D8D8D',
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}