// MinHeight.tsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../../utils/handleOptionToggle';
import { copyCss } from '../../../../utils/clipboardUtils';
import { useElementOverflowAdjustment } from '../../../../hooks/useElementOverflowAdjustment ';

const MinHeight: React.FC = () => {
    const [minHeight, setMinHeight] = useState(400);
    const [boxHeight, setBoxheight] = useState(400);
    const [boxTranslateY, setBoxTranslateY] = useState(0);

    // update 높이
    const updateHeight = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const value = inputValue === '' || isNaN(Number(inputValue)) ? 400 : Number(inputValue);
        setMinHeight(value);
    }

    // update 상자 높이
    const updateBoxHeight = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const value = inputValue === '' || isNaN(Number(inputValue)) ? 400 : Number(inputValue);
        setBoxheight(value);
    }

    useElementOverflowAdjustment(['min-height', '#box-height'], () => 0, setBoxTranslateY, [minHeight, boxHeight]);



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
                        <div className='text-center pt-2 font-bold text-lg'>Min Height</div>
                        <div className='px-4 text-xs text-right font-bold'><span className='text-red-700'>*</span> Unit: px</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll'>
                        {/* min-height */}
                        <div className='text-center p-0.5 text-xs'>
                            min-height:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={minHeight}
                                readOnly
                            />
                            {/* 속성 복사 */}
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('min-height', minHeight, true)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        {/* min-height 값 */}
                        <div className='grid'>
                            <input type="text" className="btn border-2 focus:border-gray-400"
                                value={minHeight}
                                onChange={updateHeight}
                            />
                        </div>

                        {/* 상자 height 값 */}
                        <div className="divider font-bold text-lg">Box Height</div>
                        <div className='grid'>
                            <input type="text" className="btn border-2 focus:border-gray-400"
                                value={boxHeight}
                                onChange={updateBoxHeight}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* view 파트 */}
            <div id="view" className='w-full h-full flex items-center justify-center gap-2 overflow-scroll font-mono'>
                <div id='min-height' className='relative w-8 transition-width duration-300 text-white font-bold flex items-center justify-center'
                    style={{
                        height: minHeight,
                        transform: `translateY(${boxTranslateY}px)`,
                    }}
                >
                    <span className='w-full h-full border-black border-t-2 border-b-2'></span>
                    <span className='absolute w-0.5 h-full bg-black'></span>
                    <div className='absolute -left-12 w-12 text-center text-black select-none'>{minHeight}px</div>
                </div>

                <div id='box-height' className='w-[200px] trnasition-width duration-300 text-4xl text-white font-bold font-bold flex items-center justify-center whitespace-nowrap select-none'
                    style={{
                        height: boxHeight,
                        minHeight,
                        backgroundImage: 'linear-gradient(to bottom, #00dbde 0%, #fc00ff 100%)',
                        transform: `translateY(${boxTranslateY}px)`,
                    }}
                >{boxHeight}px</div>

                <div className='relative w-8 transition-width duration-300 text-white font-bold flex items-center justify-center'
                    style={{
                        height: boxHeight,
                        minHeight,
                        transform: `translateY(${boxTranslateY}px)`,
                    }}
                >
                    <span className='w-full h-full border-black border-t-2 border-b-2'></span>
                    <span className='absolute w-0.5 h-full bg-black'></span>
                    <div className='absolute -right-12 w-12 text-center text-black select-none'>{boxHeight}px</div>
                </div>
            </div>
        </>
    );
}

export default MinHeight;