// src/pages/category/Layout.tsx
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

/**
 * Aspect Ratio
 * Container
 * Columns
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

    const radioButtonHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSelectedLayout(value);
        navigate(`/category/Layout/${value}`); // 라우트 업데이트
    }


    // view maxHeight 지정
    const setViewMaxHeight = () => {
        const view = document.getElementById('view');
        if (view) {
            const maxHeight = view.clientHeight;
            view.style.maxHeight = `${maxHeight}px`;
        }
    };

    // 페이지 로드 후
    window.onload = function() {
        setViewMaxHeight();
    }

    return (
        <>
            <div className='h-full grid grid-rows-[8rem_1fr] bg-white'>
                {/* CSS */}
                <div id="category-layouts" className='h-full border-b shadow-md flex gap-2 p-3'>
                    <input type="radio" id="layout-aspectRatio" className="btn layout" name='layout' value="AspectRatio" aria-label="Aspect Ratio" onChange={radioButtonHandler} defaultChecked />
                    <input type="radio" id="layout-container" className="btn layout" name='layout' value="Container" aria-label="Container" onChange={radioButtonHandler} />
                    <input type="radio" id="layout-columns" className="btn layout" name='layout' value="Columns" aria-label="Columns" onChange={radioButtonHandler} />
                    <input type="radio" id="layout-breakAfter" className="btn layout" name='layout' value="BreakAfter" aria-label="Break After" onChange={radioButtonHandler} />
                </div>

                <div id="category-views" className='relative h-full px-4 py-10 bg-gray-200'>
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default Layout;