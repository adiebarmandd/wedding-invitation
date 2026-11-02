/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#F8F4ED',
          100: '#EFE6D9',
          200: '#E4D7C3',
          300: '#D5C3A8',
        },
        charcoal: {
          DEFAULT: '#41372F',
          muted: '#63564A',
          light: '#887869',
        },
        gold: {
          light: '#D4C09E',
          DEFAULT: '#B69A70',
          dark: '#93784F',
        },
        olive: {
          light: '#8F9377',
          DEFAULT: '#73765D',
          dark: '#585B45',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        arabic: ['Amiri', 'serif'],
        vibes: ['"Great Vibes"', 'cursive'],
        montecarlo: ['"MonteCarlo"', 'cursive'],
      },
      boxShadow: {
        'soft-gold': '0 10px 30px -10px rgba(182, 154, 112, 0.25)',
        'soft-card': '0 4px 20px 0 rgba(65, 55, 47, 0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
