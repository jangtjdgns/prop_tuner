import { useEffect, useRef } from 'react';

export const useIntersectionObserver = (
    entries: string[],                                  // 기능을 적용할 요소의 클래스명 배열
    defaultStyles: React.CSSProperties,                 // 기본 스타일 객체
    visibleStyles: React.CSSProperties,                 // 화면에 보일 때 적용할 스타일 객체
    options: IntersectionObserverInit | null = null     // IntersectionObserver 옵션
) => {
    const elementRef = useRef(null);

    useEffect(() => {
        const defaultOptions: IntersectionObserverInit = {
            root: null,
            rootMargin: '0px',
            threshold: 0,
        };

        const observerOptions = options || defaultOptions;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const target = entry.target as HTMLElement; // target을 HTMLElement로 타입 단언

                    if (entry.isIntersecting) {
                        Object.assign(target.style, visibleStyles);
                    } else {
                        Object.assign(target.style, defaultStyles);
                    }
                });
            },
            observerOptions
        );

        const currentElement = elementRef.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [entries, defaultStyles, visibleStyles, options]);

    return elementRef;
};
