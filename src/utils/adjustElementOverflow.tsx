// #view 자식 태그가 브라우저 크기를 벗어났을 때 오버플로우를 조정하는 함수 
// Css Props 페이지 전용

export const adjustElementOverflow = (
    viewChildElements: string[],
    setTranslateX: (x: number) => void = (x) => {},
    setTranslateY: (y: number) => void = (y) => {},
    padding: { widthPadding: number; heightPadding: number } = { widthPadding: 0, heightPadding: 0 } // 여백 설정
) => {
    const viewTag = document.querySelector('#view') as Element;

    viewChildElements.forEach((viewChildElement) => {
        const viewChildTag = document.querySelector(viewChildElement) as Element;
        
        if (viewChildTag) {
            // X축 조정
            if (viewChildTag.clientWidth > window.innerWidth) {
                setTranslateX((viewChildTag.clientWidth - window.innerWidth + padding.widthPadding) / 2);
            } else {
                setTranslateX(0);
            }

            // Y축 조정
            if (viewChildTag.clientHeight > viewTag.clientHeight) {
                setTranslateY((viewChildTag.clientHeight - viewTag.clientHeight + padding.heightPadding) / 2);
            } else {
                setTranslateY(0);
            }
        }
    });
};


