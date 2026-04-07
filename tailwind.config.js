/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.html",
    "./js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        accent: '#CC2222',
        'accent-soft': 'rgba(204, 34, 34, 0.1)',
        'accent-border': 'rgba(204, 34, 34, 0.3)',
        // Dark theme
        'bg-base': '#050506',
        'bg-dark': '#020203',
        'surface': '#0F0F11',
        'surface-hover': '#1A1A1D',
        'border': '#2A2A2E',
        'border-hover': '#3A3A3E',
        'fg': '#EDEDEF',
        'fg-muted': '#A9AAAC',
        'fg-subtle': '#6F7073',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        float1: 'float1 20s ease-in-out infinite',
        float2: 'float2 24s ease-in-out infinite',
        float3: 'float3 28s ease-in-out infinite',
        shimmer: 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        float1: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(30px, -30px)' },
          '50%': { transform: 'translate(-20px, 20px)' },
          '75%': { transform: 'translate(20px, 30px)' },
        },
        float2: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(-25px, 25px)' },
          '50%': { transform: 'translate(25px, -15px)' },
          '75%': { transform: 'translate(-30px, -25px)' },
        },
        float3: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(20px, 20px)' },
          '50%': { transform: 'translate(-15px, -25px)' },
          '75%': { transform: 'translate(25px, 15px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      boxShadow: {
        card: '0 0 0 1px rgba(255,255,255,0.05), 0 10px 30px rgba(0,0,0,0.3)',
        'card-hover': '0 0 0 1px rgba(204,34,34,0.2), 0 20px 50px rgba(0,0,0,0.4)',
      },
      backgroundImage: {
        'gradient-glass': 'linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
      },
    },
  },
  plugins: [],
}
