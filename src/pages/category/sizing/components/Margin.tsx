// Margin.tsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../../utils/handleOptionToggle';
import { copyCss } from '../../../../utils/clipboardUtils';
import { useElementOverflowAdjustment } from '../../../../hooks/useElementOverflowAdjustment ';

const Margin: React.FC = () => {
    const [marginType, setMarginType] = useState(0);                // margin 타입, 0: all, 1: V&H, 2:Individual
    const [margin, setMargin] = useState(20);                       // 모든 방향 마진
    const [marginVertical, setMarginVertical] = useState(20);       // 수직 여백
    const [marginHorizontal, setMarginHorizontal] = useState(20);   // 수평 여백
    const [marginTop, setMarginTop] = useState(20);                 // 상단 여백
    const [marginRight, setMarginRight] = useState(20);             // 우측 여백
    const [marginBottom, setMarginBottom] = useState(20);           // 하단 여백
    const [marginLeft, setMarginLeft] = useState(20);               // 좌측 여백

    const [boxTranslateX, setBoxTranslateX] = useState(0);
    const [boxTranslateY, setBoxTranslateY] = useState(0);

    // 마진 방향 선택
    const handleMarginType = (event: React.MouseEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        const index = Number(target.value);

        const marginCopy = document.querySelectorAll('#margin-copy-body>.margin-copy');
        const marginValues = document.querySelectorAll('#margin-values-body>.margin-value');

        for (let i = 0; i < marginCopy.length; i++) {
            if (i === index) {
                marginCopy[i].classList.remove('hidden');
                marginValues[i].classList.remove('hidden');
                continue;
            }
            marginCopy[i].classList.add('hidden');
            marginValues[i].classList.add('hidden');
        }

        setMarginType(index);
    }

    // update 마진
    const updateMargin = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const value = inputValue === '' || isNaN(Number(inputValue)) ? 20 : Number(inputValue);
        setMargin(value);
    }

    // update V & H 마진
    const updateVHMargin = (dir: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const value = inputValue === '' || isNaN(Number(inputValue)) ? 20 : Number(inputValue);
        if (dir === 'V') {
            setMarginVertical(value);
        } else {
            setMarginHorizontal(value);
        }
    }

    // update Individual 마진
    const updateIndividualMargin = (dir: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const value = inputValue === '' || isNaN(Number(inputValue)) ? 20 : Number(inputValue);

        switch (dir) {
            case 'top':
                setMarginTop(value);
                break;
            case 'right':
                setMarginRight(value);
                break;
            case 'bottom':
                setMarginBottom(value);
                break;
            case 'left':
                setMarginLeft(value);
                break;
        }
    }

    useElementOverflowAdjustment(['#border-line'], setBoxTranslateX, setBoxTranslateY, [marginType, margin, marginVertical, marginHorizontal, marginTop, marginRight, marginBottom, marginLeft]);

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
                        <div className='text-center pt-2 font-bold text-lg'>Margin</div>
                        <div className='px-4 text-xs text-right font-bold'><span className='text-red-700'>*</span> Unit: px</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll'>
                        {/* margin copy body */}
                        <div id='margin-copy-body'>
                            {/* all */}
                            <div className='margin-copy text-center p-0.5 text-xs'>
                                margin:
                                <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                    value={margin}
                                    readOnly
                                />
                                <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                    onClick={() => copyCss('margin', margin, true)}
                                >
                                    <FontAwesomeIcon icon={faCopy} />
                                </button>
                            </div>

                            {/* vertical & horizontal */}
                            <div className='margin-copy text-center p-0.5 text-xs hidden'>
                                margin:
                                <input type="text" className='input input-xs mx-1 border-gray-200 w-24 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                    value={`${marginVertical} ${marginHorizontal}`}
                                    readOnly
                                />
                                <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                    onClick={() => copyCss('margin', `${marginVertical}px ${marginHorizontal}px`, false)}
                                >
                                    <FontAwesomeIcon icon={faCopy} />
                                </button>
                            </div>

                            {/* top, right, bottom, left */}
                            <div className='margin-copy text-center p-0.5 text-xs hidden'>
                                margin:
                                <input type="text" className='input input-xs mx-1 border-gray-200 w-36 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                    value={`${marginTop} ${marginRight} ${marginBottom} ${marginLeft}`}
                                    readOnly
                                />
                                <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                    onClick={() => copyCss('margin', `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`, false)}
                                >
                                    <FontAwesomeIcon icon={faCopy} />
                                </button>
                            </div>
                        </div>

                        {/* margin values body */}
                        <div id='margin-values-body'>
                            {/* all */}
                            <div className='margin-value grid'>
                                <input type='text' className="btn border-2 focus:border-gray-400 focus:outline-none"
                                    value={margin}
                                    onChange={updateMargin}
                                />
                            </div>

                            {/* vertical & horizontal */}
                            <div className='margin-value grid grid-cols-2 gap-2 items-center text-center hidden'>
                                <div className='font-bold text-sm'>vertical</div>
                                <input type='text' className="btn btn-sm border-2 focus:border-gray-400 focus:outline-none"
                                    value={marginVertical}
                                    onChange={(event) => updateVHMargin('V', event)}
                                />
                                <div className='font-bold text-sm'>horizontal</div>
                                <input type='text' className="btn btn-sm border-2 focus:border-gray-400 focus:outline-none"
                                    value={marginHorizontal}
                                    onChange={(event) => updateVHMargin('H', event)}
                                />
                            </div>

                            {/* top, right, bottom, left */}
                            <div className='margin-value grid grid-cols-4 gap-2 items-center text-center hidden'>
                                {/* top */}
                                <div className='font-bold text-xs'>top</div>
                                <input type='text' className="btn btn-sm border-2 focus:border-gray-400 focus:outline-none"
                                    value={marginTop}
                                    onChange={(event) => updateIndividualMargin('top', event)}
                                />
                                {/* right */}
                                <div className='font-bold text-xs'>right</div>
                                <input type='text' className="btn btn-sm border-2 focus:border-gray-400 focus:outline-none"
                                    value={marginRight}
                                    onChange={(event) => updateIndividualMargin('right', event)}
                                />
                                {/* bottom */}
                                <div className='font-bold text-xs'>bottom</div>
                                <input type='text' className="btn btn-sm border-2 focus:border-gray-400 focus:outline-none"
                                    value={marginBottom}
                                    onChange={(event) => updateIndividualMargin('bottom', event)}
                                />
                                {/* left */}
                                <div className='font-bold text-xs'>left</div>
                                <input type='text' className="btn btn-sm border-2 focus:border-gray-400 focus:outline-none"
                                    value={marginLeft}
                                    onChange={(event) => updateIndividualMargin('left', event)}
                                />
                            </div>
                        </div>

                        <div className="divider font-bold text-lg">Direction</div>
                        <div className='grid grid-cols-3 gap-2'>
                            <input type='radio' name='margin' className="btn" value='0' aria-label='All' onClick={handleMarginType} defaultChecked />
                            <input type='radio' name='margin' className="btn" value='1' aria-label='V & H' onClick={handleMarginType} />
                            <input type='radio' name='margin' className="btn" value='2' aria-label='Individual' onClick={handleMarginType} />
                        </div>
                    </div>
                </div>
            </div>

            {/* view 파트 */}
            <div id="view" className='w-full h-full flex items-center justify-center'>
                <div id='border-line' className='relative bg-indigo-300 border-2 border-indigo-600 trnasition-transform duration-500'
                    style={{
                        transform: `translate(${boxTranslateX}px, ${boxTranslateY}px)`
                    }}
                >
                    {marginType === 0 ? (
                        <>
                            <div className='absolute h-full text-white font-bold flex items-center'>
                                <div className='relative h-6 flex items-center transition-width duration-500'
                                    style={{ width: margin }}
                                >
                                    <span className='absolute w-full h-0.5 border-indigo-600 border-t-4 border-dashed'></span>
                                    <div className='absolute -left-12 w-12 text-center text-black select-none'>{margin}</div>
                                </div>
                            </div>
                            <div className='absolute right-0 h-full text-white font-bold flex items-center'>
                                <div className='relative h-6 flex items-center transition-width duration-500'
                                    style={{ width: margin }}
                                >
                                    <span className='absolute w-full h-0.5 border-indigo-600 border-t-4 border-dashed'></span>
                                    <div className='absolute -right-12 w-12 text-center text-black select-none'>{margin}</div>
                                </div>
                            </div>
                            <div className='absolute w-full text-white font-bold flex justify-center'>
                                <div className='relative w-6 flex justify-center transition-height duration-500'
                                    style={{ height: margin }}
                                >
                                    <span className='absolute w-0.5 h-full border-indigo-600 border-r-4 border-dashed'></span>
                                    <div className='absolute -top-8 text-center text-black select-none'>{margin}</div>
                                </div>
                            </div>
                            <div className='absolute bottom-0 w-full text-white font-bold flex justify-center'>
                                <div className='relative w-6 flex justify-center transition-height duration-500'
                                    style={{ height: margin }}
                                >
                                    <span className='absolute w-0.5 h-full border-indigo-600 border-r-4 border-dashed'></span>
                                    <div className='absolute -bottom-8 text-center text-black select-none'>{margin}</div>
                                </div>
                            </div>
                        </>
                    ) : (
                        marginType === 1 ? (
                            <>
                                <div className='absolute h-full text-white font-bold flex items-center'>
                                    <div className='relative h-6 flex items-center transition-width duration-500'
                                        style={{ width: marginHorizontal }}
                                    >
                                        <span className='absolute w-full h-0.5 border-indigo-600 border-t-4 border-dashed'></span>
                                        <div className='absolute -left-12 w-12 text-center text-black select-none'>{marginHorizontal}</div>
                                    </div>
                                </div>
                                <div className='absolute right-0 h-full text-white font-bold flex items-center'>
                                    <div className='relative h-6 flex items-center transition-width duration-500'
                                        style={{ width: marginHorizontal }}
                                    >
                                        <span className='absolute w-full h-0.5 border-indigo-600 border-t-4 border-dashed'></span>
                                        <div className='absolute -right-12 w-12 text-center text-black select-none'>{marginHorizontal}</div>
                                    </div>
                                </div>
                                <div className='absolute w-full text-white font-bold flex justify-center'>
                                    <div className='relative w-6 flex justify-center transition-height duration-500'
                                        style={{ height: marginVertical }}
                                    >
                                        <span className='absolute w-0.5 h-full border-indigo-600 border-r-4 border-dashed'></span>
                                        <div className='absolute -top-8 text-center text-black select-none'>{marginVertical}</div>
                                    </div>
                                </div>
                                <div className='absolute bottom-0 w-full text-white font-bold flex justify-center'>
                                    <div className='relative w-6 flex justify-center transition-height duration-500'
                                        style={{ height: marginVertical }}
                                    >
                                        <span className='absolute w-0.5 h-full border-indigo-600 border-r-4 border-dashed'></span>
                                        <div className='absolute -bottom-8 text-center text-black select-none'>{marginVertical}</div>
                                    </div>
                                </div>
                            </>
                        )
                            : <>
                                <div className='absolute h-full text-white font-bold flex items-center'>
                                    <div className='relative h-6 flex items-center transition-width duration-500'
                                        style={{ width: marginLeft }}
                                    >
                                        <span className='absolute w-full h-0.5 border-indigo-600 border-t-4 border-dashed'></span>
                                        <div className='absolute -left-12 w-12 text-center text-black select-none'>{marginLeft}</div>
                                    </div>
                                </div>
                                <div className='absolute right-0 h-full text-white font-bold flex items-center'>
                                    <div className='relative h-6 flex items-center transition-width duration-500'
                                        style={{ width: marginRight }}
                                    >
                                        <span className='absolute w-full h-0.5 border-indigo-600 border-t-4 border-dashed'></span>
                                        <div className='absolute -right-12 w-12 text-center text-black select-none'>{marginRight}</div>
                                    </div>
                                </div>
                                <div className='absolute w-full text-white font-bold flex justify-center'>
                                    <div className='relative w-6 flex justify-center transition-height duration-500'
                                        style={{ height: marginTop }}
                                    >
                                        <span className='absolute w-0.5 h-full border-indigo-600 border-r-4 border-dashed'></span>
                                        <div className='absolute -top-8 text-center text-black select-none'>{marginTop}</div>
                                    </div>
                                </div>
                                <div className='absolute bottom-0 w-full text-white font-bold flex justify-center'>
                                    <div className='relative w-6 flex justify-center transition-height duration-500'
                                        style={{ height: marginBottom }}
                                    >
                                        <span className='absolute w-0.5 h-full border-indigo-600 border-r-4 border-dashed'></span>
                                        <div className='absolute -bottom-8 text-center text-black select-none'>{marginBottom}</div>
                                    </div>
                                </div>
                            </>
                    )}

                    <div className='margin w-[400px] h-[400px] bg-indigo-200 transition-margin duration-500'
                        style={{
                            margin: marginType === 0 ?
                                margin : (
                                    marginType === 1 ?
                                        `${marginVertical}px ${marginHorizontal}px`
                                        : `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`
                                )
                        }}
                    ></div>
                </div>
            </div>
        </>
    );
}

export default Margin;