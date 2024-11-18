// WordBreak.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../utils/handleOptionToggle';
import { copyCss } from '../../../utils/clipboardUtils';
import { useOverflowHandler } from '../../../hooks/useOverflowHandler';

const WordBreak: React.FC = () => {
    type WordBreakValues = 'normal' | 'break-all' | 'keep-all' | 'break-word';
    const [wordBreak, setWordBreak] = useState<WordBreakValues>('normal');
    const wordBreakValues: string[] = ['normal', 'break-all', 'keep-all', 'break-word'];

    const [boxTranslateY, setBoxTranslateY] = useState(0);

    // update wordBreak
    const updateWordBreak = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setWordBreak(inputValue as WordBreakValues);
    }

    const dependencies = [wordBreak];
    useOverflowHandler(['#word-break'], () => 0, setBoxTranslateY, dependencies, { widthPadding: 0, heightPadding: 20 });


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
                        <div className='text-center pt-2 font-bold text-lg'>Word Break</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div id='option-wrap-bottom' className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll px-2'>
                        {/* wordBreak */}
                        <div className='text-center p-0.5 text-xs'>
                            word-break:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-24 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={wordBreak}
                                readOnly
                            />
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('word-break', wordBreak)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        <div className='grid grid-cols-2 gap-2'>
                            {wordBreakValues.map((value, index) => (
                                <input
                                    key={index}
                                    type='radio'
                                    name='wordBreak'
                                    className="btn"
                                    aria-label={value}
                                    value={value}
                                    checked={wordBreak === value}
                                    onChange={updateWordBreak}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* view 파트 */}
            <div id="view" className='w-full h-full flex items-center justify-center overflow-scroll'>
                <div id='word-break' className='w-[500px] h-[500px] bg-blue-50 shadow p-2 text-2xl font-mono transition-transform duration-500 '
                    style={{
                        transform: `translateY(${boxTranslateY}px)`
                    }}
                >
                    <p style={{ wordBreak }}>
                        Quisquepharetraenimnonvelittincidunt, eupellentesqueorcifringilla.
                        Phaselluspellentesquequeligula, sitametfermentummivehiculain.
                        Vestibulumarcumassa, fringillasitametsapienvitae,dignissimiaculisquam.
                        Vestibulumpulvinarfinibustellus,utsemperaugueplaceratet.
                        Suspendissevestibulumexquisturpisgravidaultrices.Duisalibero.
                    </p>
                </div>
            </div>
        </>
    );
}

export default WordBreak;