// 카테고리 데이터

// Layout 하위 컴포넌트 정보
/**
 * Aspect Ratio                     o
 * Container                        x
 * Columns                          o
 * Break After                      o
 * Break Before                     o
 * Break Inside                     o
 * Box Decoration Break             x
 * Box Sizing                       o
 * Display                          o
 * Float                            o
 * Clear                            o
 * Isolation                        x
 * Object Fit                       o
 * Object Position                  o
 * Overflow                         o
 * Overscroll Behavior              x
 * Position                         o
 * Top / Right / Bottom / Left      o
 * visibility                       o
 * Z-index                          o
 * 
 */

export const layoutCategories = [
    { id: 'aspectRatio', value: 'AspectRatio', label: 'Aspect Ratio' },             // 요소의 종횡비
    { id: 'columns', value: 'Columns', label: 'Columns' },                          // 다중 열 레이아웃의 열 수
    { id: 'break', value: 'Break', label: 'Break' },                                // 페이지 나누기 속성 (인쇄 시)
    { id: 'boxSizing', value: 'BoxSizing', label: 'Box Sizing' },                   // 박스 모델 크기 조정
    { id: 'display', value: 'Display', label: 'Display' },                          // 요소 표시 유형
    { id: 'float', value: 'Float', label: 'Float' },                                // 요소의 플로팅, (clear 속성 포함)
    { id: 'objectFit', value: 'ObjectFit', label: 'Object Fit' },                   // 교체 요소(img, video 등)의 객체 맞춤 방식
    { id: 'objectPosition', value: 'ObjectPosition', label: 'Object Position' },    // 교체 요소의 위치 설정
    { id: 'overflow', value: 'Overflow', label: 'Overflow' },                       // 컨텐츠 오버플로우
    { id: 'position', value: 'Position', label: 'Position' },                       // 요소 위치 지정, (top, right, bottom, left 포함)
    { id: 'visibility', value: 'Visibility', label: 'Visibility' },                 // 요소 가시성
    { id: 'zIndex', value: 'ZIndex', label: 'Z Index' },                            // 위치가 지정된 요소의 쌓이는 순서 지정
];

// Sizing
export const sizingCategories = [
    { id: 'width', value: 'Width', label: 'Width' },                                // 너비
    { id: 'height', value: 'Height', label: 'Height' },                             // 높이
    { id: 'minWidth', value: 'MinWidth', label: 'Min Width' },                      // 최소 너비
    { id: 'minHeight', value: 'MinHeight', label: 'Min Height' },                   // 최소 높이
    { id: 'maxWidth', value: 'MaxWidth', label: 'Max Width' },                      // 최대 너비
    { id: 'maxHeight', value: 'MaxHeight', label: 'Max Height' },                   // 최대 높이
    { id: 'margin', value: 'Margin', label: 'Margin' },                             // 외부 여백
    { id: 'padding', value: 'Padding', label: 'Padding' },                          // 내부 여백
    { id: 'border', value: 'Border', label: 'Border' },                             // 테두리 (요소 안쪽)
    { id: 'outline', value: 'Outline', label: 'Outline' },                          // 윤곽선 (요소 바깥쪽)
];

// Typography
export const typographyCategories = [
    { id: 'basicFont', value: 'BasicFont', label: 'Basic Font' },                   // font-style, font-weight, font-size, font-family 포함
    { id: 'advancedFont', value: 'AdvancedFont', label: 'Advanced Font' },          // font-feature-settings, font-kerning, font-variant, font-stretch 포함
    { id: 'lineHeight ', value: 'LineHeight', label: 'Line Height' },               // 줄 간격
    { id: 'letterSpacing', value: 'LetterSpacing', label: 'Letter Spacing' },       // 문자 간격
    { id: 'wordSpacing', value: 'WordSpacing', label: 'Word Spacing' },             // 단어 간격
    { id: 'textIndent', value: 'TextIndent', label: 'Text Indent' },                // 첫줄 들여쓰기
    { id: 'textDecoration', value: 'TextDecoration', label: 'Text Decoration' },    // 텍스트 정식
    { id: 'textShadow', value: 'TextShadow', label: 'Text Shadow' },                // 텍스트 그림자
    { id: 'textAlign', value: 'TextAlign', label: 'Text Align' },                   // 텍스트 정렬
    { id: 'whiteSpace', value: 'WhiteSpace', label: 'White Space' },                // 공백 처리
    { id: 'overflowWrap', value: 'OverflowWrap', label: 'Overflow Wrap' },          // 텍스트 줄바꿈
    { id: 'wordBreak', value: 'WordBreak', label: 'Word Break' },                   // 단어 줄바꿈
    { id: 'textOverflow', value: 'TextOverflow', label: 'Text Overflow' },          // 텍스트 오버플로우
    { id: 'direction', value: 'Direction', label: 'Direction' },                    // 텍스트 방향
    { id: 'writingMode', value: 'WritingMode', label: 'Writing Mode' },             // 텍스트 쓰기 방향 설정 (세로 쓰기 등)
    { id: 'hyphens', value: 'Hyphens', label: 'Hyphens' },                          // 단어를 자동으로 하이픈으로 구분하는 속성
    // fontSmoothing
    // listStyleType
    // listStylePosition
    // textUnderlineOffset
    // textTransform
    // vertical-align (table)
];

