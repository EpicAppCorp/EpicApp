/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      sans: 'Rubik',
    },
    extend: {
      colors: {
        epicBg: '#F5F7FB',
        submitBg: '#08F26E',
        full: '#8E7680',
        medium: '#7F636E',
        light: '#E2D8DC',
        xlight: '#eee8ea',
        errorF: '#ffc7c7',
        errorB: '#ff0000',

        background: '#1a1a1a',
        surface: '#282828',
        primary: '#fffd01',
        text: '#ffffff',
        textAlt: '#979797',
      },
    },
  },
  plugins: [],
};
