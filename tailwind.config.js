module.exports = {
  //prefix: 'tw-',
  purge: [
    './public/**/*.html',
    './src/**/*.vue',
    './src/**/**/*.vue',
    './src/*.vue',
    './src/assets/*.css',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
