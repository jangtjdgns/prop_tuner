// 카테고리 정보 객체를 담은 배열

// Layout
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
];