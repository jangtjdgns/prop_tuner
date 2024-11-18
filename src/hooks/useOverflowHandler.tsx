// adjustOverflow를 활용하는 useEffect 커스텀 훅
// Css Props 페이지 전용

import { useEffect } from 'react';
import { adjustOverflow } from '../utils/adjustOverflow';

// useOveflowHandler, translate만 사용
export const useOverflowHandler = (
    viewChildElements: string[],
    setTranslateX: (x: number) => void = (x) => { },
    setTranslateY: (y: number) => void = (y) => { },
    dependencies: any[],
    padding: { widthPadding: number; heightPadding: number } = { widthPadding: 0, heightPadding: 0 }
) => {
    useEffect(() => {
        const handleResize = () => {
            adjustOverflow(viewChildElements, setTranslateX, setTranslateY, padding);
        };

        window.addEventListener('resize', handleResize);
        setTimeout(() => {
            handleResize();
        }, 500);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, dependencies);
};