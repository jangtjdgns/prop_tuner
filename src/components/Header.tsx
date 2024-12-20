// src/components/Header.tsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useLocation } from 'react-router-dom';
import { CategoryMeta, categoryMetaData } from '../utils/categories';

const Header = () => {
    const [categoryTitle, setCategoryTitle] = useState('select');
    const location = useLocation();
    const navigate = useNavigate();

    // 카테고리 페이지 이동
    const navigateToCategory = (path: string) => {
        navigate(path);
    };

    // 현재 페이지에 따라서 카테고리 list 제목 변경
    useEffect(() => {
        const pathSegments = location.pathname.split('/');
        const isCategoryPage = pathSegments[1] === 'category';      // 카테고리 페이지인지 체크
        if (isCategoryPage) {
            const category = pathSegments[2];
            return setCategoryTitle(category);
        }
        setCategoryTitle('select');
    }, [location.pathname]);

    return (
        <header className='border-b flex justify-center items-center'>
            <div className="navbar bg-base-100">
                <div className="flex-none z-[10001]">
                    {/* aside side bar */}
                    <div className="drawer">
                        <input id="aside-mene" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            <label htmlFor="aside-mene" className="btn btn-square btn-ghost drawer-button">
                                <FontAwesomeIcon icon={faBars} size="lg" />
                            </label>
                        </div>
                        <div className="drawer-side">
                            <label htmlFor="aside-mene" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                                <li className='w-full font-bold text-2xl'>
                                    <button className='block text-center'
                                        onClick={() => navigateToCategory(categoryMetaData[0].path)}
                                    >
                                        Prop_Tuner
                                    </button>
                                </li>

                                {/* Css 속성 */}
                                <li>
                                    <h2 className="menu-title">Css Properties</h2>
                                    <ul id="category-props">
                                        {categoryMetaData.slice(1).map((category, categoryIndex) => (
                                            <li key={categoryIndex}>
                                                <details>
                                                    <summary>{category.title}</summary>
                                                    <ul className='menu-item'>
                                                        {category.property.map((item, itemIndex) => (
                                                            <li key={itemIndex}>
                                                                <button
                                                                    onClick={() => navigateToCategory(category.path + '/' + item.split(' ').join(''))}
                                                                >
                                                                    {item}
                                                                </button>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </details>
                                            </li>
                                        ))}
                                    </ul>
                                </li>

                                {/* 커뮤니티 */}
                                <li>
                                    <h2 className="menu-title">Community</h2>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <button id="site-title" className="btn btn-ghost text-xl"
                        onClick={() => navigateToCategory(categoryMetaData[0].path)}>
                        Prop_Tuner
                    </button>
                </div>
                <div className="flex-none px-2 z-[10000]">
                    <ul className="menu menu-horizontal px-1 gap-1">
                        <li>
                            <details>
                                <summary id="css-category">{categoryTitle}</summary>
                                <ul className="bg-base-100 rounded-t-none p-2">
                                    {/* css 카테고리 리스트 추가 */}
                                    {
                                        categoryMetaData.slice(1).map((item, idx) => (
                                            <li className='css-category-list' key={idx}>
                                                <button
                                                    className="btn btn-sm h-full px-10 btn-square btn-ghost"
                                                    onClick={() => {
                                                        const subPath = item.property[0].split(' ').join('');       // 띄어쓰기 제거
                                                        navigateToCategory(item.path + '/' + subPath);
                                                    }}
                                                >
                                                    {item.title}
                                                </button>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </details>
                        </li>
                    </ul>

                </div>
                <div className="flex-none">
                    <button className="btn btn-square btn-ghost">
                        <FontAwesomeIcon icon={faEllipsis} size="lg" />
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;