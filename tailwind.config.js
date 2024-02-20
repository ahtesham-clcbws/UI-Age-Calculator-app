/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        active: 'hsl(259, 100%, 65%)',
        error: 'hsl(0, 100%, 67%)'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

