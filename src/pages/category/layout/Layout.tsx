// src/pages/category/layout/Layout.tsx
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

    return (
        <>
            <div className='min-h-[calc(100vh-80px)] grid grid-rows-[4rem_1fr] bg-white'>
                {/* CSS */}
                <div id="category-layouts" className='w-full h-full border-b shadow-md flex gap-2 items-center px-2 overflow-x-scroll'>
                    {layoutCategories.map(item => (
                        <input
                            key={item.id}
                            type="radio"
                            id={`layout-${item.id}`}
                            className="btn layout"
                            name="layout"
                            value={item.value}
                            aria-label={item.label}
                            checked={selectedLayout === item.value}
                            onChange={radioButtonHandler}
                        />
                    ))}
                </div>

                <div id="category-views" className='relative min-w-[1024px] w-full h-[calc(100vh-80px-64px)] h-full py-2 bg-gray-200 overflow-hidden box-border'>
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default Layout;