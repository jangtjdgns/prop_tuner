// 클립보드 관련 유틸리티

// Css 복사, Clipboard API
export async function copyCss(property: string, value: string | number, hasUnit: boolean) {
    let unit:string = '';
    if(hasUnit && value !== 'auto') {
        unit = 'px';
    } 

    try {
        await navigator.clipboard.writeText(`${property}: ${value}${unit};`);
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
}