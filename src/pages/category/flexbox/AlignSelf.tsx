// AlignSelf.tsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../utils/handleOptionToggle';
import { copyCss } from '../../../utils/clipboardUtils';
import { addBoxes } from '../../../utils/commonElements';
import { useOverflowHandler } from '../../../hooks/useOverflowHandler';

const AlignSelf: React.FC = () => {
    const [alignSelf, setAlignSelf] = useState('normal');
    const alignSelfValues = ["normal", "stretch", "center", "start", "end", "flex-start", "flex-end", "baseline", "first baseline", "last baseline", "space-between", "space-around", "space-evenly"];

    // flex-direction
    type FlexDirectionType = 'row' | 'row-reverse' | 'column' | 'column-reverse';
    const [flexDirection, setFlexDirection] = useState<FlexDirectionType>('row');
    const flexDirectionValues = ['row', 'row-reverse', 'column', 'column-reverse'];

    type FlexWrapType = 'nowrap' | 'wrap' | 'wrap-reverse';
    const [flexWrap, setFlexWrap] = useState<FlexWrapType>('wrap');
    const flexWrapValues = ['nowrap', 'wrap', 'wrap-reverse'];

    // box option
    const [useBoxOption, setUseBoxOption] = useState(false);
    const [boxCount, setBoxCount] = useState(7);
    const [boxSize, setBoxSize] = useState(100);

    // align-self 속성을 적용할 박스
    const [checkedBoxes, setCheckedBoxes] = useState(Array(boxCount).fill(0));

    const [boxTranslateY, setBoxTranslateY] = useState(0);

    // boxCount 값이 변할때마다 초기화
    useEffect(() => { setCheckedBoxes(Array(boxCount).fill(0)) }, [boxCount]);

    const dependencies = [alignSelf, flexDirection, useBoxOption, boxCount, boxSize];
    useOverflowHandler(['#align-self'], () => 0, setBoxTranslateY, dependencies);


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
                            align-self:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-28 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={alignSelf}
                                readOnly
                            />
                            {/* 속성 복사 */}
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('align-self', alignSelf)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        {/* align-self */}
                        <div className="divider font-bold text-lg">Select Box</div>
                        <div className='grid grid-cols-7 gap-2'>
                            {checkedBoxes.map((value, index) => (
                                <input
                                    key={index}
                                    type='checkbox'
                                    name='selectBox'
                                    className="btn btn-xs"
                                    aria-label={`${index + 1}`}
                                    checked={checkedBoxes[index] === 1}
                                    onChange={() => {
                                        const newBoxes = [...checkedBoxes];
                                        newBoxes[index] = Number(!Boolean(value));
                                        setCheckedBoxes(newBoxes);
                                    }}
                                />
                            ))}
                        </div>

                        {/* align-self */}
                        <div className="divider font-bold text-lg">Align Self</div>
                        <div className='grid grid-cols-3 gap-2'>
                            {alignSelfValues.map((value, index) => (
                                <input
                                    key={index}
                                    type='radio'
                                    name='alignSelf'
                                    className="btn"
                                    aria-label={value}
                                    checked={alignSelf === value}
                                    onChange={() => setAlignSelf(value)}
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

                        {/* flex-wrap */}
                        <div className="divider font-bold text-lg">Flex Wrap</div>
                        <div className='grid grid-cols-3 gap-2'>
                            {flexWrapValues.map((value, index) => (
                                <input
                                    key={index}
                                    type='radio'
                                    name='flexWrap'
                                    className="btn"
                                    aria-label={value}
                                    checked={flexWrap === value}
                                    onChange={() => setFlexWrap(value as FlexWrapType)}
                                />
                            ))}
                        </div>

                        {/* box option */}
                        <div className='divider flex items-center justify-center font-bold'>
                            <span>Box Option</span>
                            <input type="checkbox" className="toggle toggle-info toggle-sm"
                                onChange={() => setUseBoxOption(!useBoxOption)}
                            />
                        </div>
                        {
                            useBoxOption ? (
                                <>
                                    <div className='grid grid-cols-2 gap-2 items-center'>
                                        {/* count */}
                                        <div className='font-bold text-sm text-center'>Count</div>
                                        <input type='number' className='btn btn-sm border-2 focus:border-gray-400 focus:outline-none' min={2} max={10}
                                            value={boxCount}
                                            onChange={(e) => setBoxCount(Math.max(2, Math.min(10, Number(e.target.value))))}
                                        />
                                        {/* size */}
                                        <div className='font-bold text-sm text-center'>Size</div>
                                        <input type='number' className='btn btn-sm border-2 focus:border-gray-400 focus:outline-none' min={20} max={100}
                                            value={boxSize}
                                            onChange={(e) => setBoxSize(Math.max(20, Math.min(100, Number(e.target.value))))}
                                        />
                                    </div>
                                </>
                            ) : null
                        }
                    </div>
                </div>
            </div>

            {/* view 파트 */}
            <div id="view" className='w-full h-full flex items-center justify-center overflow-scroll'>
                <div id='align-self' className='flex w-[500px] h-[500px] bg-blue-50 shadow transition-transform duration-300'
                    style={{
                        flexDirection,
                        flexWrap,
                        transform: `translateY(${boxTranslateY}px)`
                    }}
                >
                    {
                        addBoxes(
                            boxCount
                            , { width: boxSize, height: boxSize }
                            , true
                            , Array.from({ length: boxCount }, (_, index) => ({
                                alignSelf: checkedBoxes[index] ? alignSelf : undefined
                            })))
                    }
                </div>
            </div>
        </>
    );
}

export default AlignSelf;