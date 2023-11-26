/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",
   "./src/**/*.{js,ts,jsx,tsx}",
  "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"],
  theme: {
    extend: {}
  },
  darkMode:"class",
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["corporate"]
  }
};
