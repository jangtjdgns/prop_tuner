// LetterSpacing.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../../utils/handleOptionToggle';
import { copyCss } from '../../../../utils/clipboardUtils';
import { useElementOverflowAdjustment } from '../../../../hooks/useElementOverflowAdjustment ';

const LetterSpacing: React.FC = () => {
    const [letterSpacing, setLetterSpacing] = useState('normal');
    const [customLetterSpacing, setCustomLetterSpacing] = useState('2.5');
    const [unit, setUnit] = useState('px');   // 단위, px, em 등
    const unitValues: string[] = ['px', 'em', 'rem'];

    const [boxTranslateY, setBoxTranslateY] = useState(0);

    // update letter-spacing
    const updateLetterSpacing = (event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>, isCustom: boolean = false) => {
        const target = event.target as HTMLInputElement;
        const inputValue = target.value;

        if (isCustom) {
            setCustomLetterSpacing(inputValue);
        }
        setLetterSpacing(inputValue);
    }

    // update unit
    const updateUnit = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setUnit(inputValue);
    }

    const dependencies = [letterSpacing, customLetterSpacing, unit];
    useElementOverflowAdjustment(['#letter-spacing'], () => 0, setBoxTranslateY, dependencies);


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
                        <div className='text-center pt-2 font-bold text-lg'>Letter Spacing</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll'>
                        {/* letter spacing */}
                        <div className='text-center p-0.5 text-xs'>
                            letter-spacing:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={`${letterSpacing}${letterSpacing === 'normal' ? '' : unit}`}
                                readOnly
                            />
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('letter-spacing', `${letterSpacing}${letterSpacing === 'normal' ? '' : unit}`, false)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        <div className='grid grid-cols-2 gap-2'>
                            <input
                                type='radio'
                                name='LetterSpacing'
                                className="btn"
                                aria-label='normal'
                                value='normal'
                                checked={letterSpacing === 'normal'}
                                onChange={updateLetterSpacing}
                            />
                            {/* custom value */}
                            <button className="btn p-0">
                                <input
                                    type='text'
                                    className='input w-full h-full bg-transparent focus:outline-none border-2 focus:border-gray-400 text-center'
                                    onClick={(event) => updateLetterSpacing(event, true)}
                                    onChange={(event) => updateLetterSpacing(event, true)}
                                    value={customLetterSpacing}
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
                <div id='letter-spacing' className='text-lg transition-transform duration-500'
                    style={{ transform: `translateY(${boxTranslateY}px)` }}
                >
                    <p className='w-[700px] mx-auto font-mono'
                        style={{
                            letterSpacing: `${letterSpacing}${letterSpacing === 'normal' ? '' : unit}`
                        }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Donec auctor egestas pretium.
                        Praesent porttitor commodo maximus.
                        Nunc arcu lacus, efficitur vitae aliquam ac, sagittis eget ante.
                        Nullam a elit viverra lacus gravida sagittis.
                        Nulla feugiat, tellus eu pharetra malesuada, lectus justo ultricies arcu, vitae porta nisl leo non orci.
                        Nunc consectetur, diam at ultricies tristique, lacus velit vulputate velit, at varius felis orci non dui.
                        Suspendisse consectetur at ex ac mattis.
                        Mauris sit amet tincidunt sem. Nulla quis augue nibh.
                        Vestibulum ornare cursus tortor quis ultricies.
                        Duis aliquet metus massa, eget mollis eros consequat sed.
                    </p>
                </div>
            </div>
        </>
    );
}

export default LetterSpacing;