/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0a0a0a",
        purple: {
          light: "#a855f7",
          dark: "#6b21a8",
        },
        blue: {
          light: "#3b82f6",
          dark: "#1d4ed8",
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          'from': { boxShadow: '0 0 5px #a855f7, 0 0 10px #a855f7' },
          'to': { boxShadow: '0 0 20px #3b82f6, 0 0 30px #3b82f6' },
        }
      }
    },
  },
  plugins: [],
}
