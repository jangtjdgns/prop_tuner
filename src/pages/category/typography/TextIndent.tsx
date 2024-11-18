// TextIndent.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../utils/handleOptionToggle';
import { copyCss } from '../../../utils/clipboardUtils';
import { useOverflowHandler } from '../../../hooks/useOverflowHandler';

const TextIndent: React.FC = () => {
    const [textIndent, setTextIndent] = useState(0);
    const [unit, setUnit] = useState('px');
    const unitValues: string[] = ['px', '%', 'em', 'rem'];

    const [boxTranslateY, setBoxTranslateY] = useState(0);

    // update text-indent
    const updateTextIndent = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const value = inputValue === '' || isNaN(Number(inputValue)) ? 0 : Number(inputValue);
        setTextIndent(value);
    }

    // update unit
    const updateUnit = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setUnit(inputValue);
    }

    const dependencies = [textIndent, unit];
    useOverflowHandler(['#text-indent'], () => 0, setBoxTranslateY, dependencies);


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
                        <div className='text-center pt-2 font-bold text-lg'>Text Indent</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div id='option-wrap-bottom' className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll px-2'>
                        {/* text indent */}
                        <div className='text-center p-0.5 text-xs'>
                            text-indent:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={`${textIndent}${unit}`}
                                readOnly
                            />
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('text-indent', `${textIndent}${unit}`)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        <div className='grid'>
                            <button className="btn p-0">
                                <input
                                    type='text'
                                    className='input w-full h-full bg-transparent focus:outline-none border-2 focus:border-gray-400 text-center'
                                    onChange={updateTextIndent}
                                    value={textIndent}
                                    placeholder='Custom Value'
                                />
                            </button>
                        </div>

                        {/* unit */}
                        <div className="divider font-bold text-lg">Unit</div>
                        <div className='grid grid-cols-4 gap-2'>
                            {unitValues.map((value, index) => (
                                <input
                                    key={index}
                                    type='radio'
                                    name='unit'
                                    className="btn"
                                    aria-label={value}
                                    value={value}
                                    checked={unit === value}
                                    onChange={updateUnit}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* view 파트 */}
            <div id="view" className='w-full h-full flex items-center justify-center overflow-scroll'>
                <div id='text-indent' className='w-[700px] text-lg bg-blue-50 shadow p-4 font-mono transition-transform duration-500'
                    style={{ transform: `translateY(${boxTranslateY}px)` }}
                >
                    <p className='mb-4' style={{ textIndent: `${textIndent}${unit}` }}>
                        Quisque et maximus odio, non mollis lectus.
                        Nullam malesuada efficitur odio, fermentum dapibus sem scelerisque tempor.
                        Donec imperdiet odio metus, vitae eleifend massa lacinia sed.
                        Proin egestas ligula ac tempor cursus.
                        Vivamus vitae mi malesuada, varius dolor a, pellentesque massa.
                        Sed mattis purus vel erat porttitor rutrum.
                        Proin scelerisque aliquam felis et semper.
                    </p>
                    <p style={{ textIndent: `${textIndent}${unit}` }}>
                        Cras vulputate at dolor vel pellentesque.
                        Proin imperdiet dignissim justo in dictum.
                        Nam a pharetra neque. Quisque non porttitor urna.
                        Ut fringilla, purus fermentum tincidunt fermentum, elit est facilisis nulla, a efficitur libero massa faucibus libero.
                        Pellentesque et iaculis mauris.
                        Donec rutrum urna et enim ullamcorper, eget ultricies ipsum viverra.
                    </p>
                </div>
            </div>
        </>
    );
}

export default TextIndent;