/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#13ecc8",
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"]
      },
    },
  },
}
