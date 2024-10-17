// 클립보드 관련 유틸리티


// 절대 길이 단위 타입
type AbsoluteLengthUnits = 'cm' | 'mm' | 'in' | 'px' | 'pt' | 'pc';
// 상대 길이 단위 타입
type FontRelativeLengthUnits = 'em' | 'rem' | 'ex' | 'ch';
type ViewportRelativeLengthUnits = 'vw' | 'vh' | 'vmin' | 'vmax';
type PercentageUnit = '%';

// 길이와 관련된 모든 단위를 포함한 타입
type LengthUnits =
  | AbsoluteLengthUnits
  | FontRelativeLengthUnits
  | ViewportRelativeLengthUnits
  | PercentageUnit
  | '';  // 빈 문자열도 허용 (unit이 없는 경우)



// Css 복사 함수, Clipboard API 사용
export async function copyCss(
    property: string,
    value: string | number,
    unit: LengthUnits = ''           // 기본값 '' 지정
) {
    try {
        await navigator.clipboard.writeText(`${property}: ${String(value).trim()}${unit};`);
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
}