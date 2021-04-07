const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    screens: {
      'xs': '320px',
      ...defaultTheme.screens,
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
