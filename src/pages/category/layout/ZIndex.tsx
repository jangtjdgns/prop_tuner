// ZIndex.tsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../utils/handleOptionToggle';
import { copyCss } from '../../../utils/clipboardUtils';
import { addBoxes } from '../../../utils/commonElements';
import { useOverflowHandler } from '../../../hooks/useOverflowHandler';

const ZIndex: React.FC = () => {
    const [zIndexValues, setZIndexValues] = useState(Array(4).fill(0));
    const [lastZIndexValue, setLastZIndexValue] = useState(0);          // 마지막으로 변경한 box의 z-index 저장용
    const [boxTranslateY, setBoxTranslateY] = useState(0);

    const boxesStyle: React.CSSProperties[] = [
        { zIndex: zIndexValues[0], transform: 'translate(-40%, -40%)' },
        { zIndex: zIndexValues[1], transform: 'translate(40%, -40%)' },
        { zIndex: zIndexValues[2], transform: 'translate(-40%, 40%)' },
        { zIndex: zIndexValues[3], transform: 'translate(40%, 40%)' },
    ];

    // z-index 업데이트
    const updateZIndex = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const value = inputValue === '' || isNaN(Number(inputValue)) ? 0 : Number(inputValue);

        const updateValues = [...zIndexValues];
        updateValues[index] = zIndexValues[index] = value;
        setLastZIndexValue(value);
        setZIndexValues(updateValues);
    }

    useOverflowHandler(['#z-index'], () => 0, setBoxTranslateY, [zIndexValues, lastZIndexValue]);

    return (
        <>
            <div id='option-wrap' className='absolute top-10 left-6 transition-transform duration-500 z-[1000]'>
                <div className='w-72 flex flex-col gap-2 shadow rounded-xl p-2 bg-white border border-gray-200 hover:shadow-2xl hover:border-gray-300 transition-all duration-200'>
                    <label id="option-toggle-btn"
                        className="swap absolute top-2 right-2 btn btn-xs btn-circle"
                    >
                        <input type="checkbox" onClick={(event) => handleOptionToggle(event)} />
                        <div className="swap-on"><FontAwesomeIcon icon={faPlus} /></div>
                        <div className="swap-off"><FontAwesomeIcon icon={faMinus} /></div>
                    </label>

                    {/* 옵션 내용 상단 */}
                    <div className='flex flex-col gap-2'>
                        <div className='text-center pt-2 font-bold text-lg'>Z Index</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div id='option-wrap-bottom' className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll px-2'>
                        {/* ZIndex */}
                        <div className='text-center p-0.5 text-xs'>
                            z-index:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={lastZIndexValue}
                                readOnly
                            />
                            {/* z-index 복사 */}
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('z-index', lastZIndexValue)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        <div className='grid grid-cols-2 gap-2'>
                            {zIndexValues.map((value, index) => (
                                <div key={index} className='grid grid-cols-2 gap-2 items-center text-center'>
                                    <div className='font-bold'>Box{index + 1}</div>
                                    <input
                                        type='text'
                                        name='zIndex'
                                        className="btn border-2 focus:border-gray-400"
                                        value={value}
                                        onChange={(event) => updateZIndex(index, event)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* view 파트 */}
            <div id="view" className='w-full h-full flex items-center justify-center'>
                <div id='z-index' className='w-full h-full flex items-center justify-center relative transition-transform duration-300'
                    style={{ transform: `translateY(${boxTranslateY}px)` }}
                >
                    {
                        addBoxes(4, { width: 200, height: 200 }, 'absolute', boxesStyle, true)
                    }
                </div>
            </div>
        </>
    );
}

export default ZIndex;