// FlexGorw.tsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../utils/handleOptionToggle';
import { copyCss } from '../../../utils/clipboardUtils';
import { addBoxes } from '../../../utils/commonElements';
import { useOverflowHandler } from '../../../hooks/useOverflowHandler';

const FlexGorw: React.FC = () => {
    // flex-direction
    type FlexDirectionType = 'row' | 'row-reverse' | 'column' | 'column-reverse';
    const [flexDirection, setFlexDirection] = useState<FlexDirectionType>('row');
    const flexDirectionValues = ['row', 'row-reverse', 'column', 'column-reverse'];
    // flex-wrap
    type FlexWrapType = 'nowrap' | 'wrap' | 'wrap-reverse';
    const [flexWrap, setFlexWrap] = useState<FlexWrapType>('wrap');
    const flexWrapValues = ['nowrap', 'wrap', 'wrap-reverse'];

    // box option
    const [useBoxOption, setUseBoxOption] = useState(false);
    const [boxCount, setBoxCount] = useState(3);
    const [boxSize, setBoxSize] = useState(100);

    // flexGrow 속성을 적용할 박스
    const [flexGrowBoxes, setFlexGorwBoxes] = useState(Array(boxCount).fill(0));
    const [lastFlexGorwValue, setLastFlexGorwValue] = useState(0);


    const [boxTranslateY, setBoxTranslateY] = useState(0);

    // boxCount 값이 변할때마다 초기화
    useEffect(() => { setFlexGorwBoxes(Array(boxCount).fill(0)) }, [boxCount]);

    const dependencies = [lastFlexGorwValue, flexDirection, useBoxOption, boxCount, boxSize];
    useOverflowHandler(['#flex-grow'], () => 0, setBoxTranslateY, dependencies);


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
                        <div className='text-center pt-2 font-bold text-lg'>Flex Gorw</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div id='option-wrap-bottom' className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll px-2'>
                        {/* 제목 */}
                        <div className='text-center p-0.5 text-xs'>
                            flex-grow:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={lastFlexGorwValue}
                                readOnly
                            />
                            {/* 속성 복사 */}
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('flex-grow', lastFlexGorwValue)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        {/* flex-flow */}
                        <div className="divider font-bold text-lg">Flex Flow</div>
                        <div className='grid grid-cols-2 gap-2 items-center'>
                            {/* direction */}
                            <div className='font-bold text-sm text-center'>Direction</div>
                            <select name="flexDirection" className='select select-bordered select-xs font-bold'
                                defaultValue={flexDirectionValues[0]}
                                onChange={(e) => setFlexDirection(e.target.value as FlexDirectionType)}
                            >
                                {flexDirectionValues.map((value, index) => (
                                    <option key={index}>{value}</option>
                                ))}
                            </select>
                            {/* wrap */}
                            <div className='font-bold text-sm text-center'>Wrap</div>
                            <select name="flexWrap" className='select select-bordered select-xs font-bold'
                                defaultValue={flexWrapValues[1]}
                                onChange={(e) => setFlexWrap(e.target.value as FlexWrapType)}
                            >
                                {flexWrapValues.map((value, index) => (
                                    <option key={index}>{value}</option>
                                ))}
                            </select>
                        </div>

                        {/* flexGrow */}
                        <div className="divider font-bold text-lg">Flex Gorw</div>
                        <div className='grid grid-cols-4 gap-2 items-center'>
                            {flexGrowBoxes.map((value, index) => (
                                <React.Fragment key={index}>
                                    <div className='font-bold text-sm text-center'>Box {index + 1}</div>
                                    <input type='number' className="btn btn-sm"
                                        style={{ MozAppearance: 'textfield' }}
                                        value={value}
                                        onChange={(e) => {
                                            const newBoxes = [...flexGrowBoxes];
                                            newBoxes[index] = Number(e.target.value);
                                            setFlexGorwBoxes(newBoxes);
                                            setLastFlexGorwValue(Number(e.target.value));
                                        }}
                                    />
                                </React.Fragment>
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
                <div id='flex-grow' className='flex w-[500px] h-[500px] bg-blue-50 shadow transition-transform duration-300'
                    style={{
                        flexFlow: `${flexDirection} ${flexWrap}`,
                        transform: `translateY(${boxTranslateY}px)`
                    }}
                >
                    {
                        addBoxes(
                            boxCount
                            , { width: boxSize, height: boxSize }, 'transition-[flex-grow] duration-500'
                            , Array.from({ length: boxCount }, (_, index) => ({
                                flexGrow: `${flexGrowBoxes[index]}`
                            }))
                            , true
                        )
                    }
                </div>
            </div>
        </>
    );
}

export default FlexGorw;