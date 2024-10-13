// Visibility.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../../utils/handleOptionToggle';
import { copyCss } from '../../../../utils/clipboardUtils';
import { useElementOverflowAdjustment } from '../../../../hooks/useElementOverflowAdjustment ';

const Visibility: React.FC = () => {
    const [visibility, setVisibility] = useState<'visible' | 'hidden'>('visible');
    const [activeTags, setActiveTags] = useState([0, 0, 0, 1, 0, 0, 0]);
    const [boxTranslateY, setBoxTranslateY] = useState(0);

    // visibility 업데이트
    const updateVisibility = (value: 'visible' | 'hidden') => {
        setVisibility(value);
    }

    // activeTags 업데이트, 태그 활성화
    const updateActiveTags = (index: number) => {
        const updatedTags = [...activeTags];
        updatedTags[index] = activeTags[index] === 1 ? 0 : 1;
        setActiveTags(updatedTags);
    };

    // activeTags 활성화 체크
    const checekdActiveTag = (index: number) => {
        let value = visibility
        activeTags[index] === 1 ? value = visibility : value = 'visible'
        return value;
    }

    useElementOverflowAdjustment(['#visibility'], () => 0, setBoxTranslateY, [visibility, activeTags]);

    return (
        <>
            <div id='option-wrap' className='absolute top-10 left-6 transition-transform duration-500 z-[1000]'>
                <div className='w-72 flex flex-col gap-2 shadow rounded-xl p-2 bg-white border border-gray-200 hover:shadow-2xl hover:border-gray-300 transition-all duration-500'>
                    <label id="option-toggle-btn"
                        className="swap absolute top-2 right-2 btn btn-xs btn-circle"
                    >
                        <input type="checkbox" onClick={(event) => handleOptionToggle(event)} />
                        <div className="swap-on"><FontAwesomeIcon icon={faPlus} /></div>
                        <div className="swap-off"><FontAwesomeIcon icon={faMinus} /></div>
                    </label>

                    {/* 옵션 내용 상단 */}
                    <div className='relative flex flex-col gap-2'>
                        <div className='text-center pt-2 font-bold text-lg'>Visibility</div>
                        <div className='absolute top-0 left-0'>
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn btn-circle btn-ghost btn-xs text-info">
                                    <svg
                                        tabIndex={0}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        className="h-4 w-4 stroke-current">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <div
                                    tabIndex={0}
                                    className="card compact dropdown-content bg-base-100 rounded-box z-[1] w-64 shadow">
                                    <div tabIndex={0} className="card-body font-bold">
                                        <p>The element is hidden but still occupies space. It affects the layout, and other elements do not take its place.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll'>
                        {/* Visibility */}
                        <div className='text-center p-0.5 text-xs'>
                            visibility:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={visibility}
                                readOnly
                            />
                            {/* visibility 복사 */}
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('visibility', visibility, false)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        {/* 속성을 적용할 태그 선택 */}
                        <div className='divider font-bold text-lg'>Select Tag</div>
                        <div className="flex grid grid-cols-7 gap-2">
                            {activeTags.map((tagState, index) => (
                                <input type="checkbox"
                                    key={index}
                                    className='btn btn-sm'
                                    aria-label={`${index + 1}`}
                                    checked={tagState === 1}
                                    onChange={() => updateActiveTags(index)}
                                />
                            ))}
                        </div>

                        <div className="divider font-bold text-lg">Values</div>
                        <div className='grid grid-cols-2 gap-2'>
                            <input type='radio'
                                name='visibility'
                                className="btn border-2 focus:border-gray-400"
                                aria-label='visible'
                                checked={visibility === 'visible'}
                                onChange={() => updateVisibility('visible')}
                            />
                            <input type='radio'
                                name='visibility'
                                className="btn border-2 focus:border-gray-400"
                                aria-label='hidden'
                                checked={visibility === 'hidden'}
                                onChange={() => updateVisibility('hidden')}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* view 파트 */}
            <div id="view" className='w-full h-full flex items-center justify-center overflow-scroll'>
                <div id='visibility' className='w-[500px] h-[700px] transition-transform duration-300'
                    style={{ transform: `translateY(${boxTranslateY}px)` }}
                >
                    <div className='w-full h-[100px] bg-red-500' style={{ visibility: checekdActiveTag(0) }}></div>
                    <div className='w-full h-[100px] bg-orange-500' style={{ visibility: checekdActiveTag(1) }}></div>
                    <div className='w-full h-[100px] bg-yellow-500' style={{ visibility: checekdActiveTag(2) }}></div>
                    <div className='w-full h-[100px] bg-green-500' style={{ visibility: checekdActiveTag(3) }}></div>
                    <div className='w-full h-[100px] bg-blue-500' style={{ visibility: checekdActiveTag(4) }}></div>
                    <div className='w-full h-[100px] bg-indigo-500' style={{ visibility: checekdActiveTag(5) }}></div>
                    <div className='w-full h-[100px] bg-purple-500' style={{ visibility: checekdActiveTag(6) }}></div>
                </div>
            </div>
        </>
    );
}

export default Visibility;