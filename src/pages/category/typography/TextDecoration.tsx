// TextDecoration.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../utils/handleOptionToggle';
import { copyCss } from '../../../utils/clipboardUtils';
import { useElementOverflowAdjustment } from '../../../hooks/useElementOverflowAdjustment ';

const TextDecoration: React.FC = () => {
    // 1. text-decoration-thickness, default 1px
    const [textDecorationThickness, setTextDecorationThickness] = useState(1);
    // 2. text-decoration-line
    const [textDecorationLine, setTextDecorationLine] = useState('underline');
    const lineValues: string[] = ['none', 'underline', 'overline', 'line-through', 'blink'];
    // 3. text-decoration-style
    type TextDecorationStyle = 'solid' | 'double' | 'dotted' | 'dashed' | 'wavy';
    const [textDecorationStyle, setTextDecorationStyle] = useState<TextDecorationStyle>('solid');
    const styleValues: string[] = ['solid', 'double', 'dotted', 'dashed', 'wavy'];
    // 4. text-decoration-color
    const [textDecorationColor, setTextDecorationColor] = useState('#000000');

    const [boxTranslateY, setBoxTranslateY] = useState(0);

    // update text-decoration props
    const updateTextDecoration = (constituentProp: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;

        switch (constituentProp) {
            case 'thickness':
                const value = inputValue === '' || isNaN(Number(inputValue)) ? 1 : Number(inputValue);
                setTextDecorationThickness(value);
                break;
            case 'line': setTextDecorationLine(inputValue); break;
            case 'style': setTextDecorationStyle(inputValue as TextDecorationStyle); break;
            case 'color': setTextDecorationColor(inputValue); break;
        }
    }

    const dependencies = [textDecorationThickness, textDecorationLine, textDecorationStyle, textDecorationColor];
    useElementOverflowAdjustment(['#text-decoration'], () => 0, setBoxTranslateY, dependencies);


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
                        <div className='text-center pt-2 font-bold text-lg'>Text Decoration</div>
                        <div className='px-4 text-xs text-right font-bold'><span className='text-red-700'>*</span> Unit: px</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll'>
                        {/* 1. text decoration thickness*/}
                        <div className='text-center p-0.5 text-xs'>
                            text-decoration-thickness:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={textDecorationThickness}
                                readOnly
                            />
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('text-decoration-thickness', textDecorationThickness, 'px')}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>
                        <div className='grid'>
                            <button className="btn p-0">
                                <input
                                    type='text'
                                    className='input w-full h-full bg-transparent focus:outline-none border-2 focus:border-gray-400 text-center'
                                    onChange={(event) => updateTextDecoration('thickness', event)}
                                    value={textDecorationThickness}
                                    placeholder='Thickness'
                                />
                            </button>
                        </div>

                        {/* 2. text decoration line */}
                        <div className="divider font-bold text-lg"></div>
                        <div className='text-center p-0.5 text-xs'>
                            text-decoration-line:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-24 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={textDecorationLine}
                                readOnly
                            />
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('text-decoration-line', textDecorationLine)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>
                        {/* text-decoration-line values */}
                        <div className='grid grid-cols-3 gap-2'>
                            {lineValues.map((value, index) => (
                                <input
                                    key={index}
                                    type='radio'
                                    name='decorationLine'
                                    className='btn'
                                    aria-label={value}
                                    value={value}
                                    checked={textDecorationLine === value}
                                    onChange={(event) => updateTextDecoration('line', event)}
                                />
                            ))}
                        </div>

                        {/* 3. text decoration style */}
                        <div className="divider font-bold text-lg"></div>
                        <div className='text-center p-0.5 text-xs'>
                            text-decoration-style:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={textDecorationStyle}
                                readOnly
                            />
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('text-decoration-style', textDecorationStyle)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>
                        {/* text-decoration-style values */}
                        <div className='grid grid-cols-3 gap-2'>
                            {styleValues.map((value, index) => (
                                <input
                                    key={index}
                                    type='radio'
                                    name='decorationStyle'
                                    className='btn'
                                    aria-label={value}
                                    value={value}
                                    checked={textDecorationStyle === value}
                                    onChange={(event) => updateTextDecoration('style', event)}
                                />
                            ))}
                        </div>

                        {/* 4. text decoration color*/}
                        <div className="divider font-bold text-lg"></div>
                        <div className='text-center p-0.5 text-xs'>
                            text-decoration-color:
                            <input type="text" className='input input-xs w-20 outline-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={textDecorationColor}
                                readOnly
                            />
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2'
                                onClick={() => copyCss('text-decoration-color', textDecorationColor)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>
                        <div className='grid grid-cols-3 gap-2'>
                            <input type="color" className="col-start-1 col-end-2 btn p-0 w-full"
                                value={textDecorationColor}
                                onChange={(event) => updateTextDecoration('color', event)}
                            />
                            <input type="text" className="col-start-2 col-end-4 btn focus:outline-none outline-2 focus:border-gray-400"
                                value={textDecorationColor}
                                onChange={(event) => updateTextDecoration('color', event)}
                                placeholder='Color'
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* view 파트 */}
            <div id="view" className='w-full h-full flex items-center justify-center overflow-scroll'>
                <div id='text-decoration' className='w-[700px] text-lg bg-blue-50 shadow p-4 font-mono transition-transform duration-500'
                    style={{ transform: `translateY(${boxTranslateY}px)` }}
                >
                    <p className='mb-4 transition-[text-decoration] duration-500'
                        style={{
                            textDecorationLine,
                            textDecorationStyle,
                            textDecorationColor,
                            textDecorationThickness: `${textDecorationThickness}px`
                        }}>
                        Cras ex justo, sodales eu malesuada vitae, volutpat consectetur nulla.
                        Praesent auctor eros sit amet urna ullamcorper laoreet.
                        Aliquam erat volutpat. Aliquam dapibus tortor lacus, a congue est euismod aliquet.
                        Curabitur eget nunc in urna consequat lacinia. Phasellus consectetur scelerisque semper.
                        In ac ultricies metus. Pellentesque nisi tortor, venenatis vel pulvinar nec, ultrices eu massa.
                        Nullam sem massa, rutrum rhoncus libero ac, euismod pharetra lacus. Fusce vel erat ligula.
                        Sed bibendum, nisl eu blandit convallis, mauris lectus ullamcorper dolor, in sodales sem justo in purus.
                        Duis a condimentum augue, a egestas sem. Cras consequat dapibus risus, quis dapibus ipsum condimentum quis.
                    </p>
                </div>
            </div>
        </>
    );
}

export default TextDecoration;