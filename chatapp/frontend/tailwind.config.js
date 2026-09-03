/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#262626',
        muted: '#8E8E8E',
        border: '#DBDBDB',
        hover: '#FAFAFA',
        active: '#EFEFEF',
        accent: '#0095F6',
        online: '#3ACF6E',
      },
      backgroundImage: {
        'bubble-grad': 'linear-gradient(45deg, #833AB4 0%, #C13584 45%, #FD1D1D 75%, #FCB045 100%)',
      },
    },
  },
  plugins: [],
};
