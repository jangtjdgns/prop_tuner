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

// 색상 hex -> rgb 변환, HexTo... 함수에 모두 사용됨
function hexToRgbComponents(hex: string) {
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
  const r = (bigint >> 16) & 255;   // 빨강
  const g = (bigint >> 8) & 255;    // 초록
  const b = bigint & 255;           // 파랑

  return [r, g, b];
}

// ==== 헥스코드 -> rgb값 ====
// Red, Green, Blue
export function hexToRgb(hex: string, useOpacity: boolean = false) {
  const [r, g, b] = hexToRgbComponents(hex);

  // 투명도 사용에 따라 반환값 다름
  if (useOpacity) {
    return `rgba(${r}, ${g}, ${b})`;   // 결과를 rgba 형식으로 반환
  }
  return `rgb(${r}, ${g}, ${b})`;     // 결과를 rgb 형식으로 반환
}

// ==== 헥스코드 -> rgba값, 투명 추가 ====
// Red, Green, Blue, Alpha
export function hexToRgba(hex: string, opacity: number) {
  // rgb 값 구하기
  const rgb = hexToRgb(hex, true);

  // rgba 형식으로 반환
  return `${rgb.slice(0, -1)}, ${opacity})`;  // 예: rab(0, 0, 0) -> rgba(0, 0, 0, opacity)
}



// ==== 헥스코드 -> HSL값 ====
// Hue, Saturation, Lightness
export function hexToHsl(hex: string, useOpacity: boolean = false) {
  // 3자리 또는 6자리 hex 코드를 모두 지원
  // #RRGGBB 또는 #RGB 형식

  let [r, g, b] = hexToRgbComponents(hex);
  // RGB를 0-1 범위로 변환
  r /= 255;
  g /= 255;
  b /= 255;

  // 최대 및 최소 색상 값
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // 무채색
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default: h = 0; // 기본값 설정
    }

    h /= 6; // 0-1 범위로 변환
  }

  // 투명도 사용에 따라 반환값 다름
  if (useOpacity) {
    return `hsla(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;    // 결과를 hsla 형식으로 반환
  }
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;       // 결과를 hsl 형식으로 반환
}

// ==== 헥스코드 -> HSLA값, 투명 추가 ====
// Hue, Saturation, Lightness, Alpha
export function hexToHsla(hex: string, opacity: number) {
  const hsl = hexToHsl(hex, true); // HSL 값 얻기

  // HSLA 형식으로 반환
  return `${hsl.slice(0, -1)}, ${opacity})`; // HSLA 형식으로 변환
}