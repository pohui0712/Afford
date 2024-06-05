/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        "pt-sans": ['"PT Sans"', "sans-serif"],
      },
      fontWeight: {
        "pt-sans-regular": 400,
        "pt-sans-bold": 700,
      },
      fontStyle: {
        "pt-sans-italic": "italic",
        "pt-sans-normal": "normal",
      },
    },
  },
  plugins: [],
  corePlugins: {
    scrollBehavior: true,
  },
};
