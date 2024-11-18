// src/components/Category.tsx
// Category
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { CategoryItem, categoryData } from '../utils/categories';

const Category: React.FC = () => {
    type CategoryDataKey = keyof typeof categoryData;

    const [mainCategory, setMainCategory] = useState<CategoryDataKey>('layout');    // 메인 카테고리
    const [subCategory, setSubCategory] = useState('AspectRatio');                  // 서브 카테고리 (속성들)
    const navigate = useNavigate();

    // subCategory 리스트 표시
    const showSubCategories = () => {
        const subCategoryItem: CategoryItem[] = categoryData[mainCategory];  // mainCategory에 해당하는 카테고리 배열 선택

        if (!subCategoryItem) return null;

        return subCategoryItem.map(item => (
            <input
                key={item.id}
                type="radio"
                id={`category-${mainCategory}`}
                className={`btn category-${mainCategory}`}
                name={`category-${mainCategory}`}
                value={item.value}
                aria-label={item.label}
                checked={subCategory === item.value}
                onChange={radioButtonHandler}
            />
        ));
    };

    // 서브 카테고리 버튼 클릭 핸들러
    const radioButtonHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const curMainCategory = event.target.name.replace("category-", "") as CategoryDataKey;
        const selectedSubCategory: string = event.target.value;

        setMainCategory(curMainCategory);
        setSubCategory(selectedSubCategory);
        navigate(`/category/${curMainCategory}/${selectedSubCategory}`); // 라우트 업데이트
    }

    // 새로고침 시 현재 페이지에 맞는 버튼이 선택되는 기능
    const location = useLocation();
    useEffect(() => {
        const pathSegments = location.pathname.split(`/`);      // '/category/${mainCategory}/${subCategory}'
        let mainCt = pathSegments[2] as CategoryDataKey;        // mainCategory
        let subCt = pathSegments[3];                            // subCategory

        if (!mainCt) mainCt = 'layout';
        mainCt = mainCt.toLowerCase() as CategoryDataKey;       // 소문자 변환
        setMainCategory(mainCt);

        const subCategoryItem = categoryData[mainCt];
        if (!subCt) subCt = subCategoryItem[0].value;
        setSubCategory(subCt);
    }, [location.pathname]);

    return (
        <>
            <div className='min-h-[calc(100vh-80px)] grid grid-rows-[4rem_1fr] bg-white'>
                {/* CSS */}
                <div id="category" className='w-full h-full border-b shadow-md flex gap-2 items-center px-2 overflow-x-scroll'>
                    {showSubCategories()}
                </div>

                <div id="category-views" className='relative min-w-[1024px] w-full h-[calc(100vh-80px-64px)] py-2 bg-gray-200 overflow-hidden box-border'>
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default Category;