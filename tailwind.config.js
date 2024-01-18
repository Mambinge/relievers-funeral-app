/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" // add this line    
  ],
  theme: {
    colors: {
      purple: '#49326b',
      orange: '#feb139',
      gray: '#c7cbcf',
      white: '#ffffff',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    
    extend: {},
    
  },

  plugins: [
    require('flowbite/plugin')({
      charts: true,
  })
  ]
}

