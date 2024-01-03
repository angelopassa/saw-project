/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [
    "./node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
  safelist: [
    {
      pattern: /bg-+/, // 👈  This includes bg of all colors and shades
    },
    {
      pattern: /text-+/,
    }
  ],
}

