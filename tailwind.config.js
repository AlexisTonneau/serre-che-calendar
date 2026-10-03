/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF7F2',
          200: '#F2EDE4',
          300: '#E8DFD1',
          400: '#D4C7B2',
        },
        ink: {
          900: '#2B2520',
          700: '#4A3F37',
          500: '#6B5F55',
          400: '#8A7E73',
          300: '#A89C90',
        },
        ember: {
          50: '#FDF4EC',
          100: '#F8E1CB',
          300: '#E7A472',
          500: '#C96F3C',
          600: '#B55D2E',
          700: '#974B23',
        },
        sage: {
          100: '#E4ECE2',
          500: '#5B7A62',
          700: '#3F5A46',
        },
        ochre: {
          100: '#F5EBCF',
          500: '#C9A24B',
          700: '#8E6F2E',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(43, 37, 32, 0.04), 0 4px 16px rgba(43, 37, 32, 0.06)',
        'card-lg': '0 2px 4px rgba(43, 37, 32, 0.05), 0 16px 40px rgba(43, 37, 32, 0.08)',
        pop: '0 20px 50px rgba(43, 37, 32, 0.18)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}
