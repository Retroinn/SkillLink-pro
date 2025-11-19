/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        primary: '#8b5cf6',
        secondary: '#14b8a6',
        premium: '#fbbf24',
      },
      boxShadow: {
        glass: '0 10px 80px rgba(0,0,0,0.25)',
      },
    },
  },
  plugins: [],
};
