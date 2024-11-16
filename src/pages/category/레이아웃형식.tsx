// 기본 레이아웃 형식(복사용 tsx 파일).tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../utils/handleOptionToggle';
import { copyCss } from '../../utils/clipboardUtils';
import { useElementOverflowAdjustment } from '../../hooks/useElementOverflowAdjustment ';

const test: React.FC = () => {

    // const [boxTranslateX, setBoxTranslateX] = useState(0);
    // const [boxTranslateY, setBoxTranslateY] = useState(0);

    // event: React.ChangeEvent<HTMLInputElement>

    // const dependencies = [outlineWidth, outlineStyle, outlineColor, outlineOpacity, outlineOffset];
    // useElementOverflowAdjustment(['#outline'], () => 0, setBoxTranslateY, dependencies);


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
                    <div className='flex flex-col gap-2'>
                        <div className='text-center pt-2 font-bold text-lg'>제목</div>
                        {/* 아래 태그는 표시할 내용이 있는 경우 사용 */}
                        {/* <div className='px-4 text-xs text-right font-bold'><span className='text-red-700'>*</span> Basis: object-fit: none;</div> */}
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div id='option-wrap-bottom' className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll px-2'>
                        {/* 제목 */}
                        <div className='text-center p-0.5 text-xs'>
                            속성:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                // value={속성값}
                                readOnly
                            />
                            {/* 속성 복사 */}
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('속성', '값')}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        <div className="divider font-bold text-lg">서브 제목</div>
                        <div className='grid grid-cols-3 gap-2'>
                            {/* {objectPositionValues.map((value, index) => (
                                <input
                                    key={index}
                                    type='radio'
                                    name='aa'
                                    className="btn"
                                    aria-label={value}
                                    value={value}
                                    checked= {aa === value}
                                    onChange={() => updateAA()}
                                />
                            ))} */}
                        </div>

                        {/* 이미지 사용시 활용 */}
                        {/* <div className="divider font-bold text-lg">Image</div>
                        <button className="btn p-0">
                            <input type="text"
                                className="input input-xs w-full h-full bg-transparent focus:outline-none border-2 focus:border-gray-400 text-center"
                                value={image}
                                onClick={changeImage}
                                onChange={changeImage}
                                placeholder='image url'
                            />
                        </button> */}
                    </div>
                </div>
            </div>

            {/* view 파트 */}
            {/* transition-transform duration-500 */}
            {/* transform: `translateY(${boxTranslateY}px)` */}
            <div id="view" className='w-full h-full flex items-center justify-center overflow-scroll'>
            </div>
        </>
    );
}

export default test;