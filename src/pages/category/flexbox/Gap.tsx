// Gap.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../utils/handleOptionToggle';
import { copyCss } from '../../../utils/clipboardUtils';
import { addBoxes } from '../../../utils/commonElements';
import { useOverflowHandler } from '../../../hooks/useOverflowHandler';

const ColumnGap: React.FC = () => {
    const [gap, setGap] = useState(0);
    const [rowGap, setRowGap] = useState(0);
    const [columnGap, setColumnGap] = useState(0);

    // 단일 값(single) / 이중 값(doulbe)
    const [isSingle, setIsSingle] = useState(true);

    // 단위
    const [units, setUnits] = useState<'px' | '%'>('px');

    // flex-direction
    type FlexDirectionType = 'row' | 'row-reverse' | 'column' | 'column-reverse';
    const [flexDirection, setFlexDirection] = useState<FlexDirectionType>('row');
    const flexDirectionValues = ['row', 'row-reverse', 'column', 'column-reverse'];

    // flex-wrap
    type FlexWrapType = 'nowrap' | 'wrap' | 'wrap-reverse';
    const [flexWrap, setFlexWrap] = useState<FlexWrapType>('wrap');
    const flexWrapValues = ['nowrap', 'wrap', 'wrap-reverse'];

    // align-content
    const [alignContent, setAlignContent] = useState('start');
    const alignContentValues = ["normal", "stretch", "center", "start", "end", "flex-start", "flex-end", "baseline", "first baseline", "last baseline", "space-between", "space-around", "space-evenly"];
    // Justify-content
    const [justifyContent, setJustifyContent] = useState('normal');
    const justifyContentValues = ["normal", "stretch", "center", "start", "end", "flex-start", "flex-end", "left", "right", "space-between", "space-around", "space-evenly"];

    // box option
    const [useBoxOption, setUseBoxOption] = useState(false);
    const [boxCount, setBoxCount] = useState(7);
    const [boxSize, setBoxSize] = useState(100);

    const [boxTranslateY, setBoxTranslateY] = useState(0);

    const dependencies = [rowGap, columnGap, flexDirection, flexWrap, useBoxOption, boxCount, boxSize];
    useOverflowHandler(['#gap'], () => 0, setBoxTranslateY, dependencies);


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
                        <div className='text-center pt-2 font-bold text-lg'>Gap</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div id='option-wrap-bottom' className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll px-2'>
                        {/* 제목 */}
                        <div className='text-center p-0.5 text-xs'>
                            gap:
                            {
                                isSingle ? (
                                    <>
                                        <input type="text" className='input input-xs mx-1 border-gray-200 w-10 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                            value={gap}
                                            readOnly
                                        />
                                    </>
                                ) : (
                                    <>
                                        <input type="text" className='input input-xs mx-1 border-gray-200 w-10 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                            value={rowGap}
                                            readOnly
                                        />
                                        <input type="text" className='input input-xs mx-1 border-gray-200 w-10 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                            value={columnGap}
                                            readOnly
                                        />
                                    </>
                                )
                            }

                            {/* 속성 복사 */}
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('gap', isSingle ? `${gap}${units}` : `${rowGap}${units} ${columnGap}${units}`)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        {/* gap */}
                        <div className="divider my-0"></div>
                        <div className='flex items-center justify-between'>
                            <div className='text-xs text-right font-bold mb-2 flex items-center'>
                                <span className='pr-2'>Single</span>
                                <input type="checkbox" className='checkbox checkbox-xs'
                                    checked={isSingle}
                                    onChange={() => setIsSingle(!isSingle)}
                                />
                            </div>
                            <div className='text-xs text-right font-bold mb-2'><span className='pr-2'>Unit :</span>
                                <select name="unit" className='select select-bordered select-xs font-bold h-2 focus:outline-none'
                                    defaultValue='px'
                                    onChange={(e) => setUnits(e.target.value as 'px' | '%')}
                                >
                                    <option value="px">px</option>
                                    <option value="%">%</option>
                                </select>
                            </div>
                        </div>

                        {
                            isSingle ? (
                                <div className='grid grid-cols-2 gap-2 items-center'>
                                    <div className='font-bold text-sm text-center'>Gap</div>
                                    <div className='grid'>
                                        <input type='number' className='btn btn-sm border-2 focus:border-gray-400 focus:outline-none' min={0} max={200}
                                            value={gap}
                                            onChange={(e) => setGap(Math.max(0, Math.min(200, Number(e.target.value))))}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className='grid grid-cols-2 gap-2 items-center'>
                                        {/* row-gap */}
                                        <div className='font-bold text-sm text-center'>Row</div>
                                        <div className='grid'>
                                            <input type='number' className='btn btn-sm border-2 focus:border-gray-400 focus:outline-none' min={0} max={200}
                                                value={rowGap}
                                                onChange={(e) => setRowGap(Math.max(0, Math.min(200, Number(e.target.value))))}
                                            />
                                        </div>
                                        {/* column-gap */}
                                        <div className='font-bold text-sm text-center'>Column</div>
                                        <div className='grid'>
                                            <input type='number' className='btn btn-sm border-2 focus:border-gray-400 focus:outline-none' min={0} max={200}
                                                value={columnGap}
                                                onChange={(e) => setColumnGap(Math.max(0, Math.min(200, Number(e.target.value))))}
                                            />
                                        </div>
                                    </div>
                                </>
                            )
                        }

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

                        {/* place-content */}
                        <div className="divider font-bold text-lg">Place Content</div>
                        <div className='grid grid-cols-2 gap-2 items-center'>
                            {/* align */}
                            <div className='font-bold text-sm text-center'>Align</div>
                            <select name="alignContent" className='select select-bordered select-xs font-bold'
                                defaultValue={alignContentValues[3]}
                                onChange={(e) => setAlignContent(e.target.value)}
                            >
                                {alignContentValues.map((value, index) => (
                                    <option key={index}>{value}</option>
                                ))}
                            </select>
                            {/* justify */}
                            <div className='font-bold text-sm text-center'>Justify</div>
                            <select name="justifyContent" className='select select-bordered select-xs font-bold'
                                defaultValue={justifyContentValues[0]}
                                onChange={(e) => setJustifyContent(e.target.value)}
                            >
                                {justifyContentValues.map((value, index) => (
                                    <option key={index}>{value}</option>
                                ))}
                            </select>
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
                                        <input type='number' className='btn btn-sm border-2 focus:border-gray-400 focus:outline-none' min={2} max={20}
                                            value={boxCount}
                                            onChange={(e) => setBoxCount(Math.max(2, Math.min(20, Number(e.target.value))))}
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
                <div id='gap' className='flex w-[500px] h-[500px] bg-blue-50 shadow transition-[gap] transition-transform duration-300'
                    style={{
                        flexFlow: 'row wrap',
                        alignContent: 'start',
                        gap: isSingle ? `${gap}${units}` : `${rowGap}${units} ${columnGap}${units}`,
                        transform: `translateY(${boxTranslateY}px)`
                    }}
                >
                    {addBoxes(boxCount, { width: boxSize, height: boxSize })}
                </div>
            </div>
        </>
    );
}

export default ColumnGap;