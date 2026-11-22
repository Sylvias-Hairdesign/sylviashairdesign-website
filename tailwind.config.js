module.exports = {
  content: ['./index.html', './review.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fbf8f3',
          100: '#f5efe4',
          200: '#ebdfc8',
          300: '#dfcaa6',
          400: '#cfae7d',
          500: '#b88f55',
          600: '#a37a44',
          700: '#876233',
          800: '#6c4e2c',
          900: '#583f25',
        },
        warmgray: {
          50: '#f9f8f6',
          100: '#f2f0eb',
          200: '#e5e1d8',
          300: '#d3cdc2',
          400: '#a39b8e',
          500: '#736b5e',
          600: '#544d42',
          700: '#3f3930',
          800: '#2c2720',
          900: '#1c1813',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      }
    }
  }
}
