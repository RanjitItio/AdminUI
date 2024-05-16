{import('tailwindcss').Config} 


export default {
    content: [
      './public/**/*.html',
      './src/Components/Authentication/**/*.{js,jsx,ts,tsx,vue}',
    ],
    // purge: ['./src/Components/Authentication/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    purge: ['./src/Components/Authentication/**/*.{js,jsx,ts,tsx}'],
    theme: {
      extend: {},
    },
    plugins: [],
  }