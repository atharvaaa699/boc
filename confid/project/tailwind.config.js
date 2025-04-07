/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00f7ff',
        'neon-green': '#39ff14',
        'dark-bg': '#050714',
        'cyber-grid': '#1a1b2e',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        'roboto-mono': ['Roboto Mono', 'monospace'],
      },
      animation: {
        'pulse-neon': 'pulse-neon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-neon': {
          '0%, 100%': {
            opacity: 1,
            filter: 'brightness(1)',
          },
          '50%': {
            opacity: .5,
            filter: 'brightness(1.5)',
          },
        },
      },
    },
  },
  plugins: [],
};