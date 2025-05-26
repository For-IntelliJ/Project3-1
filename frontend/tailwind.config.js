/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffffff',
        hover: '#3D4EFE',
        font: '#37474F',
        line: '#777777',
        warning: '#E44B4B',
        kakao: '#FEE500',
        naver: '#03C75A',
        errorRed: '#FF3333',
      },
      fontFamily: {
        sans: ['Noto Sans KR', 'sans-serif'],
        pretendard: ['Pretendard', 'sans-serif'],
        dnf: ['DNFBitBitv2', 'sans-serif'], // ✅ 여기에 추가!
      },
    },
  },
  plugins: [],
};
