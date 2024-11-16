// LineHeight.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../utils/handleOptionToggle';
import { copyCss } from '../../../utils/clipboardUtils';
import { useElementOverflowAdjustment } from '../../../hooks/useElementOverflowAdjustment ';

const LineHeight: React.FC = () => {
    const [lineHeight, setLineHeight] = useState('normal');
    const [customLineHeight, setCustomLineHeight] = useState('2.5');
    const [unit, setUnit] = useState('none');   // 단위, none == '', px, % 등
    const unitValues: string[] = ['none', 'px', '%'];

    const [boxTranslateY, setBoxTranslateY] = useState(0);

    // update line-height
    const updateLineHeight = (event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>, isCustom: boolean = false) => {
        const target = event.target as HTMLInputElement;
        const inputValue = target.value;

        if (isCustom) {
            setCustomLineHeight(inputValue);
        }
        setLineHeight(inputValue);
    }

    // update unit
    const updateUnit = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setUnit(inputValue);
    }

    const dependencies = [lineHeight, customLineHeight, unit];
    useElementOverflowAdjustment(['#line-height'], () => 0, setBoxTranslateY, dependencies);


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
                        <div className='text-center pt-2 font-bold text-lg'>Line Height</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll'>
                        {/* line height */}
                        <div className='text-center p-0.5 text-xs'>
                            line-height:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={`${lineHeight}${lineHeight === 'normal' ? '' : (unit !== 'none' ? unit : '')}`}
                                readOnly
                            />
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('line-height', `${lineHeight}${lineHeight === 'normal' ? '' : (unit !== 'none' ? unit : '')}`)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        <div className='grid grid-cols-2 gap-2'>
                            <input
                                type='radio'
                                name='lineHeight'
                                className="btn"
                                aria-label='normal'
                                value='normal'
                                checked={lineHeight === 'normal'}
                                onChange={updateLineHeight}
                            />
                            {/* custom value */}
                            <button className="btn p-0">
                                <input
                                    type='text'
                                    className='input w-full h-full bg-transparent focus:outline-none border-2 focus:border-gray-400 text-center'
                                    onClick={(event) => updateLineHeight(event, true)}
                                    onChange={(event) => updateLineHeight(event, true)}
                                    value={customLineHeight}
                                    placeholder='Custom Value'
                                />
                            </button>
                        </div>

                        {/* unit */}
                        <div className="divider font-bold text-lg">Unit</div>
                        <div className='grid grid-cols-3 gap-2'>
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
                <div id='line-height' className='text-lg bg-blue-50 shadow p-4 font-mono transition-transform duration-500'
                    style={{ transform: `translateY(${boxTranslateY}px)` }}
                >
                    <p className='w-[700px] mx-auto'
                        style={{
                            lineHeight: `${lineHeight}${lineHeight === 'normal' ? '' : (unit !== 'none' ? unit : '')}`
                        }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse nec odio aliquet, dignissim odio a, hendrerit augue.
                        Quisque posuere posuere ex, sed imperdiet elit tincidunt a.
                        Vivamus fringilla lacus rutrum magna viverra, eu pulvinar ligula tristique.
                        Nam egestas mattis felis, sit amet accumsan ipsum fermentum ac.
                        Pellentesque rutrum ultrices nulla.
                        Pellentesque vulputate, tellus ac ultricies pharetra, nisl enim imperdiet erat, quis tincidunt diam justo non urna.
                        Quisque vitae urna fermentum, vehicula mi ut, consequat lectus.
                        Vestibulum tristique molestie ipsum a iaculis
                        Morbi eleifend tellus lectus, vel venenatis diam finibus quis.
                        Suspendisse velit mi, mollis vitae pellentesque nec, hendrerit sed risus.
                        Nam nibh quam, volutpat at sollicitudin id, ullamcorper sit amet dolor.
                        Sed nunc nulla, vestibulum sed scelerisque sit amet, ultricies eget odio.
                        Praesent varius erat eu quam rhoncus volutpat. Duis a justo nibh.
                    </p>
                </div>
            </div>
        </>
    );
}

export default LineHeight;