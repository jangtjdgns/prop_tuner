// Hyphens.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../utils/handleOptionToggle';
import { copyCss } from '../../../utils/clipboardUtils';
import { useElementOverflowAdjustment } from '../../../hooks/useElementOverflowAdjustment ';

const Hyphens: React.FC = () => {
    type HyphensType = 'none' | 'manual' | 'auto';
    const [hyphens, setHyphens] = useState<HyphensType>('none');
    const hyphensValues: string[] = ['none', 'manual', 'auto'];

    const [boxTranslateY, setBoxTranslateY] = useState(0);

    const dependencies = [hyphens];
    useElementOverflowAdjustment(['#hyphens'], () => 0, setBoxTranslateY, dependencies);


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
                        <div className='text-center pt-2 font-bold text-lg'>Hyphens</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll'>
                        {/* hyphens */}
                        <div className='text-center p-0.5 text-xs'>
                            hyphens:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-24 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={hyphens}
                                readOnly
                            />
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('hyphens', hyphens)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        <div className='grid grid-cols-3 gap-2'>
                            {hyphensValues.map((value, index) => (
                                <input
                                    key={index}
                                    type='radio'
                                    name='hyphens'
                                    className="btn"
                                    aria-label={value}
                                    value={value}
                                    checked={hyphens === value}
                                    onChange={() => setHyphens(value as HyphensType)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* view 파트 */}
            <div id="view" className='w-full h-full flex items-center justify-center overflow-scroll'>
                <div id='hyphens'
                    className='w-[150px] h-[500px] bg-blue-50 shadow font-mono text-2xl p-2 transition-transform duration-500 text-left overflow-scroll'
                    style={{
                        transform: `translateY(${boxTranslateY}px)`,
                        hyphens
                    }}
                >
                    <p>The magnificently shimmering ocean reflects the unquestionable beauty of the endless horizon.</p>
                    <p>The incomprehensibly vast universe holds infinite possibilities, each star a testament to the beauty of existence.</p>
                </div>
            </div>
        </>
    );
}

export default Hyphens;