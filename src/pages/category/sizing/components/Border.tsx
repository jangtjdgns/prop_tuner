// Border.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../../utils/handleOptionToggle';
import { copyCss } from '../../../../utils/clipboardUtils';
import { hexToRgba } from '../../../../utils/colorUtils';
import { useElementOverflowAdjustment } from '../../../../hooks/useElementOverflowAdjustment ';

const Border: React.FC = () => {
    const [borderWidth, setBorderWidth] = useState(50);
    const [borderStyle, setBorderStyle] = useState('solid');
    const borderStyleValues: string[] = ['none', 'hidden', 'solid', ' dotted', 'dashed', 'double', 'groove', 'ridge', 'inset', 'outset']
    const [borderRadius, setBorderRadius] = useState(0);
    const [borderColor, setBorderColor] = useState('#818CF8');
    const [borderOpacity, setBorderOpacity] = useState(1);
    const [boxTranslateY, setBoxTranslateY] = useState(0);

    const updateBorderWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const value = inputValue === '' || isNaN(Number(inputValue)) ? 50 : Number(inputValue);
        setBorderWidth(value);
    }

    const updateBorderStyle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setBorderStyle(inputValue);
    }

    const updateBorderColor = (event: React.ChangeEvent<HTMLInputElement>) => {
        const color = event.target.value;
        setBorderColor(color);
    }

    // 투명도, radius 활성화
    const activateOpacity = (elementId: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        const activateBtn = target.checked;
        const elementWrap = document.querySelector(elementId) as HTMLElement;

        elementWrap.classList.toggle('hidden');

        if (!activateBtn) {
            elementId === '#opacity-wrap' ? setBorderOpacity(1) : setBorderRadius(0);
        }
    }

    // 투명도 업데이트
    const updateOpacity = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const value = inputValue === '' || isNaN(Number(inputValue)) ? 1 : Number(inputValue);
        setBorderOpacity(value);
    }

    // radius 업데이트
    const updateBorderRadius = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const value = inputValue === '' || isNaN(Number(inputValue)) ? 10 : Number(inputValue);
        setBorderRadius(value);
    }

    const dependencies = [borderWidth, borderStyle, borderColor, borderOpacity, borderRadius];
    useElementOverflowAdjustment(['#border'], () => 0, setBoxTranslateY, dependencies);

    return (
        <>
            <div id='option-wrap' className='absolute top-10 left-6 transition-transform duration-500 z-[1000]'>
                <div className='w-72 flex flex-col gap-2 shadow rounded-xl p-2 bg-white border border-gray-200 hover:shadow-2xl hover:border-gray-300 transition-all duration-500'>
                    <label id="option-toggle-btn"
                        className="swap absolute top-2 right-2 btn btn-xs btn-circle z-10"
                    >
                        <input type="checkbox" onClick={(event) => handleOptionToggle(event)} />
                        <div className="swap-on"><FontAwesomeIcon icon={faPlus} /></div>
                        <div className="swap-off"><FontAwesomeIcon icon={faMinus} /></div>
                    </label>

                    {/* 옵션 내용 상단 */}
                    <div className='relative flex flex-col gap-2'>
                        <div className='text-center pt-2 font-bold text-lg'>Border</div>
                        <div className='px-4 text-xs text-right font-bold'><span className='text-red-700'>*</span> Unit: px</div>
                        <div className='absolute top-0 left-0'>
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn btn-circle btn-ghost btn-xs text-info">
                                    <svg
                                        tabIndex={0}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        className="h-4 w-4 stroke-current">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <div
                                    tabIndex={0}
                                    className="card compact dropdown-content bg-base-100 rounded-box z-[1] w-64 shadow">
                                    <div tabIndex={0} className="card-body font-bold">
                                        <p>Included in the element's size.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll'>
                        {/* border-width */}
                        <div className='text-center p-0.5 text-xs'>
                            border-width:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={borderWidth}
                                readOnly
                            />
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('border-width', borderWidth, true)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>
                        <div className='grid'>
                            <button className="btn p-0">
                                <input type="text"
                                    className="input input-xs w-full h-full bg-transparent focus:outline-none border-2 focus:border-gray-400 text-center"
                                    onChange={updateBorderWidth}
                                    value={borderWidth}
                                />
                            </button>
                        </div>

                        {/* border-style */}
                        <div className='text-center p-0.5 text-xs'>
                            border-style:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={borderStyle}
                                readOnly
                            />
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('border-style', borderStyle, false)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>
                        {/* border-style 값 */}
                        <div className='grid grid-cols-2 gap-2'>
                            {borderStyleValues.map((value, index) => (
                                <input key={index} type="radio" name='borderStyle'
                                    className="btn w-full h-full text-center"
                                    aria-label={value}
                                    value={value}
                                    onChange={updateBorderStyle}
                                    checked={borderStyle === value}
                                />
                            ))}
                        </div>

                        {/* border-color */}
                        <div className='text-center p-0.5 text-xs'>
                            border-color:
                            <input type="text" className='input input-xs w-20 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={borderColor}
                                readOnly
                            />
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2'
                                onClick={() => copyCss('border-color', borderColor, false)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>
                        <div className='grid grid-cols-3 gap-2'>
                            <input type="color" className="col-start-1 col-end-2 btn p-0 w-full"
                                value={borderColor}
                                onChange={updateBorderColor}
                            />
                            <input type="text" className="col-start-2 col-end-4 btn focus:outline-none border-2 focus:border-gray-400"
                                value={borderColor}
                                onChange={updateBorderColor}
                                placeholder='border-color'
                            />
                        </div>

                        {/* opacity 활성화 버튼 */}
                        <div className='divider flex items-center justify-center text-xs'>
                            <span className='font-bold'>opacity</span>
                            <input type="checkbox"
                                id="toggle-opacity"
                                className="toggle toggle-info toggle-sm"
                                onChange={(event) => activateOpacity('#opacity-wrap', event)}
                            />
                        </div>

                        <div id='opacity-wrap' className='hidden'>
                            <input type="range" min={0} max="1" className="range range-sm" step="0.1"
                                value={borderOpacity}
                                onChange={updateOpacity}
                            />
                            <div className="flex w-full justify-between px-2 text-xs">
                                <span>0</span>
                                <span>0.1</span>
                                <span>0.2</span>
                                <span>0.3</span>
                                <span>0.4</span>
                                <span>0.5</span>
                                <span>0.6</span>
                                <span>0.7</span>
                                <span>0.8</span>
                                <span>0.9</span>
                                <span>1</span>
                            </div>
                        </div>

                        {/* border-radius 활성화 버튼 */}
                        <div className='divider flex items-center justify-center text-xs'>
                            <span className='font-bold'>border-radius</span>
                            <input type="checkbox"
                                id="toggle-radius"
                                className="toggle toggle-info toggle-sm"
                                onChange={(event) => activateOpacity('#radius-wrap', event)}
                            />
                        </div>

                        {/* border-radius */}
                        <div id='radius-wrap' className='hidden'>
                            <div className='text-center p-0.5 pb-2 text-xs'>
                                border-radius:
                                <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                    value={borderRadius}
                                    readOnly
                                />
                                <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                    onClick={() => copyCss('border-radius', borderRadius, false)}
                                >
                                    <FontAwesomeIcon icon={faCopy} />
                                </button>
                            </div>
                            <div className='grid'>
                                <button className="btn p-0">
                                    <input type="text"
                                        className="input input-xs w-full h-full bg-transparent focus:outline-none border-2 focus:border-gray-400 text-center"
                                        onChange={updateBorderRadius}
                                        value={borderRadius}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* view 파트 */}
            <div id="view" className='w-full h-full flex items-center justify-center'>
                <div id='border' className='min-w-[500px] min-h-[500px] bg-indigo-50 shadow transition-all duration-500'
                    style={{
                        borderWidth,
                        borderStyle,
                        borderColor: `${hexToRgba(borderColor, borderOpacity)}`,
                        borderRadius,
                        transform: `translateY(${boxTranslateY}px)`
                    }}
                ></div>
            </div>
        </>
    );
}

export default Border;