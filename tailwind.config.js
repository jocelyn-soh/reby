/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        buttonColor: '#B0AB9E',
        buttonHoverColor: '#CDCAC2',
        headerColor: '#F7F4E6',
      },
    },
    fontFamily: {
      raleway: ['Raleway', 'sans-serif'],
    }
  },
  plugins: [],
}
