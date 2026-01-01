/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          dark: '#0a0a0a', // Deep Obsidian
          card: 'rgba(255, 255, 255, 0.05)', // Glass effect base
        },
        primary: {
          DEFAULT: '#00f2fe', // Electric Cyan
          dim: 'rgba(0, 242, 254, 0.1)',
        },
        secondary: '#4fadff', // Holographic Blue
        accent: '#7000df', // Neon Purple
        text: {
          main: '#e0e0e0', // Off-white for reading
          muted: '#a0a0a0',
          highlight: '#ffffff'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'neon': '0 0 10px rgba(0, 242, 254, 0.5), 0 0 20px rgba(0, 242, 254, 0.3)',
        'neon-purple': '0 0 10px rgba(112, 0, 223, 0.5), 0 0 20px rgba(112, 0, 223, 0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
};
