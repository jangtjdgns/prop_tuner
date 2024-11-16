// Direction.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../utils/handleOptionToggle';
import { copyCss } from '../../../utils/clipboardUtils';
import { useElementOverflowAdjustment } from '../../../hooks/useElementOverflowAdjustment ';

const Direction: React.FC = () => {
    const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');

    const [boxTranslateY, setBoxTranslateY] = useState(0);

    // update direction
    const updateDirection = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setDirection(inputValue as 'ltr' | 'rtl');
    }

    const dependencies = [direction];
    useElementOverflowAdjustment(['#direction'], () => 0, setBoxTranslateY, dependencies);


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
                        <div className='text-center pt-2 font-bold text-lg'>Direction</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll'>
                        {/* direction */}
                        <div className='text-center p-0.5 text-xs'>
                            direction:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={direction}
                                readOnly
                            />
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('direction', direction)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        <div className='grid grid-cols-2 gap-2'>
                            <input type='radio' name='direction' className="btn" aria-label='ltr' value='ltr'
                                checked={direction === 'ltr'}
                                onChange={updateDirection}
                            />
                            <input type='radio' name='direction' className="btn" aria-label='rtl' value='rtl'
                                checked={direction === 'rtl'}
                                onChange={updateDirection}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* view 파트 */}
            <div id="view" className='w-full h-full flex items-center justify-center overflow-scroll'>
                <div id='direction' className='w-[800px] min-h-[100px] bg-blue-50 shadow font-mono text-3xl p-4 transition-transform duration-500'
                    style={{
                        direction,
                        transform: `translateY(${boxTranslateY}px)`
                    }}
                >
                    <p>Beneath the moon’s silver glow, shadows dance in whispered flow. Time bends and folds, as rivers of thought gently unfold.</p>
                </div>
            </div>
        </>
    );
}

export default Direction;