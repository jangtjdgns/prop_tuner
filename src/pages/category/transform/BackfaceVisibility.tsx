// BackfaceVisibility.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../utils/handleOptionToggle';
import { copyCss } from '../../../utils/clipboardUtils';

const BackfaceVisibility: React.FC = () => {
    // 이면 가시성 제어, hidden 숨기기, visible 보이기(기본값)
    const [backfaceVisibility, setBackfaceVisibility] = useState<'visible' | 'hidden'>('visible');

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
                        <div className='text-center pt-2 font-bold text-lg'>Backface Visibility</div>
                        <div className='px-4 text-xs text-right font-bold'><span className='text-red-700'>*</span> Hover over the element</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div id='option-wrap-bottom' className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll px-2'>
                        <div className='text-center p-0.5 text-xs'>
                            backface-visibility:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={backfaceVisibility}
                                readOnly
                            />
                            {/* 속성 복사 */}
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('backface-visibility', backfaceVisibility)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        {/* Backface Visibility */}
                        <div className='grid grid-cols-2 items-center text-center gap-2'>
                            <input type='radio' name='backface' className="btn" aria-label={'visible'}
                                checked={backfaceVisibility === 'visible'}
                                onChange={() => setBackfaceVisibility('visible')}
                            />
                            <input type='radio' name='backface' className="btn" aria-label={'hidden'}
                                checked={backfaceVisibility === 'hidden'}
                                onChange={() => setBackfaceVisibility('hidden')}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* view 파트 */}
            <div id="view" className='relative w-full h-full flex items-center justify-center overflow-scroll'>
                {/* container */}
                <div className='group'>
                    {/* card */}
                    <div className='relative box-1 w-[200px] h-[200px] group group-hover:[transform:rotateY(180deg)] transition-transform duration-1000'
                        style={{
                            transformStyle: 'preserve-3d',
                            perspective: '500px',
                        }}>
                        {/* front */}
                        <div className='absolute w-full h-full front bg-red-500 z-10 group-hover:[z-index:0]'
                            style={{ backfaceVisibility }}
                        ><div className='w-full h-full flex items-center justify-center text-3xl font-bold text-white'>FRONT</div></div>
                        {/* back */}
                        <div className='absolute w-full h-full back bg-blue-500 [transform:rotateY(180deg)]'
                            style={{ backfaceVisibility }}
                        ><div className='w-full h-full flex items-center justify-center text-3xl font-bold text-transparent group-hover:text-white'>BACK</div></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BackfaceVisibility;