/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        accent: '#00f5ff',
        'accent-hover': '#00d9e6',
        success: '#00ff88',
        danger: '#ff3366',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'Roboto', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

