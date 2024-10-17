// Height.tsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../../utils/handleOptionToggle';
import { copyCss } from '../../../../utils/clipboardUtils';
import { useElementOverflowAdjustment } from '../../../../hooks/useElementOverflowAdjustment ';

const Height: React.FC = () => {
    type Units = 'px' | '%' | 'vw' | 'rem';
    const [height, setHeight] = useState(200);
    const [unit, setUnit] = useState<Units>('px');
    const unitValues = ['px', '%', 'vw', 'rem']
    const [boxTranslateY, setBoxTranslateY] = useState(0);

    // update 높이
    const updateHeight = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const value = inputValue === '' || isNaN(Number(inputValue)) ? 200 : Number(inputValue);
        setHeight(value);
    }

    // unit 업데이트 (단위 변경)
    const updateUnit = (value: Units) => {
        setUnit(value);
    }

    useElementOverflowAdjustment(['#height'], () => 0, setBoxTranslateY, [height, unit]);


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
                        <div className='text-center pt-2 font-bold text-lg'>Height</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll'>
                        {/*height */}
                        <div className='text-center p-0.5 text-xs'>
                            height:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={height}
                                readOnly
                            />
                            {/* 속성 복사 */}
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('height', height, unit)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        {/* height 값 */}
                        <div className='grid'>
                            <input type="text" className="btn border-2 focus:border-gray-400"
                                value={height}
                                onChange={updateHeight}
                            />
                        </div>

                        {/* unit */}
                        <div className="divider font-bold text-base">Unit</div>
                        <div className='grid grid-cols-4 gap-2'>
                            {unitValues.map((value, index) => (
                                <input key={index} type="radio" name='unit'
                                    className='btn border-2'
                                    aria-label={value}
                                    value={value}
                                    checked={unit === value}
                                    onChange={() => updateUnit(value as Units)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* view 파트 */}
            <div id="view" className='w-full h-full flex items-center justify-center gap-2 overflow-scroll font-mono'>
                <div className='relative w-8 transition-width duration-300 text-white font-bold flex items-center justify-center'
                    style={{
                        height: `${height}${unit}`,
                        transform: `translateY(${boxTranslateY}px)`,
                    }}
                >
                    <span className='w-full h-full border-black border-t-2 border-b-2'></span>
                    <span className='absolute w-0.5 h-full bg-black'></span>
                    <div className='absolute -left-12 w-12 text-center text-black select-none'>{height}{unit}</div>
                </div>

                <div id='height' className='w-[200px] transition-height duration-300'
                    style={{
                        height: `${height}${unit}`,
                        backgroundImage: 'linear-gradient(to bottom, #00dbde 0%, #fc00ff 100%)',
                        transform: `translateY(${boxTranslateY}px)`
                    }}
                ></div>
            </div>
        </>
    );
}

export default Height;