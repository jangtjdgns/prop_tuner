// src/pages/Home.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryMetaData } from '../utils/categories';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Home = () => {
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 네비게이션 함수 가져오기

    const [searchTerm, setSearchTerm] = useState('');
    // 필터링된 카테고리
    const filteredCategories = categoryMetaData.filter(category =>
        category.property.some(property => property.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const sectionDefaultStyle = {
        opacity: 0,
        transform: 'translateX(100%)',
        transition: 'transform 0.6s ease, opacity 0.6s ease',
    }

    const sectionVisbleStyle = {
        opacity: 1,
        transform: 'translateX(0)',
        transition: 'transform 0.6s ease, opacity 0.6s ease',
    }

    const elementRef = useIntersectionObserver(
        ['observer-item'],
        sectionDefaultStyle,
        sectionVisbleStyle,
        {
            root: null,
            rootMargin: '-20% 0px',
            threshold: 0,
        }
    );


    return (
        <>
            {/* 1 */}
            <section id="banner" className='relative w-full min-w-[1024px]'>
                {/* 배너 배경 */}
                <div
                    className='w-full min-w-[1024px] h-[500px]' // width 및 height 설정
                    style={{
                        backgroundImage: 'url(https://cdn.pixabay.com/photo/2021/11/20/13/47/sky-6811874_1280.jpg)',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: '0 85%'
                    }}
                >
                </div>

                {/* 배너 검색어, absoulte */}
                <div className='absolute top-40 left-1/2 -translate-x-1/2'>
                    <h1 className='text-8xl text-white font-mono font-bold select-none pb-4'>Prop_Tuner</h1>
                    <label className="w-[525px] input input-bordered flex items-center gap-2 relative rounded-full">
                        {/* 검색 입력 */}
                        <input type="text"
                            placeholder="Search Properties"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="grow px-2"
                        />
                        <FontAwesomeIcon icon={faMagnifyingGlass} />

                        <div className="mt-14 absolute z-10 top-0 left-0 w-full font-mono">
                            {/* 검색어가 있으면서 결과가 있는경우 렌더링 함 */}
                            {searchTerm && filteredCategories.length > 0 ? (
                                <div id='search-list' className="bg-gray-100 border rounded max-h-[450px] overflow-y-scroll shadow-lg overflow-x-auto px-3 pb-4 bg-opacity-90">
                                    {filteredCategories.map((category) => (
                                        <div key={category.title} className=' pt-3'>
                                            <h3 className="font-bold text-2xl">{category.title}</h3>
                                            <ul>
                                                {category.property
                                                    .filter(property => property.toLowerCase().includes(searchTerm.toLowerCase()))
                                                    .map((property) => (
                                                        <li key={property} className='mx-0.5 inline'>
                                                            <button className='badge border-gray-400 shadow-outline hover:badge-neutral'
                                                                onClick={() => navigate(`/category/${category.title}/${property.split(' ').join('')}`)}>
                                                                {property}
                                                            </button>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                searchTerm ? (      // 검색어는 있지만 결과가 없는 경우
                                    <div className="w-full bg-gray-100 border rounded shadow-lg font-bold text-xl text-center py-3 bg-opacity-90">
                                        No results found.
                                    </div>
                                ) : null            // 검색어가 없는 경우, 렌더링 하지 않음
                            )}
                        </div>
                    </label>
                </div>

                {/* 배너 글 */}
                <div className='w-full min-w-[1024px] h-[calc(100vh-80px-500px)] min-h-[300px] bg-gray-100 flex items-center'>
                    <div className='min-w-[1024px] grid grid-cols-[160px_600px_160px] items-center justify-center gap-6 mx-auto'>
                        {/* 배너 글 좌측 사이드 */}
                        <div className="w-40 h-40 bg-base-100 p-2 shadow-xl rounded-lg text-center self-start">
                            <div className='flex flex-col gap-2'>
                                <h2 className="font-bold text-lg py-0.5">Popular Props</h2>
                                <div className='flex flex-col gap-1.5'>
                                    {/* 여기 서버 연결 시 변경해야함 */}
                                    <div className='btn'>Object Position</div>
                                    <div className='btn'>Box Sizing</div>
                                </div>
                            </div>
                        </div>

                        {/* 배너 글 중간 */}
                        <div className='w-[600px] h-48 mx-auto font-mono text-lg'>
                            <p className='font-bold text-5xl float-left pr-2'>Prop_Tuner</p>
                            <p>
                                is a website designed to quickly search for CSS properties and values, allowing users to view intuitive usage examples. It aims to provide a convenient tool for those who have already studied CSS but may have forgotten certain properties due to infrequent use, enabling them to quickly access information and test the properties in real time.
                            </p>
                        </div>

                        {/* 배너 글 우측 사이드 */}
                        <div className="w-40 h-40 bg-base-100 p-2 shadow-xl rounded-lg text-center self-start">
                            <div className='flex flex-col gap-2'>
                                <h2 className="font-bold text-lg py-0.5">Rec. Props</h2>
                                <div className='flex flex-col gap-1.5'>
                                    <div className='btn'>Object Position</div>
                                    <div className='btn'>Box Sizing</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2 */}
            <section id='community' className='h-[60vh] py-10 flex items-center justify-center overflow-hidden'>
                <div className='observer-item w-1/2 h-full border-2'
                    style={sectionDefaultStyle}
                    ref={elementRef}
                >
                </div>
            </section>
        </>
    );
}

export default Home;