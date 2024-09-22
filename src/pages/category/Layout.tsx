// src/pages/category/Layout.tsx
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

// 페이지 처음 로드시 overflow-scroll이 적용안되는 문제가 있음. 새로고침해야지만 고쳐짐. 수정해야할듯

/**
 * Aspect Ratio             o
 * Container                x
 * Columns
 * Break - 3개 통합
 * Break After
 * Break Before
 * Break Inside
 * Box Decoration Break
 * Box Sizing
 * Display
 * Float
 * Clear
 * Isolation
 * Object Fit
 * Object Position
 * Overflow
 * Overscroll Behavior
 * Position
 * Top / Right / Bottom / Left
 * visibility
 * Z-index
 * 
 */

const Layout: React.FC = () => {
    const [selectedLayout, setSelectedLayout] = useState('AspectRatio');
    const navigate = useNavigate();

    // 레이아웃 버튼 클릭 핸들러
    const radioButtonHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value:string = event.target.value;
        setSelectedLayout(value);
        navigate(`/category/Layout/${value}`); // 라우트 업데이트
    }

    // view maxHeight 지정
    // const setViewMaxHeight = () => {
    //     const view = document.getElementById('view');
    //     if (view) {
    //         const maxHeight = view.clientHeight;
    //         view.style.maxHeight = `${maxHeight}px`;
    //         console.log('as')
    //     }
    // };

    // 현재 페이지 확인 및 로드
    const checkCurPage = () => {
        const lastPart = window.location.pathname.split('/').pop() as string;
        setSelectedLayout(lastPart);
    }

    // 페이지 로드 후
    window.onload = function() {
        // setViewMaxHeight();
        checkCurPage();
    }

    return (
        <>
            <div className='h-full grid grid-rows-[8rem_1fr] bg-white'>
                {/* CSS */}
                <div id="category-layouts" className='h-full border-b shadow-md flex gap-2 p-3'>
                    <input type="radio" id="layout-aspectRatio" className="btn layout" name='layout' value="AspectRatio" aria-label="Aspect Ratio" checked={selectedLayout === 'AspectRatio'} onChange={radioButtonHandler} />
                    <input type="radio" id="layout-columns" className="btn layout" name='layout' value="Columns" aria-label="Columns" checked={selectedLayout === 'Columns'} onChange={radioButtonHandler} />
                    <input type="radio" id="layout-break" className="btn layout" name='layout' value="Break" aria-label="Break" checked={selectedLayout === 'Break'} onChange={radioButtonHandler} />
                </div>

                <div id="category-views" className='relative w-full h-full px-4 py-8 bg-gray-200 overflow-hidden'>
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default Layout;