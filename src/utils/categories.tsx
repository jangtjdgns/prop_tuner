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
    { id: 'aspectRatio', value: 'AspectRatio', label: 'Aspect Ratio' },
    { id: 'columns', value: 'Columns', label: 'Columns' },
    { id: 'break', value: 'Break', label: 'Break' },
    { id: 'boxSizing', value: 'BoxSizing', label: 'Box Sizing' },
    { id: 'display', value: 'Display', label: 'Display' },
    { id: 'float', value: 'Float', label: 'Float' },
    { id: 'objectFit', value: 'ObjectFit', label: 'Object Fit' },
    { id: 'objectPosition', value: 'ObjectPosition', label: 'Object Position' },
    { id: 'overflow', value: 'Overflow', label: 'Overflow' },
    { id: 'position', value: 'Position', label: 'Position' },
    { id: 'visibility', value: 'Visibility', label: 'Visibility' },
    { id: 'zIndex', value: 'ZIndex', label: 'Z Index' },
];

// Sizing
export const sizingCategories = [
    { id: 'width', value: 'Width', label: 'Width' },
    { id: 'height', value: 'Height', label: 'Height' },
    { id: 'minWidth', value: 'MinWidth', label: 'Min Width' },
    { id: 'minHeight', value: 'MinHeight', label: 'Min Height' },
    { id: 'maxWidth', value: 'MaxWidth', label: 'Max Width' },
    { id: 'maxHeight', value: 'MaxHeight', label: 'Max Height' },
    { id: 'margin', value: 'Margin', label: 'Margin' },
    { id: 'padding', value: 'Padding', label: 'Padding' },
    { id: 'border', value: 'Border', label: 'Border' },
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
    // 추가 카테고리들 필요 시 주석 해제
    // { title: "Typography", pagePath: `/category/Typography` },
    // Typography, writing-mode, text-orientation


    // { title: "Interactivity", pagePath: `/category/Interactivity` },
    // { title: "Filters", pagePath: `/category/Filters` },
    // { title: "Backgrounds", pagePath: `/category/Backgrounds` },
    // { title: "SVG", pagePath: `/category/SVG` },
    // { title: "Accessibility", pagePath: `/category/Accessibility` },
    // { title: "Transitions", pagePath: `/category/Transitions` },
    // { title: "Animation", pagePath: `/category/Animation` },
    // { title: "Tables", pagePath: `/category/Tables` },
];