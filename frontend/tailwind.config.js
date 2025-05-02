/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // JSX도 포함!
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
        sans: ['Noto Sans KR', 'sans-serif'], // 기본 sans 재정의
        pretendard: ['Pretendard', 'sans-serif'],//프리텐다드 글쏠 추가
      },
    },
  },
  plugins: [],
};
