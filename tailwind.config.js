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
        submitBg: '#08F26E',
        light: '#E2D8DC',
        errorF: '#ffc7c7',
        errorB: '#ff0000',

        background: '#1a1a1a',
        layer: '#2f2f2f',
        surface: '#282828',
        foreground: '#222',
        primary: '#fffd01',
        text: '#ffffff',
        textAlt: '#979797',
        secondary: '#28d799',
        tertiary: '#5191f4',
        quaternary: '#d3706f',
      },
    },
  },
  plugins: [],
};
