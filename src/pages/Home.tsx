// src/pages/Home.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 네비게이션 함수 가져오기

    // categories 타입 정의
    type Category = {
        category: string;
        property: string[];
    };

    // 초기 데이터 리스트
    const categories: Category[] = [
        {
            category: 'Layout',
            property: [
                'Aspect Ratio', 'Container', 'Columns', 'Break', 'Box Sizing', 'Display', 'Float', 'Clear', 'Object Fit', 'Object Position', 'Overflow', 'Position', 'Top / Right / Bottom / Left', 'visibility', 'Z-index'
            ]
        },
        {
            category: 'Sizing',
            property: [
                'Width', 'Min Width', 'Max Width', 'Height', 'Min Height', 'Max Height'
            ]
        },
    ]

    const [searchTerm, setSearchTerm] = useState('');
    // 필터링된 카테고리
    const filteredCategories = categories.filter(category =>
        category.property.some(property => property.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <>
            {/* <div className='color-change-2x w-full h-96'> */}
            <div id="banner" className='w-full h-[calc(100vh-5rem)] flex items-center justify-center'>
                <label className="w-96 input input-bordered flex items-center gap-2 relative">
                    {/* 검색 입력 */}
                    <input type="text"
                        placeholder="Search Properties"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="grow"
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd" />
                    </svg>

                    <div className="mt-14 absolute z-10 top-0 left-0 w-full">
                        {/* 검색어가 있으면서 결과가 있는경우 렌더링 함 */}
                        {searchTerm && filteredCategories.length > 0 ? (
                            <div className="bg-white border rounded shadow-lg">
                                {filteredCategories.map((category) => (
                                    <div key={category.category}>
                                        <h3 className="font-bold">{category.category}</h3>
                                        <ul>
                                            {category.property
                                                .filter(property => property.toLowerCase().includes(searchTerm.toLowerCase()))
                                                .map((property) => (
                                                    <li key={property}>{property}</li>
                                                ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            searchTerm ? (      // 검색어는 있지만 결과가 없는 경우
                                <div className="w-full bg-white border rounded shadow-lg">
                                    No results found.
                                </div>
                            ) : null            // 검색어가 없는 경우, 렌더링 하지 않음
                        )}
                    </div>
                </label>
            </div>
            <div>asdasd</div>
            <div>asdasd</div>
            <div>asdasd</div>
            <div>asdasd</div>
            <div>asdasd</div>
            <div>asdasd</div>
            <div>asdasd</div>
            <div>
                <h1>Home Page</h1>
                <button className='btn' onClick={() => navigate('/board')}>Go to Board</button>
            </div>
        </>
    );
}

export default Home;