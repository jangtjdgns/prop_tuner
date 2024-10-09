// src/pages/category/Layout.tsx
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { layoutCategories } from '../../../utils/categories';

// 페이지 처음 로드시 overflow-scroll이 적용안되는 문제가 있음. 새로고침해야지만 고쳐짐. 수정해야할듯
const Layout: React.FC = () => {
    const [selectedLayout, setSelectedLayout] = useState('AspectRatio');
    const navigate = useNavigate();

    // 레이아웃 버튼 클릭 핸들러
    const radioButtonHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value: string = event.target.value;
        setSelectedLayout(value);
        navigate(`/category/Layout/${value}`); // 라우트 업데이트
    }

    const location = useLocation();
    useEffect(() => {
        const pathSegments = location.pathname.split('/category/Layout/');
        if(pathSegments[1]) {       // layout 카테고리 내 속성 체크
            return setSelectedLayout(pathSegments[1]);
        }
        setSelectedLayout('AspectRatio');
    }, [location.pathname]);

    // 현재 페이지 확인 및 로드
    const checkCurPage = () => {
        const lastPart = window.location.pathname.split('/').pop() as string;
        setSelectedLayout(lastPart);
    }

    // 페이지 로드 후
    window.onload = function () {
        checkCurPage();
    }

    return (
        <>
            <div className='h-[calc(100vh-9rem)] grid grid-rows-[4rem_1fr] bg-white'>
                {/* CSS */}
                <div id="category-layouts" className='h-full border-b shadow-md flex gap-2 items-center px-2'>
                    {layoutCategories.map(option => (
                        <input
                            key={option.id}
                            type="radio"
                            id={`layout-${option.id}`}
                            className="btn layout"
                            name="layout"
                            value={option.value}
                            aria-label={option.label}
                            checked={selectedLayout === option.value}
                            onChange={radioButtonHandler}
                        />
                    ))}
                </div>

                <div id="category-views" className='relative w-full h-full px-4 py-8 bg-gray-200 overflow-scroll'>
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default Layout;