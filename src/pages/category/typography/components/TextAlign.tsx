// TextAlign.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../../utils/handleOptionToggle';
import { copyCss } from '../../../../utils/clipboardUtils';
import { useElementOverflowAdjustment } from '../../../../hooks/useElementOverflowAdjustment ';

const TextAlign: React.FC = () => {
    type TextAlignValues = 'start' | 'end' | 'center' | 'justify';
    const [textAlign, setTextAlign] = useState<TextAlignValues>('start');
    const textAlignValues: string[] = ['start', 'end', 'center', 'justify'];

    const [boxTranslateY, setBoxTranslateY] = useState(0);

    // update text-align
    const updateTextAlign = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        const inputValue = target.value;
        setTextAlign(inputValue as TextAlignValues);
    }

    const dependencies = [textAlign];
    useElementOverflowAdjustment(['#text-align'], () => 0, setBoxTranslateY, dependencies);


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
                        <div className='text-center pt-2 font-bold text-lg'>Text Align</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll'>
                        {/* text align */}
                        <div className='text-center p-0.5 text-xs'>
                            text-align:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={textAlign}
                                readOnly
                            />
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('text-align', textAlign)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        {/* text-align 값 */}
                        <div className='grid grid-cols-2 gap-2'>
                            {textAlignValues.map((value, index) => (
                                <input
                                    key={index}
                                    type='radio'
                                    name='textAlign'
                                    className="btn"
                                    aria-label={value}
                                    value={value}
                                    checked={textAlign === value}
                                    onChange={updateTextAlign}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* view 파트 */}
            <div id="view" className='w-full h-full flex items-center justify-center overflow-scroll'>
                <div id='text-align' className='text-lg transition-transform duration-500'
                    style={{ transform: `translateY(${boxTranslateY}px)` }}
                >
                    <p className='w-[700px] mx-auto font-mono'
                        style={{ textAlign }}
                    >
                        Duis euismod risus nec urna condimentum pharetra.
                        Nam maximus erat est, id fringilla lacus faucibus a.
                        Nullam in interdum enim, eget porta mauris.
                        Maecenas eget posuere tortor, fringilla convallis ante.
                        Duis eget porta lectus. Sed ullamcorper nisl justo, quis aliquam enim porta ut.
                        Cras cursus dolor blandit rutrum facilisis. Aliquam erat volutpat.
                        Proin laoreet libero non dolor faucibus, eu accumsan lacus sodales.
                        Maecenas libero nunc, dignissim at pharetra eu, semper et erat. Cras et cursus mauris.
                        Duis finibus elit id suscipit blandit. Nam euismod et metus sit amet elementum.
                        Etiam lobortis, sem vel imperdiet imperdiet, dui ipsum viverra risus, vel semper libero tellus a nunc.
                    </p>
                </div>
            </div>
        </>
    );
}

export default TextAlign;