/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        epicBg:'#F5F7FB',
        submitBg: '#08F26E',
        full: '#8E7680',
        medium: '#7F636E',
        light: '#E2D8DC',
        xlight: '#eee8ea',
        errorF: '#ffc7c7',
        errorB: '#ff0000',

        primary: '#1a1a1a',
        epicBgAccent: '#282828',
        epicAccent: '#fffd01',
      }
    },
  },
  plugins: [],
};
