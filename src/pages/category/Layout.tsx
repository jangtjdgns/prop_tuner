// src/pages/category/Layout.tsx
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

// 페이지 처음 로드시 overflow-scroll이 적용안되는 문제가 있음. 새로고침해야지만 고쳐짐. 수정해야할듯
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
            <div className='h-[calc(100vh-9rem)] grid grid-rows-[4rem_1fr] bg-white'>
                {/* CSS */}
                <div id="category-layouts" className='h-full border-b shadow-md flex gap-2 items-center px-2'>
                    <input type="radio" id="layout-aspectRatio" className="btn layout" name='layout' value="AspectRatio" aria-label="Aspect Ratio" checked={selectedLayout === 'AspectRatio' || selectedLayout === 'Layout'} onChange={radioButtonHandler} />
                    <input type="radio" id="layout-columns" className="btn layout" name='layout' value="Columns" aria-label="Columns" checked={selectedLayout === 'Columns'} onChange={radioButtonHandler} />
                    <input type="radio" id="layout-break" className="btn layout" name='layout' value="Break" aria-label="Break" checked={selectedLayout === 'Break'} onChange={radioButtonHandler} />
                    <input type="radio" id="layout-boxSizing" className="btn layout" name='layout' value="BoxSizing" aria-label="Box Sizing" checked={selectedLayout === 'BoxSizing'} onChange={radioButtonHandler} />
                    <input type="radio" id="layout-display" className="btn layout" name='layout' value="Display" aria-label="Display" checked={selectedLayout === 'Display'} onChange={radioButtonHandler} />
                    <input type="radio" id="layout-float" className="btn layout" name='layout' value="Float" aria-label="Float" checked={selectedLayout === 'Float'} onChange={radioButtonHandler} />
                    <input type="radio" id="layout-objectFit" className="btn layout" name='layout' value="ObjectFit" aria-label="Object Fit" checked={selectedLayout === 'ObjectFit'} onChange={radioButtonHandler} />
                    <input type="radio" id="layout-objectPosition" className="btn layout" name='layout' value="ObjectPosition" aria-label="Object Position" checked={selectedLayout === 'ObjectPosition'} onChange={radioButtonHandler} />
                    <input type="radio" id="layout-overflow" className="btn layout" name='layout' value="Overflow" aria-label="Overflow" checked={selectedLayout === 'Overflow'} onChange={radioButtonHandler} />
                    <input type="radio" id="layout-position" className="btn layout" name='layout' value="Position" aria-label="Position" checked={selectedLayout === 'Position'} onChange={radioButtonHandler} />
                    <input type="radio" id="layout-visibility" className="btn layout" name='layout' value="Visibility" aria-label="Visibility" checked={selectedLayout === 'Visibility'} onChange={radioButtonHandler} />
                    <input type="radio" id="layout-zIndex" className="btn layout" name='layout' value="ZIndex" aria-label="Z Index" checked={selectedLayout === 'ZIndex'} onChange={radioButtonHandler} />
                </div>

                <div id="category-views" className='relative w-full h-full px-4 py-8 bg-gray-200 overflow-scroll'>
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default Layout;