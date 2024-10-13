// adjustElementOverflow를 활용하는 useEffect 커스텀 훅
// Css Props 페이지 전용

import { useEffect } from 'react';
import { adjustElementOverflow } from '../utils/adjustElementOverflow';

export const useElementOverflowAdjustment = (
    viewChildElements: string[],
    setTranslateX: (x: number) => void = (x) => {},
    setTranslateY: (y: number) => void = (y) => {},
    dependencies: any[]
) => {
    useEffect(() => {
        const handleResize = () => {
            adjustElementOverflow(viewChildElements, setTranslateX, setTranslateY);
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
