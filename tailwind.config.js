/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        secondary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        spruce: {
          dark: '#014131',
        },
        floral: {
          white: '#FFF7EC',
        },
        scarlet: {
          red: '#BA1D23',
        },
        opal: {
          green: '#039A6E',
        },
        sea: {
          green: '#A2C1BB',
        },
      },
      fontFamily: {
        heading: ['"Russo One"', 'sans-serif'],
        sans: ['Raleway', 'sans-serif'],
      },
      fontSize: {
        heading: ['30px', '1.2'],
        subheading: ['18px', '1.2'],
        base: ['12px', '1.5'],
        note: ['12px', '1.2'],
        comment: ['8px', '1.2'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 