// design
export const designCategories = [
    { id: 'background', value: 'Background', label: 'Background' },                 // 배경 속성 (색상, 이미지 등)
    { id: 'color', value: 'Color', label: 'Color' },                                // 텍스트 색상
    { id: 'gradient', value: 'Gradient', label: 'Gradient' },                       // 새로운 그라데이션 카테고리
    { id: 'clipPath', value: 'ClipPath', label: 'Clip Path' },                      // 요소의 일부분을 특정한 모양으로 잘라내기 위한 경로 설정
    // filter           // 요소에 필터 효과를 추가
    // backdropFilter   // 배경 필터를 적용하는 속성
    // background-blend-mode    // 배경 이미지나 색상의 혼합 모드를 설정
];

// flexbox
export const flexboxCategories = [
    { id: 'flexDirection', value: 'FlexDirection', label: 'Flex Direction' },       // 플렉스 방향
    { id: 'flexWrap', value: 'FlexWrap', label: 'Flex Wrap' },                      // 플렉스 줄바꿈
    { id: 'flexFlow', value: 'FlexFlow', label: 'Flex Flow' },                      // 플렉스 방향과 줄바꿈 단축 속성
    { id: 'justifyContent', value: 'JustifyContent', label: 'Justify Content' },    // 주축 정렬
    { id: 'alignItems', value: 'AlignItems', label: 'Align Items' },                // 교차 축 정렬
    { id: 'alignContent', value: 'AlignContent', label: 'Align Content' },          // 여러 행의 정렬
    { id: 'alignSelf', value: 'AlignSelf', label: 'Align Self' },                   // 개별 아이템 정렬
    { id: 'order', value: 'Order', label: 'Order' },                                // 아이템 순서
    { id: 'flexGrow', value: 'FlexGrow', label: 'Flex Grow' },                      // 남는 공간 차지 비율
    { id: 'flexShrink', value: 'FlexShrink', label: 'Flex Shrink' },                // 공간 부족 시 축소 비율
    { id: 'flexBasis', value: 'FlexBasis', label: 'Flex Basis' }                    // 기본 크기
];

// grid
export const gridCategories = [
    { id: 'gridTemplateColumns', value: 'GridTemplateColumns', label: 'Grid Template Columns' }, // 열 정의
    { id: 'gridTemplateRows', value: 'GridTemplateRows', label: 'Grid Template Rows' },          // 행 정의
    { id: 'gridColumnGap', value: 'GridColumnGap', label: 'Grid Column Gap' },                   // 열 간격
    { id: 'gridRowGap', value: 'GridRowGap', label: 'Grid Row Gap' },                            // 행 간격
    { id: 'gridGap', value: 'GridGap', label: 'Grid Gap' },                                      // 열과 행 간의 간격
    { id: 'gridTemplateAreas', value: 'GridTemplateAreas', label: 'Grid Template Areas' },       // 그리드 영역 정의
    { id: 'gridArea', value: 'GridArea', label: 'Grid Area' },                                   // 아이템 위치 정의
    { id: 'gridAutoColumns', value: 'GridAutoColumns', label: 'Grid Auto Columns' },             // 자동 생성 열 크기
    { id: 'gridAutoRows', value: 'GridAutoRows', label: 'Grid Auto Rows' },                      // 자동 생성 행 크기
    { id: 'gridAutoFlow', value: 'GridAutoFlow', label: 'Grid Auto Flow' },                      // 배치 순서
    { id: 'justifyItems', value: 'JustifyItems', label: 'Justify Items' },                       // 그리드 셀 수평 정렬
    { id: 'alignItems', value: 'AlignItems', label: 'Align Items' },                             // 그리드 셀 수직 정렬
    { id: 'justifyContent', value: 'JustifyContent', label: 'Justify Content' },                 // 컨테이너 내 수평 정렬
    { id: 'alignContent', value: 'AlignContent', label: 'Align Content' },                       // 컨테이너 내 수직 정렬
    { id: 'gridColumn', value: 'GridColumn', label: 'Grid Column' },                             // 아이템이 차지할 열 범위
    { id: 'gridRow', value: 'GridRow', label: 'Grid Row' }                                       // 아이템이 차지할 행 범위
];



// ============================================= //
// 상위 카테고리 데이터
export type Category = {
    title: string,
    pagePath: string,
    property: string[]

}
export const categories: Category[] = [
    {
        title: "select",
        pagePath: "/",
        property: [],
    },
    {
        title: "Layout",
        pagePath: "/category/Layout",
        property: layoutCategories.map(item => item.label),
    },
    {
        title: "Sizing",
        pagePath: "/category/Sizing",
        property: sizingCategories.map(item => item.label),
    },
    {
        title: "Typography",
        pagePath: `/category/Typography`,
        property: typographyCategories.map(item => item.label),
    },
    {
        title: "Design",
        pagePath: `/category/Design`,
        property: designCategories.map(item => item.label),
    },


    // { title: "Interactivity", pagePath: `/category/Interactivity` },
    // { title: "Filters", pagePath: `/category/Filters` },
    // { title: "Backgrounds", pagePath: `/category/Backgrounds` },
    // { title: "SVG", pagePath: `/category/SVG` },
    // { title: "Accessibility", pagePath: `/category/Accessibility` },
    // { title: "Transitions", pagePath: `/category/Transitions` },
    // { title: "Animation", pagePath: `/category/Animation` },
    // { title: "Tables", pagePath: `/category/Tables` },
];