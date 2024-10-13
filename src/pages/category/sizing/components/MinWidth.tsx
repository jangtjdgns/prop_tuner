// MinWidth.tsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../../utils/handleOptionToggle';
import { copyCss } from '../../../../utils/clipboardUtils';
import { useElementOverflowAdjustment } from '../../../../hooks/useElementOverflowAdjustment ';

const Width: React.FC = () => {
    const [minWidth, setMinWidth] = useState(800);
    const [boxWidth, setBoxWidth] = useState(800);
    const [boxTranslateX, setBoxTranslateX] = useState(0);

    // update MinWidth
    const updateMinWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const value = inputValue === '' || isNaN(Number(inputValue)) ? 800 : Number(inputValue);
        setMinWidth(value);
    }

    // update 상자 너비
    const updateBoxWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const value = inputValue === '' || isNaN(Number(inputValue)) ? 800 : Number(inputValue);
        setBoxWidth(value);
    }

    useElementOverflowAdjustment(['#min-width', '#box-width'], setBoxTranslateX, () => 0, [minWidth, boxWidth]);


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
                        <div className='text-center pt-2 font-bold text-lg'>Min Width</div>
                        <div className='px-4 text-xs text-right font-bold'><span className='text-red-700'>*</span> Unit: px</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll'>
                        {/* min-width */}
                        <div className='text-center p-0.5 text-xs'>
                            min-width:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={minWidth}
                                readOnly
                            />
                            {/* 속성 복사 */}
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('min-width', minWidth, true)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        {/* min-width 값 */}
                        <div className='grid'>
                            <input type="text" className="btn border-2 focus:border-gray-400"
                                value={minWidth}
                                onChange={updateMinWidth}
                            />
                        </div>

                        {/* 상자 width 값 */}
                        <div className="divider font-bold text-lg">Box Width</div>
                        <div className='grid'>
                            <input type="text" className="btn border-2 focus:border-gray-400"
                                value={boxWidth}
                                onChange={updateBoxWidth}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* view 파트 */}
            <div id="view" className='w-full h-full flex flex-col items-center justify-center gap-2 overflow-scroll font-mono'>
                <div id='min-width' className='relative h-8 transition-width duration-300 text-white font-bold flex items-center justify-center'
                    style={{
                        width: minWidth,
                        transform: `translateX(${boxTranslateX}px)`,
                    }}
                >
                    <span className='w-full h-full border-black border-l-2 border-r-2'></span>
                    <span className='absolute w-full h-0.5 bg-black'></span>
                    <div className='absolute bottom-8 w-12 text-center text-black select-none'>{minWidth}px</div>
                </div>

                <div id='box-width' className='h-[200px] trnasition-width duration-300 text-4xl text-white font-bold font-bold flex items-center justify-center whitespace-nowrap select-none'
                    style={{
                        width: boxWidth,
                        minWidth,
                        backgroundImage: 'linear-gradient(to right, #00dbde 0%, #fc00ff 100%)',
                        transform: `translateX(${boxTranslateX}px)`,
                    }}
                >{boxWidth}px</div>

                <div className='relative h-8 transition-width duration-300 text-white font-bold flex items-center justify-center'
                    style={{
                        width: boxWidth,
                        minWidth,
                        transform: `translateX(${boxTranslateX}px)`,
                    }}
                >
                    <span className='w-full h-full border-black border-l-2 border-r-2'></span>
                    <span className='absolute w-full h-0.5 bg-black'></span>
                    <div className='absolute top-8 w-12 text-center text-black select-none'>{boxWidth}px</div>
                </div>
            </div>
        </>
    );
}

export default Width;