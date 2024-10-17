// TextOverflow.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../../utils/handleOptionToggle';
import { copyCss } from '../../../../utils/clipboardUtils';
import { useElementOverflowAdjustment } from '../../../../hooks/useElementOverflowAdjustment ';

const TextOverflow: React.FC = () => {
    const [textOverflow, setTextOverflow] = useState('clip');
    const [customTextOverflow, setCustomTextOverflow] = useState('~');

    const [boxTranslateY, setBoxTranslateY] = useState(0);

    const updateTextOverflow = (event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>, isCustom: boolean = false) => {
        const target = event.target as HTMLInputElement;
        const inputValue = target.value;

        if (isCustom) {
            const value = inputValue === '' ? '~' : inputValue;
            setCustomTextOverflow(value);
        }
        setTextOverflow(inputValue);
    }

    const dependencies = [textOverflow, customTextOverflow];
    useElementOverflowAdjustment(['#text-overflow'], () => 0, setBoxTranslateY, dependencies);


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
                        <div className='text-center pt-2 font-bold text-lg'>Text Overflow</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll'>
                        {/* text-overflow */}
                        <div className='text-center p-0.5 text-xs'>
                            text-overflow:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={textOverflow === 'clip' || textOverflow === 'ellipsis' ? textOverflow : `"${customTextOverflow}"`}
                                readOnly
                            />
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('text-overflow', textOverflow === 'clip' || textOverflow === 'ellipsis' ? textOverflow : `"${customTextOverflow}"`)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>
                        {/* text-overflow 값 */}
                        <div className='grid grid-cols-2 gap-2'>
                            <input type='radio' name='textOverflow' className="btn" aria-label='clip' value='clip'
                                checked={textOverflow === 'clip'}
                                onChange={updateTextOverflow}
                            />
                            <input type='radio' name='textOverflow' className="btn" aria-label='ellipsis' value='ellipsis'
                                checked={textOverflow === 'ellipsis'}
                                onChange={updateTextOverflow}
                            />
                            {/* custom value */}
                            <button className="col-start-1 col-end-3 btn p-0 ">
                                <input
                                    type='text'
                                    className='input w-full h-full bg-transparent focus:outline-none border-2 focus:border-gray-400 text-center'
                                    onClick={(event) => updateTextOverflow(event, true)}
                                    onChange={(event) => updateTextOverflow(event, true)}
                                    value={customTextOverflow}
                                    placeholder='Custom Value'
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* view 파트 */}
            <div id="view" className='w-full h-full flex items-center justify-center overflow-scroll'>
                <div id='text-overflow' className='w-[500px] h-[50px] flex items-center bg-blue-50 shadow p-2 font-mono text-xl transition-transform duration-500'
                    style={{ transform: `translateY(${boxTranslateY}px)` }}
                >
                    <p className='overflow-hidden whitespace-nowrap'
                        style={{
                            textOverflow: textOverflow === 'clip' || textOverflow === 'ellipsis' ? textOverflow : `"${customTextOverflow}"`
                        }}
                    >
                        Aenean eu risus libero. Donec congue, massa sed ornare ultrices, est lorem finibus lorem, eu.
                    </p>
                </div>
            </div>
        </>
    );
}

export default TextOverflow;