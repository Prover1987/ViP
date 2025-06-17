/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
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
  plugins: [],
} 