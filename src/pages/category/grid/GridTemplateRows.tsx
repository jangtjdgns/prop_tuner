// GridTemplateRows.tsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../utils/handleOptionToggle';
import { copyCss } from '../../../utils/clipboardUtils';
import { addBoxes } from '../../../utils/commonElements';
import { useOverflowHandler } from '../../../hooks/useOverflowHandler';

const GridTemplateRows: React.FC = () => {// box option
    const [useBoxOption, setUseBoxOption] = useState(false);
    const [boxCount, setBoxCount] = useState(2);
    const [boxSize, setBoxSize] = useState(100);

    // gridTemplateRows
    const [gridTemplateRows, setGridTemplateRows] = useState('none');
    const rowValues = ['none', 'auto', 'track-list', 'minmax', 'fit-content', 'repeat', 'subgrid'];

    // track-list values
    const [trackListValues, setTrackListValues] = useState(Array(boxCount).fill(0));
    // minmax
    const [min, setMin] = useState(100);
    const [max, setMax] = useState(1);
    const [minUnit, setMinUnit] = useState('px');
    const [maxUnit, setMaxUnit] = useState('fr');
    // fit-content
    const [fitContent, setFitContent] = useState(50);

    // units
    const [units, setUnits] = useState('px');
    const unitValues = ['px', '%', 'em', 'rem', 'ch', 'fr'];

    const [boxTranslateY, setBoxTranslateY] = useState(0);

    useEffect(() => { setTrackListValues(Array(boxCount).fill(0)) }, [boxCount]);

    const dependencies = [gridTemplateRows, useBoxOption, boxCount, boxSize];
    useOverflowHandler(['#grid-template-rows'], () => 0, setBoxTranslateY, dependencies);


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
                        <div className='text-center pt-2 font-bold text-lg'>제목</div>
                        {/* 아래 태그는 표시할 내용이 있는 경우 사용 */}
                        {/* <div className='px-4 text-xs text-right font-bold'><span className='text-red-700'>*</span> Basis: object-fit: none;</div> */}
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div id='option-wrap-bottom' className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll px-2'>
                        {/* 제목 */}
                        <div className='text-center p-0.5 text-xs'>
                            속성:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                // value={속성값}
                                readOnly
                            />
                            {/* 속성 복사 */}
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('속성', '값')}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        {/* <div className="divider font-bold text-lg">서브 제목</div> */}
                        <div className='grid grid-cols-4 gap-2'>
                            {rowValues.map((value, index) => (
                                <input
                                    key={index}
                                    type='radio'
                                    name='gridTemplateRows'
                                    className="btn"
                                    aria-label={value}
                                    value={value}
                                    checked={gridTemplateRows === value}
                                    onChange={() => setGridTemplateRows(value)}
                                />
                            ))}
                        </div>

                        {/* gridTemplateRows = 'track-list' */}
                        {
                            gridTemplateRows === 'track-list' ?
                                (
                                    <>
                                        <div className="divider font-bold text-lg">Track List</div>
                                        <div className='grid grid-cols-4 gap-2 items-center'>
                                            {trackListValues.map((value, index) => (
                                                <React.Fragment key={index}>
                                                    <div className='font-bold text-sm text-center'>List {index + 1}</div>
                                                    <input type='number' className="btn btn-sm"
                                                        style={{ MozAppearance: 'textfield' }}
                                                        value={value}
                                                        onChange={(e) => {
                                                            const newArr = [...trackListValues];
                                                            newArr[index] = Number(e.target.value);
                                                            setTrackListValues(newArr);
                                                        }}
                                                    />
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </>
                                ) : null
                        }

                        {/* gridTemplateRows = 'minmax' */}
                        {
                            gridTemplateRows === 'minmax' ?
                                (
                                    <>
                                        <div className="divider font-bold text-lg">Min Max</div>
                                        <div className='grid grid-cols-3 gap-2 items-center'>
                                            {/* min */}
                                            <div className='font-bold text-sm text-center'>Min</div>
                                            <input type='number' className="btn btn-sm"
                                                style={{ MozAppearance: 'textfield' }}
                                                value={min}
                                                onChange={(e) => setMin(Number(e.target.value))}
                                            />
                                            {/* 단위 */}
                                            <select name="unit" className='select select-bordered select-sm font-bold h-2 focus:outline-none'
                                                defaultValue={minUnit}
                                                onChange={(e) => setMinUnit(e.target.value)}
                                            >
                                                {unitValues.slice(0, -1).map((value, index) => (
                                                    <option key={index} value={value}>{value}</option>
                                                ))}
                                            </select>
                                            {/* max */}
                                            <div className='font-bold text-sm text-center'>Max</div>
                                            <input type='number' className="btn btn-sm"
                                                style={{ MozAppearance: 'textfield' }}
                                                value={max}
                                                onChange={(e) => setMax(Number(e.target.value))}
                                            />
                                            {/* 단위 */}
                                            <select name="unit" className='select select-bordered select-sm font-bold h-2 focus:outline-none'
                                                defaultValue={maxUnit}
                                                onChange={(e) => setMaxUnit(e.target.value)}
                                            >
                                                {unitValues.map((value, index) => (
                                                    <option key={index} value={value}>{value}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </>
                                ) : null
                        }

                        {/* gridTemplateRows = 'fit-content' */}
                        {
                            gridTemplateRows === 'fit-content' ?
                                (
                                    <>
                                        <div className="divider font-bold text-lg">Fit Content</div>
                                        <div className='grid grid-cols-[3fr_1fr] gap-2 mt-2'>
                                            <input type='number' className="btn btn-sm"
                                                style={{ MozAppearance: 'textfield' }}
                                                value={fitContent}
                                                onChange={(e) => setMax(Number(e.target.value))}
                                            />
                                            {/* 단위 */}
                                            <select name="unit" className='select select-bordered select-sm font-bold h-2 focus:outline-none'
                                                defaultValue='px'
                                                onChange={(e) => setUnits(e.target.value as 'px' | '%')}
                                            >
                                                <option value="px">px</option>
                                                <option value="%">%</option>
                                            </select>
                                        </div>
                                    </>
                                )
                                : null
                        }


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
            </div >

            {/* view 파트 */}
            {/* transition-transform duration-500 */}
            {/* transform: `translateY(${boxTranslateY}px)` */}
            <div id="view" className='w-full h-full flex items-center justify-center overflow-scroll'>
                <div id='grid-template-rows' className='grid w-[500px] h-[500px] bg-blue-50 shadow transition-transform duration-300'
                    style={{
                        gridTemplateRows,
                        transform: `translateY(${boxTranslateY}px)`
                    }}
                >
                    {addBoxes(boxCount, { width: boxSize, height: boxSize })}
                </div>
            </div>
        </>
    );
}

export default GridTemplateRows;