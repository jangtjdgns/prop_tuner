// OverflowWrap.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../utils/handleOptionToggle';
import { copyCss } from '../../../utils/clipboardUtils';
import { useElementOverflowAdjustment } from '../../../hooks/useElementOverflowAdjustment ';

const OverflowWrap: React.FC = () => {
    type OverflowWrapValues = 'normal' | 'break-word' | 'anywhere';
    const [overflowWrap, setOverflowWrap] = useState<OverflowWrapValues>('normal');
    const overflowWrapValues: string[] = ['normal', 'break-word', 'anywhere'];

    const [boxTranslateY, setBoxTranslateY] = useState(0);

    // update overflow-wrap
    const updateOverflowWrap = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setOverflowWrap(inputValue as OverflowWrapValues);
    }

    const dependencies = [overflowWrap];
    useElementOverflowAdjustment(['#overflow-wrap'], () => 0, setBoxTranslateY, dependencies, { widthPadding: 0, heightPadding: 20 });


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
                        <div className='text-center pt-2 font-bold text-lg'>Overflow Wrap</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll'>
                        {/* overflow-wrap */}
                        <div className='text-center p-0.5 text-xs'>
                            overflow-wrap:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-24 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={overflowWrap}
                                readOnly
                            />
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('overflow-wrap', overflowWrap)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        <div className='grid grid-cols-3 gap-2'>
                            {overflowWrapValues.map((value, index) => (
                                <input
                                    key={index}
                                    type='radio'
                                    name='overflowWrap'
                                    className="btn"
                                    aria-label={value}
                                    value={value}
                                    checked={overflowWrap === value}
                                    onChange={updateOverflowWrap}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* view 파트 */}
            <div id="view" className='w-full h-full flex items-center justify-center overflow-scroll'>
                <div id='overflow-wrap' className='w-min max-w-[500px] min-h-[400px] bg-blue-50 shadow p-2 font-mono text-2xl transition-transform duration-500 '
                    style={{
                        transform: `translateY(${boxTranslateY}px)`
                    }}
                >
                    <p style={{ overflowWrap }}>
                        In the whirlwind of dreams, where serendipity dances with the echoes of time, the heart finds its rhythm.
                        Through the intertwining shadows of the night, whispers of eternity linger, painting the world in hues of mystery.
                    </p>
                </div>
            </div>
        </>
    );
}

export default OverflowWrap;