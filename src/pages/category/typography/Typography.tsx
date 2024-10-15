// src/pages/category/typography/Typography.tsx
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { typographyCategories } from '../../../utils/categories';

const Sizing: React.FC = () => {
    const [selectedFont, setSelectedFont] = useState('BasicFont');
    const navigate = useNavigate();

    // 레이아웃 버튼 클릭 핸들러
    const radioButtonHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value: string = event.target.value;
        setSelectedFont(value);
        navigate(`/category/Typography/${value}`); // 라우트 업데이트
    }

    const location = useLocation();
    useEffect(() => {
        const pathSegments = location.pathname.split('/category/Typography/');
        if (pathSegments[1]) {       // Typography 카테고리 내 속성 체크
            return setSelectedFont(pathSegments[1]);
        }
        setSelectedFont('BasicFont');
    }, [location.pathname]);

    return (
        <>
            <div className='min-h-[calc(100vh-80px)] grid grid-rows-[4rem_1fr] bg-white'>
                {/* CSS */}
                <div id="category-typography" className='h-full border-b shadow-md flex gap-2 items-center px-2 overflow-x-scroll'>
                    {typographyCategories.map(item => (
                        <input
                            key={item.id}
                            type="radio"
                            id={`font-${item.id}`}
                            className="btn typography"
                            name="typography"
                            value={item.value}
                            aria-label={item.label}
                            checked={selectedFont === item.value}
                            onChange={radioButtonHandler}
                        />
                    ))}
                </div>

                <div id="category-views" className='relative min-w-[1024px] w-full h-[calc(100vh-80px-64px)] py-2 bg-gray-200 overflow-hidden box-border'>
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default Sizing;