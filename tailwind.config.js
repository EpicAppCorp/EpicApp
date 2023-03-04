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
    colors: {
      epicBg: '#1a1a1a',
      epicBgAccent: '#282828',
      epicAccent: '#fffd01',
      white: '#FFFFFF',
    },
  },
  plugins: [],
};
