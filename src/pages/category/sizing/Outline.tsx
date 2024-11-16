// Outline.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../utils/handleOptionToggle';
import { copyCss } from '../../../utils/clipboardUtils';
import { hexToRgba } from '../../../utils/colorUtils';
import { useElementOverflowAdjustment } from '../../../hooks/useElementOverflowAdjustment ';

const Outline: React.FC = () => {
    const [outlineWidth, setOutlineWidth] = useState(50);
    const [outlineStyle, setOutlineStyle] = useState('solid');
    const outlineStyleValues: string[] = ['none', 'solid', ' dotted', 'dashed', 'double', 'groove', 'ridge', 'inset', 'outset']
    const [outlineOffset, setOutlineOffset] = useState(0);
    const [outlineColor, setOutlineColor] = useState('#818CF8');
    const [outlineOpacity, setOutlineOpacity] = useState(1);
    const [boxTranslateY, setBoxTranslateY] = useState(0);

    const updateOutlineWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const value = inputValue === '' || isNaN(Number(inputValue)) ? 50 : Number(inputValue);
        setOutlineWidth(value);
    }

    const updateOutlineStyle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setOutlineStyle(inputValue);
    }

    const updateOutlineColor = (event: React.ChangeEvent<HTMLInputElement>) => {
        const color = event.target.value;
        setOutlineColor(color);
    }

    // 투명도, offset 활성화
    const activateOpacity = (elementId: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        const activateBtn = target.checked;
        const elementWrap = document.querySelector(elementId) as HTMLElement;

        elementWrap.classList.toggle('hidden');

        if (!activateBtn) {
            elementId === '#opacity-wrap' ? setOutlineOpacity(1) : setOutlineOffset(0);
        }
    }

    // 투명도 업데이트
    const updateOpacity = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const value = inputValue === '' || isNaN(Number(inputValue)) ? 1 : Number(inputValue);
        setOutlineOpacity(value);
    }

    // offset 업데이트
    const updateOutlineOffset = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const value = inputValue === '' || isNaN(Number(inputValue)) ? 0 : Number(inputValue);
        setOutlineOffset(value);
    }

    const dependencies = [outlineWidth, outlineStyle, outlineColor, outlineOpacity, outlineOffset];
    useElementOverflowAdjustment(['#outline'], () => 0, setBoxTranslateY, dependencies);


    return (
        <>
            <div id='option-wrap' className='absolute top-10 left-6 transition-transform duration-500 z-[1000]'>
                <div className='w-72 flex flex-col gap-2 shadow rounded-xl p-2 bg-white outline outline-gray-200 hover:shadow-2xl hover:outline-gray-300 transition-all duration-500'>
                    <label id="option-toggle-btn"
                        className="swap absolute top-2 right-2 btn btn-xs btn-circle z-10"
                    >
                        <input type="checkbox" onClick={(event) => handleOptionToggle(event)} />
                        <div className="swap-on"><FontAwesomeIcon icon={faPlus} /></div>
                        <div className="swap-off"><FontAwesomeIcon icon={faMinus} /></div>
                    </label>

                    {/* 옵션 내용 상단 */}
                    <div className='relative flex flex-col gap-2'>
                        <div className='text-center pt-2 font-bold text-lg'>outline</div>
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
                                        <p>Not included in the element's size.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll'>
                        {/* outline-width */}
                        <div className='text-center p-0.5 text-xs'>
                            outline-width:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={outlineWidth}
                                readOnly
                            />
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('outline-width', outlineWidth, 'px')}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>
                        <div className='grid'>
                            <button className="btn p-0">
                                <input type="text"
                                    className="input input-xs w-full h-full bg-transparent focus:outline-none outline-2 focus:border-gray-400 text-center"
                                    onChange={updateOutlineWidth}
                                    value={outlineWidth}
                                />
                            </button>
                        </div>

                        {/* outline-style */}
                        <div className='text-center p-0.5 text-xs'>
                            outline-style:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={outlineStyle}
                                readOnly
                            />
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('outline-style', outlineStyle)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>
                        {/* outline-style 값 */}
                        <div className='grid grid-cols-2 gap-2'>
                            {outlineStyleValues.map((value, index) => (
                                <input key={index} type="radio" name='outlineStyle'
                                    className="btn w-full h-full text-center"
                                    aria-label={value}
                                    value={value}
                                    onChange={updateOutlineStyle}
                                    checked={outlineStyle === value}
                                />
                            ))}
                        </div>

                        {/* outline-color */}
                        <div className='text-center p-0.5 text-xs'>
                            outline-color:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={outlineColor}
                                readOnly
                            />
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2'
                                onClick={() => copyCss('outline-color', outlineColor)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>
                        <div className='grid grid-cols-3 gap-2'>
                            <input type="color" className="col-start-1 col-end-2 btn p-0 w-full"
                                value={outlineColor}
                                onChange={updateOutlineColor}
                            />
                            <input type="text" className="col-start-2 col-end-4 btn focus:outline-none border-2 focus:border-gray-400"
                                value={outlineColor}
                                onChange={updateOutlineColor}
                                placeholder='Color'
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
                                value={outlineOpacity}
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

                        {/* outline-offset 활성화 버튼 */}
                        <div className='divider flex items-center justify-center text-xs'>
                            <span className='font-bold'>outline-offset</span>
                            <input type="checkbox"
                                id="toggle-offset"
                                className="toggle toggle-info toggle-sm"
                                onChange={(event) => activateOpacity('#offset-wrap', event)}
                            />
                        </div>

                        {/* outline-offset */}
                        <div id='offset-wrap' className='hidden'>
                            <div className='text-center p-0.5 pb-2 text-xs'>
                                outline-offset:
                                <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                    value={outlineOffset}
                                    readOnly
                                />
                                <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                    onClick={() => copyCss('outline-offset', outlineOffset, 'px')}
                                >
                                    <FontAwesomeIcon icon={faCopy} />
                                </button>
                            </div>
                            <div className='grid'>
                                <button className="btn p-0">
                                    <input type="text"
                                        className="input input-xs w-full h-full bg-transparent focus:outline-none border-2 focus:border-gray-400 text-center"
                                        onChange={updateOutlineOffset}
                                        value={outlineOffset}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* view 파트 */}
            <div id="view" className='w-full h-full flex flex-col items-center justify-center'>
                <div id='outline' className='min-w-[500px] min-h-[500px] bg-indigo-50 shadow transition-all duration-500'
                    style={{
                        outlineWidth,
                        outlineStyle,
                        outlineColor: `${hexToRgba(outlineColor, outlineOpacity)}`,
                        outlineOffset,
                        transform: `translateY(${boxTranslateY}px)`
                    }}
                ></div>
            </div>
        </>
    );
}

export default Outline;