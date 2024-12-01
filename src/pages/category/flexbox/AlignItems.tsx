// AlignItems.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../utils/handleOptionToggle';
import { copyCss } from '../../../utils/clipboardUtils';
import { useOverflowHandler } from '../../../hooks/useOverflowHandler';

const AlignItems: React.FC = () => {
    const [alignItems, setAlignItems] = useState('normal');
    const alignItemsValues = ["normal", "stretch", "center", "start", "end", "flex-start", "flex-end", "self-start", "self-end", "baseline", "first baseline", "last baseline"];

    type FlexDirectionType = 'row' | 'row-reverse' | 'column' | 'column-reverse';
    const [flexDirection, setFlexDirection] = useState<FlexDirectionType>('row');
    const flexDirectionValues = ['row', 'row-reverse', 'column', 'column-reverse'];

    const [boxTranslateY, setBoxTranslateY] = useState(0);

    const dependencies = [alignItems, flexDirection];
    useOverflowHandler(['#align-items'], () => 0, setBoxTranslateY, dependencies);


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
                        <div className='text-center pt-2 font-bold text-lg'>Align Items</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div id='option-wrap-bottom' className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll px-2'>
                        {/* 제목 */}
                        <div className='text-center p-0.5 text-xs'>
                            align-items:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-28 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={alignItems}
                                readOnly
                            />
                            {/* 속성 복사 */}
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('align-items', alignItems)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        {/* align-items */}
                        <div className='grid grid-cols-3 gap-2'>
                            {alignItemsValues.map((value, index) => (
                                <input
                                    key={index}
                                    type='radio'
                                    name='alignItems'
                                    className="btn"
                                    aria-label={value}
                                    checked={alignItems === value}
                                    onChange={() => setAlignItems(value)}
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
                <div id='align-items' className='flex w-[500px] h-[500px] bg-blue-50 shadow transition-transform duration-300'
                    style={{
                        flexDirection,
                        alignItems,
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

export default AlignItems;