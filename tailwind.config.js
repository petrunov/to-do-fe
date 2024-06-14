/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          100: '#f7fafc',
          200: '#edf2f7',
          400: '#cbd5e0',
        },
        red: {
          500: '#f56565',
          700: '#e53e3e',
        },
      },
      borderRadius: {
        xl: '1.5rem',
      },
    },
  },
  plugins: [],
};
