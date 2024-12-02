// FlexWrap.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../utils/handleOptionToggle';
import { copyCss } from '../../../utils/clipboardUtils';
import { addBoxes } from '../../../utils/commonElements';
import { useOverflowHandler } from '../../../hooks/useOverflowHandler';

const FlexWrap: React.FC = () => {
    type FlexWrapType = 'nowrap' | 'wrap' | 'wrap-reverse';
    const [flexWrap, setFlexWrap] = useState<FlexWrapType>('nowrap');
    const flexWrapValues = ['nowrap', 'wrap', 'wrap-reverse'];

    const [boxTranslateY, setBoxTranslateY] = useState(0);

    useOverflowHandler(['#flex-wrap'], () => 0, setBoxTranslateY, [flexWrap]);


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
                        <div className='text-center pt-2 font-bold text-lg'>Flex Wrap</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div id='option-wrap-bottom' className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll px-2'>
                        {/* 제목 */}
                        <div className='text-center p-0.5 text-xs'>
                            flex-wrap:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-28 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={flexWrap}
                                readOnly
                            />
                            {/* 속성 복사 */}
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('flex-wrap', flexWrap)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        {/* flex-wrap */}
                        <div className='grid grid-cols-3 gap-2'>
                            {flexWrapValues.map((value, index) => (
                                <input
                                    key={index}
                                    type='radio'
                                    name='flexWrap'
                                    className="btn"
                                    aria-label={value}
                                    checked={flexWrap === value}
                                    onChange={() => setFlexWrap(value as FlexWrapType)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* view 파트 */}
            <div id="view" className='w-full h-full flex items-center justify-center overflow-scroll'>
                <div id='flex-wrap' className='flex w-[500px] h-[500px] bg-blue-50 shadow transition-transform duration-300'
                    style={{
                        flexWrap,
                        transform: `translateY(${boxTranslateY}px)`
                    }}
                >
                    {addBoxes(7, { width: 100, height: 100 })}
                </div>
            </div>
        </>
    );
}

export default FlexWrap;