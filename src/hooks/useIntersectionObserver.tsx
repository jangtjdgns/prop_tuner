import { useEffect, useRef } from 'react';

// single
export const useObserver = (
    defaultStyles: React.CSSProperties,         // 기본 스타일 객체
    visibleStyles: React.CSSProperties,         // 화면에 보일 때 적용할 스타일 객체
    options: IntersectionObserverInit           // IntersectionObserver 옵션
) => {
    const ref = useRef(null);

    useEffect(() => {
        const defaultOptions: IntersectionObserverInit = {
            root: null,
            rootMargin: '0px',
            threshold: 0,
        };

        const observerOptions = options || defaultOptions;

        const observer = new IntersectionObserver(
            ([entry]) => {
                const target = entry.target as HTMLElement
                if (entry.isIntersecting) {
                    Object.assign(target.style, visibleStyles);
                } else {
                    Object.assign(target.style, defaultStyles);
                }
            },
            options
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [defaultStyles, visibleStyles, options]);

    return ref;
};


// Multi
// ref={(el) => el && refs.current.push(el)}
export const useObservers = (
    defaultStyles: React.CSSProperties,
    visibleStyles: React.CSSProperties,
    options: IntersectionObserverInit
) => {
    const refs = useRef<HTMLElement[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const target = entry.target as HTMLElement
                    if (entry.isIntersecting) {
                        Object.assign(target.style, visibleStyles);
                    } else {
                        Object.assign(target.style, defaultStyles);
                    }
                });
            },
            options
        );

        refs.current.forEach((ref) => observer.observe(ref));

        return () => {
            refs.current.forEach((ref) => observer.unobserve(ref));
        };
    }, [defaultStyles, visibleStyles, options]);

    return refs;
};