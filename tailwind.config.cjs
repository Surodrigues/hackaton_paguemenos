/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './pages/**/*.{ts,tsx,js,jsx}',
    './src/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        'pague-red': '#FF2342',
        'pague-blue': '#0000BE',
        primary: {
          red: '#FF2342',
          blue: '#0000BE',
        },
        secondary: {
          light: '#F8F9FA',
          medium: '#E9ECEF',
          dark: '#6C757D',
        },
        custom: {
          red: '#FF2342',
          blue: '#0000BE',
        },
        brand: {
          red: '#FF2342',
          blue: '#0000BE',
        },
        pagueMenos: {
          red: '#FF2342',
          blue: '#0000BE',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      }
    },
  },
  plugins: [],
}
