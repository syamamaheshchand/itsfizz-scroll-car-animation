/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          lime: '#def54f',
          cyan: '#6ac9ff',
          orange: '#fa7328',
          green: '#45db7d',
          dark: '#0d0e12',
          surface: '#15171e',
          card: 'rgba(25, 28, 36, 0.75)',
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        widestx2: '0.35em',
        widestx3: '0.5em',
      },
    },
  },
  plugins: [],
}

