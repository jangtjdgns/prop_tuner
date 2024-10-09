// src/components/Header.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';

const Header = () => {
    type CssCategory = {
        title: string,
        pagePath: string,
    }

    const [cssCategory] = useState<CssCategory[]>([
        { title: "select", pagePath: `/` },
        { title: "Layout", pagePath: `/category/Layout/AspectRatio` },
        { title: "Sizing", pagePath: `/category/Sizing` },
        // { title: "Typography" },
        // { title: "Interactivity" },
        // { title: "Filters" },
        // { title: "Backgrounds" },
        // { title: "SVG" },
        // { title: "Accessibility" },
        // { title: "Transitions" },
        // { title: "Animation" },
        // { title: "Tables" },
    ]);

    // .css-category-list, CssCategory 추가 함수
    function addCategory(item: CssCategory, idx: number): React.ReactNode {
        return (
            <li className='css-category-list' key={idx}>
                <button
                    className="btn btn-sm h-full px-10 btn-square btn-ghost"
                    onClick={() => clickedCategory(item)}
                >
                    {item.title}
                </button>
            </li>
        );
    }

    // css 제목 클릭 이벤트
    function clickedCategory(cssCategory: CssCategory) {
        const cssCategoryTag = document.getElementById('css-category');
        if (cssCategoryTag) {
            cssCategoryTag.textContent = cssCategory.title;
            navigateToCategory(cssCategory.pagePath);
        }
    }

    // 카테고리 페이지 이동
    const navigate = useNavigate();
    const navigateToCategory = (pagePath: string) => {
        navigate(pagePath);
    };


    return (
        <header className='w-screen min-w-[1024px] border-b flex justify-center items-center'>
            <div className="navbar bg-base-100">
                <div className="flex-none z-[10001]">
                    {/* side bar */}
                    <div className="drawer">
                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            <label htmlFor="my-drawer" className="btn btn-square btn-ghost drawer-button">
                                <FontAwesomeIcon icon={faBars} size="lg" />
                            </label>
                        </div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                                <li className='w-full font-bold text-2xl'>
                                    <button className='block text-center'
                                        onClick={() => clickedCategory(cssCategory[0])}
                                    >
                                        Prop_Tuner
                                    </button>
                                </li>

                                {/* Css 속성 */}
                                <li>
                                    <h2 className="menu-title">Css Properties</h2>
                                    <ul>
                                        <li>
                                            <details>
                                                <summary>Layout</summary>
                                                <ul>
                                                    <li><a>Aspect Ratio</a></li>
                                                    <li><a>Columns</a></li>
                                                    <li><a>Break</a></li>
                                                    <li><a>Box Sizing</a></li>
                                                    <li><a>Dispaly</a></li>
                                                    <li><a>Float</a></li>
                                                    <li><a>Object Fit</a></li>
                                                    <li><a>Object Position</a></li>
                                                    <li><a>Overflow</a></li>
                                                    <li><a>Position</a></li>
                                                    <li><a>Visibility</a></li>
                                                    <li><a>Z Index</a></li>
                                                </ul>
                                            </details>
                                        </li>
                                        <li>
                                            <details>
                                                <summary>Sizing</summary>
                                                <ul>
                                                    <li><a>Width</a></li>
                                                    <li><a>Min Width</a></li>
                                                    <li><a>Max Width</a></li>
                                                    <li><a>Height</a></li>
                                                    <li><a>Min Height</a></li>
                                                    <li><a>Max Height</a></li>
                                                </ul>
                                            </details>
                                        </li>
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
                        onClick={() => clickedCategory(cssCategory[0])}>
                        Prop_Tuner
                    </button>
                </div>
                <div className="flex-none px-2 z-[10000]">
                    <ul className="menu menu-horizontal px-1 gap-1">
                        <li>
                            <details>
                                <summary id="css-category">{cssCategory[0].title}</summary>
                                <ul className="bg-base-100 rounded-t-none p-2">
                                    {/* css 카테고리 리스트 추가 */}
                                    {
                                        cssCategory.slice(1).map((item, idx) => {
                                            return (addCategory(item, idx));
                                        })
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