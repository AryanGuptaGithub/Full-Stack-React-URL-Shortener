// tailwind.config.js
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Covers all React component files
    './index.html', // Root HTML file
  ],
  theme: {
    extend: {},
    screen:{
        'xsm': '460px', //custom breakpoint
         'sm': '600px',
      'md': '768px', // This is the default value
      'lg': '1024px',
      'xl': '1280px',
    }
  },
  plugins: [],
};