// TransformOrigin.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../utils/handleOptionToggle';
import { copyCss } from '../../../utils/clipboardUtils';

const TransfromOrigin: React.FC = () => {
    const [originX, setOriginX] = useState(50);
    const [originY, setOriginY] = useState(50);

    const [rotate, setRotate] = useState(0);
    const [rotateDeg, setRotateDeg] = useState(0);
    const [showBorderLine, setShowBorderLine] = useState(false);


    // transform-origin 업데이트
    const updateOrigin = (pos: string, inputValue: number) => {
        pos === 'x' ? setOriginX(inputValue) : setOriginY(inputValue);
    }

    // update rotate
    const updateRotate = (inputValue: number) => {
        const rangeValue = Math.max(-1, Math.min(1, inputValue));     // 범위 제한 -1 ~ +1
        setRotate(rangeValue);
        setRotateDeg(parseFloat((360 * rangeValue).toFixed(2)));
    }


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
                        <div className='text-center pt-2 font-bold text-lg'>Transform Origin</div>
                        <div className='px-4 text-xs text-right font-bold'><span className='text-red-700'>*</span> Unit: %</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div id='option-wrap-bottom' className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll px-2'>
                        <div className='text-center p-0.5 text-xs'>
                            transform-origin:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={`${originX}% ${originY}%`}
                                readOnly
                            />
                            {/* 속성 복사 */}
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('transform-origin', `${originX}% ${originY}%`)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        {/* origin X, Y */}
                        <div className="divider font-bold text-lg">Origin</div>
                        <div className='grid grid-cols-2 items-center text-center gap-2'>
                            <div className='font-bold text-sm'>Origin X</div>
                            <input type='number' className='btn btn-sm border-2 focus:border-gray-400 focus:outline-none'
                                value={originX}
                                style={{ MozAppearance: 'textfield' }}
                                onChange={(e) => updateOrigin('x', Number(e.target.value))}
                            />
                            <div className='font-bold text-sm'>Origin Y</div>
                            <input type='number' className='btn btn-sm border-2 focus:border-gray-400 focus:outline-none'
                                value={originY}
                                style={{ MozAppearance: 'textfield' }}
                                onChange={(e) => updateOrigin('y', Number(e.target.value))}
                            />
                        </div>

                        {/* rotate */}
                        <div className="divider font-bold text-lg">Rotate</div>
                        <div className='grid grid-cols-2 items-center text-center gap-2'>
                            <div className='col-start-1 col-end-3 flex items-center justify-end gap-2 font-bold text-xs px-2'>
                                <div><span className='text-red-500'>*</span> border-line</div>
                                <input type="checkbox" className="checkbox checkbox-info checkbox-xs"
                                    checked={showBorderLine}
                                    onChange={() => setShowBorderLine(!showBorderLine)}
                                />
                            </div>

                            <div className='col-start-1 col-end-3 grid grid-cols-2 gap-2 items-center text-center'>
                                <div className='font-bold text-sm'>Rotate</div>
                                <input type='number' className='btn btn-sm border-2 focus:border-gray-400 focus:outline-none' min={-1} max={1}
                                    value={rotate}
                                    style={{ MozAppearance: 'textfield' }}  // 화살표 제거
                                    onChange={(e) => updateRotate(Number(e.target.value))}
                                />
                            </div>

                            <input type="range" min={-1} max="1" className="col-start-1 col-end-3 range range-xs" step="0.1"
                                value={rotate}
                                onChange={(e) => updateRotate(Number(e.target.value))}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* view 파트 */}
            <div id="view" className='w-full h-full flex items-center justify-center overflow-scroll'>
                <div id='transform' className='relative w-[200px] h-[200px] transition-transformOrigin duration-500'
                    style={{
                        backgroundImage: 'linear-gradient(125deg, #00dbde 0%, #fc00ff 100%)',
                        transformOrigin: `${originX}% ${originY}%`,
                        transform: `rotate(${rotate}turn)`,
                    }}
                >
                    <div className='absolute top-0 left-0 w-1 h-1 ring-black ring-2 rounded-full bg-black -translate-x-1/2 -translate-y-1/2 transition-top transition-left duration-500'
                        style={{
                            left: `${originX}%`,
                            top: `${originY}%`,
                        }}
                    ></div>
                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[200px] w-[1px] h-[200px] bg-black transition-top transition-left duration-500'
                        style={{
                            left: `${originX}%`,
                            top: `${originY}%`,
                        }}
                    >
                        <div className='relative font-bold text-lg'>
                            <div className='absolute -translate-y-10 -translate-x-1/2'>{rotateDeg}deg</div>
                        </div>
                    </div>
                    {
                        showBorderLine ? (
                            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-black rounded-full transition-top transition-left duration-500'
                                style={{
                                    left: `${originX}%`,
                                    top: `${originY}%`,
                                }}
                            ></div>
                        ) : null
                    }
                </div>
            </div>
        </>
    );
}

export default TransfromOrigin;