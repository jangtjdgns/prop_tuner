// WritingMode.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../utils/handleOptionToggle';
import { copyCss } from '../../../utils/clipboardUtils';
import { useElementOverflowAdjustment } from '../../../hooks/useElementOverflowAdjustment ';

const WritingMode: React.FC = () => {
    type WrtingModeType = 'horizontal-tb' | 'vertical-rl' | 'vertical-lr';
    const [writingMode, setWritingMode] = useState<WrtingModeType>('horizontal-tb');
    const writingModeValues: string[] = ['horizontal-tb', 'vertical-rl', 'vertical-lr'];

    const [boxTranslateY, setBoxTranslateY] = useState(0);

    const dependencies = [writingMode];
    useElementOverflowAdjustment(['#writing-mode'], () => 0, setBoxTranslateY, dependencies);


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
                        <div className='text-center pt-2 font-bold text-lg'>Writing Mode</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div id='option-wrap-bottom' className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll px-2'>
                        {/* writing mode */}
                        <div className='text-center p-0.5 text-xs'>
                            writing-mode:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-24 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={writingMode}
                                readOnly
                            />
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('writing-mode', writingMode)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        <div className='grid grid-cols-3 gap-2'>
                            {writingModeValues.map((value, index) => (
                                <input
                                    key={index}
                                    type='radio'
                                    name='writingMode'
                                    className="btn"
                                    aria-label={value}
                                    value={value}
                                    checked={writingMode === value}
                                    onChange={() => setWritingMode(value as WrtingModeType)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* view 파트 */}
            <div id="view" className='w-full h-full flex items-center justify-center overflow-scroll'>
                <div id='writing-mode' className='w-[500px] h-[500px] bg-blue-50 shadow font-mono text-2xl overflow-scroll p-4 transition-transform duration-500'
                    style={{ transform: `translateY(${boxTranslateY}px)` }}
                >
                    <p style={{ writingMode }}>
                        <span className='font-bold underline'>Fusce ultrices blandit sapien, ac venenatis dolor tempus nec. <br /></span>
                        Nunc euismod lectus sit amet massa eleifend consectetur. Mauris porta varius ultrices.
                        Sed vitae semper leo, at gravida erat. Phasellus ut sollicitudin est.
                        Integer aliquet ut felis sed molestie. Vestibulum tincidunt, orci vitae accumsan laoreet,
                        urna arcu consequat nisi, non sodales nulla lectus vitae nisl.
                        Quisque vitae orci eget nisi porta convallis.
                    </p>
                </div>
            </div>
        </>
    );
}

export default WritingMode;