const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}', 
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7ed',
          100: '#fdebd3',
          200: '#fbd4a6',
          300: '#f7b76e',
          400: '#f39234',
          500: '#d97b15',
          600: '#b45309',
          700: '#92400e',
          800: '#78350f',
          900: '#451a03',
        },
        gold: {
          50: '#fef7ed',
          100: '#fdebd3',
          200: '#fbd4a6',
          300: '#f7b76e',
          400: '#f39234',
          500: '#d97b15',
          600: '#b45309',
          700: '#92400e',
          800: '#78350f',
          900: '#451a03',
        },
        heading: '#b45309',
        accent: '#d97b15',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Playfair Display', 'serif'],
      },
    },
  },
}

module.exports = config