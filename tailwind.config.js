/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Poppins', 'sans-serif', 'monospace', 'serif'],
      },
      backgroundImage: {
        'radial-gradient': ['radial-gradient(ellipse at bottom, #0d1d31 0%, #0c0d13 100%)'],
      },
    },
  },
  plugins: [],
}