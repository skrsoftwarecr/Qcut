/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a1a1a',
        secondary: '#d4af37',
        accent: '#2c2c2c',
        background: '#fafafa',
        'text-primary': '#1a1a1a',
        'text-secondary': '#6b6b6b',
        border: '#e5e5e5',
        success: '#34c759',
        warning: '#ff9500',
        danger: '#ff3b30',
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'elegant': '12px',
      },
      boxShadow: {
        'elegant': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'elegant-lg': '0 4px 16px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}
