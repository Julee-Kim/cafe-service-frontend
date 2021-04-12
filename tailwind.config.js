const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    screens: {
      'xs': '320px',
      ...defaultTheme.screens,
    },
    colors: {
      red: colors.rose,
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
