/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/html/utils/withMT.js'
export default withMT({
  darkMode: 'class',
  corePlugins: {
    preflight: false
  },
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {}
    }
  }
})
