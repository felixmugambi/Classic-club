/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        clubRed: '#d6001c',  // Customize this hex to match your brand red
        clubBlack: '#111111', // Optional: add black too if needed
      },
    },
  },
  plugins: [],
}
