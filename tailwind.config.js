/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Roboto', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#fef9f3',
          100: '#fde8d4',
          200: '#fbd4a8',
          300: '#f9b86f',
          400: '#f59e42',
          500: '#f08c3a',
          600: '#e67e2e',
          700: '#d95a1f',
          800: '#c73f0f',
          900: '#b52b08',
        },
        mountain: {
          50: '#faf8f5',
          100: '#f5f1eb',
          200: '#e8dfd2',
          300: '#d9cbb0',
          400: '#c5b89e',
          500: '#b5a88c',
          600: '#8b7b68',
          700: '#6b5f52',
          800: '#4a453f',
          900: '#2d2a26',
        },
        forest: {
          50: '#f0fdf4',
          100: '#dcf4e3',
          200: '#b8ebc3',
          300: '#8edca8',
          400: '#5fc98b',
          500: '#3fb670',
          600: '#2f9956',
          700: '#237a42',
          800: '#1a5c35',
          900: '#0f3d25',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(139, 123, 104, 0.25)',
        'glass-lg': '0 8px 32px 0 rgba(139, 123, 104, 0.35)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
