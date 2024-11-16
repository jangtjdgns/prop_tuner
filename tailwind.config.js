/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    /**
     * @tailwind base를 사용하면 적용되는 scrollbar-color 속성으로 인해 chrome에서는 webkit-scrollbar 속성이 적용되지않음.
     * 기본 스타일에 적용된 scrollbar-color 속성을 초기화하여 애초에 scrollbar-color가 설정되지 않은 상태로 변경하면
     * chrome에서 webkit-scrollbar 속성이 적용됨.
    */
    function ({ addBase }) {
      addBase({
        '*, *:hover': {
          scrollbarColor: 'unset',
        },
      });
    },
  ],
}