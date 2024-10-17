// WordSpacing.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../../utils/handleOptionToggle';
import { copyCss } from '../../../../utils/clipboardUtils';
import { useElementOverflowAdjustment } from '../../../../hooks/useElementOverflowAdjustment ';

const WordSpacing: React.FC = () => {
    const [wordSpacing, setWordSpacing] = useState('normal');
    const [customWordSpacing, setCustomWordSpacing] = useState('2.5');
    const [unit, setUnit] = useState('px');   // 단위, px, em 등
    const unitValues: string[] = ['px', 'em', 'rem'];

    const [boxTranslateY, setBoxTranslateY] = useState(0);

    // update word-spacing
    const updateWordSpacing = (event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>, isCustom: boolean = false) => {
        const target = event.target as HTMLInputElement;
        const inputValue = target.value;

        if (isCustom) {
            setCustomWordSpacing(inputValue);
        }
        setWordSpacing(inputValue);
    }

    // update unit
    const updateUnit = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setUnit(inputValue);
    }

    const dependencies = [wordSpacing, customWordSpacing, unit];
    useElementOverflowAdjustment(['#word-spacing'], () => 0, setBoxTranslateY, dependencies);


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
                        <div className='text-center pt-2 font-bold text-lg'>Word Spacing</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll'>
                        {/* word spacing */}
                        <div className='text-center p-0.5 text-xs'>
                            word-spacing:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={`${wordSpacing}${wordSpacing === 'normal' ? '' : unit}`}
                                readOnly
                            />
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('word-spacing', `${wordSpacing}${wordSpacing === 'normal' ? '' : unit}`)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        <div className='grid grid-cols-2 gap-2'>
                            <input
                                type='radio'
                                name='wordSpacing'
                                className="btn"
                                aria-label='normal'
                                value='normal'
                                checked={wordSpacing === 'normal'}
                                onChange={updateWordSpacing}
                            />
                            {/* custom value */}
                            <button className="btn p-0">
                                <input
                                    type='text'
                                    className='input w-full h-full bg-transparent focus:outline-none border-2 focus:border-gray-400 text-center'
                                    onClick={(event) => updateWordSpacing(event, true)}
                                    onChange={(event) => updateWordSpacing(event, true)}
                                    value={customWordSpacing}
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
                <div id='word-spacing' className='text-lg bg-blue-50 shadow p-4 font-mono transition-transform duration-500'
                    style={{ transform: `translateY(${boxTranslateY}px)` }}
                >
                    <p className='w-[700px] mx-auto'
                        style={{
                            wordSpacing: `${wordSpacing}${wordSpacing === 'normal' ? '' : unit}`
                        }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Aliquam dictum eros id mauris mollis sagittis.
                        Quisque efficitur elementum euismod.
                        Aenean aliquet porttitor neque, quis laoreet justo cursus eget.
                        Aliquam porta interdum nunc ultrices dictum.
                        Nullam ut porta purus, eget interdum leo. Nulla id tempus urna.
                        Cras at nunc blandit, rhoncus magna vitae, commodo erat.
                        Maecenas maximus consectetur erat, ut suscipit augue dapibus id.
                        Suspendisse at sollicitudin nisl, et pulvinar tellus.
                        Nam scelerisque nisl non massa consequat, tristique iaculis magna accumsan.
                    </p>
                </div>
            </div>
        </>
    );
}

export default WordSpacing;