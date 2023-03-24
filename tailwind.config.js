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
      animation: {
        bellshake: 'bellshake .5s cubic-bezier(.36,.07,.19,.97) both',
      },
      keyframes: {
        bellshake: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '15%': { transform: 'rotate(5deg)' },
          '30%': { transform: 'rotate(-5deg)' },
          '45%': { transform: 'rotate(4deg)' },
          '60%': { transform: 'rotate(-4deg)' },
          '75%': { transform: 'rotate(2deg)' },
          '85%': { transform: 'rotate(-2deg)' },
          '92%': { transform: 'rotate(1deg)' },
        },
      },
    },
  },
  plugins: [],
};
