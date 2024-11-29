// JustifyContent.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../utils/handleOptionToggle';
import { copyCss } from '../../../utils/clipboardUtils';
import { useOverflowHandler } from '../../../hooks/useOverflowHandler';

const JustifyContent: React.FC = () => {
    // [start] - 항목들을 축의 시작 부분에 정렬, [end] - 항목들을 축의 끝 부분에 정렬
    // [flex-start] - 플렉스 항목들을 축의 시작 부분에 정렬, [flex-end] - 플렉스 항목들을 축의 끝 부분에 정렬
    const [justifyContent, setJustifyContent] = useState('center');
    const justifyContentValues = ["center", "start", "end", "flex-start", "flex-end", "left", "right", "normal", "space-between", "space-around", "space-evenly", "stretch"];

    type FlexDirectionType = 'row' | 'row-reverse' | 'column' | 'column-reverse';
    const [flexDirection, setFlexDirection] = useState<FlexDirectionType>('row');
    const flexDirectionValues = ['row', 'row-reverse', 'column', 'column-reverse'];

    const [boxTranslateY, setBoxTranslateY] = useState(0);

    useOverflowHandler(['#justify-content'], () => 0, setBoxTranslateY, [justifyContent]);


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
                        <div className='text-center pt-2 font-bold text-lg'>Justify Content</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div id='option-wrap-bottom' className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll px-2'>
                        {/* 제목 */}
                        <div className='text-center p-0.5 text-xs'>
                            justify-content:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-28 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={justifyContent}
                                readOnly
                            />
                            {/* 속성 복사 */}
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('justify-content', justifyContent)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        {/* justify-content */}
                        <div className='grid grid-cols-3 gap-2'>
                            {justifyContentValues.map((value, index) => (
                                <input
                                    key={index}
                                    type='radio'
                                    name='justifyContent'
                                    className="btn"
                                    aria-label={value}
                                    checked={justifyContent === value}
                                    onChange={() => setJustifyContent(value)}
                                />
                            ))}
                        </div>

                        {/* flex-direction */}
                        <div className="divider font-bold text-lg">Flex Direction</div>
                        <div className='grid grid-cols-2 gap-2'>
                            {flexDirectionValues.map((value, index) => (
                                <input
                                    key={index}
                                    type='radio'
                                    name='flexDirection'
                                    className="btn"
                                    aria-label={value}
                                    checked={flexDirection === value}
                                    onChange={() => setFlexDirection(value as FlexDirectionType)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* view 파트 */}
            <div id="view" className='w-full h-full flex items-center justify-center overflow-scroll'>
                <div id='justify-content' className='flex w-[500px] h-[500px] bg-blue-50 shadow transition-transform duration-300'
                    style={{
                        flexDirection,
                        justifyContent,
                        transform: `translateY(${boxTranslateY}px)`
                    }}
                >
                    <div className='box box-1 w-[40px] h-[40px] bg-red-500'></div>
                    <div className='box box-2 w-[40px] h-[40px] bg-orange-500'></div>
                    <div className='box box-3 w-[40px] h-[40px] bg-yellow-500'></div>
                    <div className='box box-4 w-[40px] h-[40px] bg-green-500'></div>
                    <div className='box box-5 w-[40px] h-[40px] bg-blue-500'></div>
                    <div className='box box-6 w-[40px] h-[40px] bg-indigo-500'></div>
                    <div className='box box-6 w-[40px] h-[40px] bg-purple-500'></div>
                </div>
            </div>
        </>
    );
}

export default JustifyContent;