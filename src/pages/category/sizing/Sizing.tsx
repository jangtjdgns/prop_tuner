// src/pages/category/Sizing.tsx
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { sizingCategories } from '../../../utils/categories';

const Sizing: React.FC = () => {
    const [selectedSizing, setSelectedSizing] = useState('Width');
    const navigate = useNavigate();

    // 레이아웃 버튼 클릭 핸들러
    const radioButtonHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value: string = event.target.value;
        setSelectedSizing(value);
        navigate(`/category/Sizing/${value}`); // 라우트 업데이트
    }

    const location = useLocation();
    useEffect(() => {
        const pathSegments = location.pathname.split('/category/Sizing/');
        if (pathSegments[1]) {       // sizing 카테고리 내 속성 체크
            return setSelectedSizing(pathSegments[1]);
        }
        setSelectedSizing('Width');
    }, [location.pathname]);

    return (
        <>
            <div className='min-h-[calc(100vh-80px)] grid grid-rows-[4rem_1fr] bg-white'>
                {/* CSS */}
                <div id="category-sizings" className='h-full border-b shadow-md flex gap-2 items-center px-2'>
                    {sizingCategories.map(item => (
                        <input
                            key={item.id}
                            type="radio"
                            id={`sizing-${item.id}`}
                            className="btn sizing"
                            name="sizing"
                            value={item.value}
                            aria-label={item.label}
                            checked={selectedSizing === item.value}
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