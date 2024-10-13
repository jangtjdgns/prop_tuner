// 색상 관련 유틸리티

// 색상 -> rgb 값
export const colorsRGB: { [key: string]: string } = {
  red: '255, 0, 0',
  orange: '255, 165, 0',
  yellow: '255, 255, 0',
  green: '0, 128, 0',
  blue: '0, 0, 255',
  purple: '128, 0, 128',
  pink: '255, 192, 203',
  brown: '165, 42, 42',
  black: '0, 0, 0',
  white: '255, 255, 255',
  gray: '128, 128, 128',
  // + 가능
};


// ==== 헥스코드 -> rgb값 ====
export function hexToRgb(hex: string) {
  // 3자리 또는 6자리 hex 코드를 모두 지원
  // #RRGGBB 또는 #RGB 형식

  // # 제거
  hex = hex.replace(/^#/, '');

  // 3자리 hex 코드를 6자리로 변환
  if (hex.length === 3) {
    hex = hex.split('').map(function (char) {
      return char + char; // e.g. 'f' -> 'ff'
    }).join('');
  }

  // 16진수를 10진수로 변환
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255; // 빨강
  const g = (bigint >> 8) & 255;  // 초록
  const b = bigint & 255;         // 파랑

  return `rgb(${r}, ${g}, ${b})`; // 결과를 rgb 형식으로 반환
}


// ==== 헥스코드 -> rgba값, 투명 추가 ====
export function hexToRgba(hex: string, opacity: number) {
  // 3자리 또는 6자리 hex 코드를 모두 지원
  // #RRGGBB 또는 #RGB 형식

  // # 제거
  hex = hex.replace(/^#/, '');

  // 3자리 hex 코드를 6자리로 변환
  if (hex.length === 3) {
    hex = hex.split('').map(function (char) {
      return char + char; // e.g. 'f' -> 'ff'
    }).join('');
  }

  // 16진수를 10진수로 변환
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255; // 빨강
  const g = (bigint >> 8) & 255;  // 초록
  const b = bigint & 255;         // 파랑

  return `rgba(${r}, ${g}, ${b}, ${opacity})`; // 결과를 rgb 형식으로 반환
}