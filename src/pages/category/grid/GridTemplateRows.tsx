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

    // gridTemplateRows
    const [gridTemplateRows, setGridTemplateRows] = useState('auto');
    const rowValues = ['auto', 'minmax', 'fit-content', 'repeat'];

    // minmax
    const [min, setMin] = useState(100);
    const [max, setMax] = useState(1);
    const [minUnit, setMinUnit] = useState('px');
    const [maxUnit, setMaxUnit] = useState('fr');
    const [isRepeatActive, setisRepeatActive] = useState(false);        // repeat와 같이 사용, boxCount에 맞게 설정정
    // fit-content
    const [fitContent, setFitContent] = useState(50);       // length
    // repeat
    const [repeat, setRepeat] = useState(2);                // repeat 횟수
    const [repeatLen, setRepeatLen] = useState(100);        // length
    const [repeatFr, setRepeatFr] = useState(1);

    // units
    const [units, setUnits] = useState('px');
    const unitValues = ['px', '%', 'em', 'rem', 'ch', 'fr'];

    const [boxTranslateY, setBoxTranslateY] = useState(0);


    // grid-template-row 옵션 컨텐츠 가져오기
    const getGridTemplateRowsContent = () => {
        switch (gridTemplateRows) {
            case 'minmax':
                return (
                    <>
                        <div className="divider font-bold text-lg">Min Max</div>
                        <div className='text-xs text-right font-bold mb-2 flex items-center'>
                            <span className='pr-2'>Active Repeat</span>
                            <input type="checkbox" className='checkbox checkbox-xs'
                                checked={isRepeatActive}
                                onChange={() => setisRepeatActive(!isRepeatActive)}
                            />
                        </div>
                        <div className='grid grid-cols-3 gap-2 items-center'>
                            {/* min */}
                            <div className='font-bold text-sm text-center'>Min</div>
                            <input type='number' className="btn btn-sm"
                                style={{ MozAppearance: 'textfield' }}
                                value={min}
                                onChange={(e) => setMin(Number(e.target.value))}
                            />
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
                )
            case 'fit-content':
                return (
                    <>
                        <div className="divider font-bold text-lg">Fit Content</div>
                        <div className='grid grid-cols-3 gap-2 mt-2 items-center'>
                            {/* length */}
                            <div className='font-bold text-sm text-center'>Length</div>
                            <input type='number' className="col-end-3 btn btn-sm"
                                style={{ MozAppearance: 'textfield' }}
                                value={fitContent}
                                onChange={(e) => setFitContent(Number(e.target.value))}
                            />
                            <select name="unit" className='select select-bordered select-sm font-bold h-2 focus:outline-none'
                                defaultValue='%'
                                onChange={(e) => setUnits(e.target.value as 'px' | '%')}
                            >
                                <option value="px">px</option>
                                <option value="%">%</option>
                            </select>
                        </div>
                    </>
                )
            case 'repeat':
                return (
                    <>
                        <div className="divider font-bold text-lg">Repeat</div>
                        <div className='grid grid-cols-3 gap-2 items-center'>
                            {/* repeat */}
                            <div className='col-start-1 col-end-2 font-bold text-sm text-center'>Repeat</div>
                            <input type='number' className="col-start-2 col-end-4 btn btn-sm"
                                style={{ MozAppearance: 'textfield' }}
                                value={repeat}
                                onChange={(e) => setRepeat(Number(e.target.value))}
                            />
                            {/* length */}
                            <div className='font-bold text-sm text-center'>Length</div>
                            <input type='number' className="btn btn-sm"
                                style={{ MozAppearance: 'textfield' }}
                                value={gridTemplateRows === 'repeat' && units !== 'fr' ? repeatLen : repeatFr}
                                onChange={(e) => {
                                    gridTemplateRows === 'repeat' && units !== 'fr'
                                        ? setRepeatLen(Number(e.target.value))
                                        : setRepeatFr(Number(e.target.value));
                                }}
                            />
                            <select name="unit" className='select select-bordered select-sm font-bold h-2 focus:outline-none'
                                defaultValue={units}
                                onChange={(e) => setUnits(e.target.value)}
                            >
                                {unitValues.map((value, index) => (
                                    <option key={index} value={value}>{value}</option>
                                ))}
                            </select>
                        </div>
                    </>
                )
            default: return null;
        }
    }

    // grid-template-row 속성 값 가져오기
    const getGridTemplateRowsValue = () => {
        let value: string = '';
        switch (gridTemplateRows) {
            case 'auto': return 'auto';
            case 'minmax':
                const minmax = `minmax(${min}${minUnit}, ${max}${maxUnit})`;
                isRepeatActive ? value = `repeat(${boxCount}, ${minmax})` : value = minmax;
                break;
            case 'fit-content': value = `fit-content(${fitContent}${units})`; break;
            case 'repeat': value = `repeat(${repeat}, ${repeatLen}${units})`; break;
        }
        return value;
    }

    // useEffect(() => { setTrackListValues(Array(boxCount).fill(0)) }, [boxCount]);

    const dependencies = [gridTemplateRows, useBoxOption, boxCount];
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
                        <div className='text-center pt-2 font-bold text-lg'>Grid Template Rows</div>
                        {/* <div className='px-4 text-xs text-right font-bold'><span className='text-red-700'>*</span> abcd</div> */}
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div id='option-wrap-bottom' className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll px-2'>
                        {/* 제목 */}
                        <div className='text-center p-0.5 text-xs'>
                            grid-template-rows:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={getGridTemplateRowsValue()}
                                readOnly
                            />
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('grid-template-rows', getGridTemplateRowsValue())}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        {/* <div className="divider font-bold text-lg">서브 제목</div> */}
                        <div className='grid grid-cols-2 gap-2'>
                            {rowValues.map((value, index) => (
                                <input
                                    key={index}
                                    type='radio'
                                    name='gridTemplateRows'
                                    className='btn'
                                    aria-label={value}
                                    value={value}
                                    checked={gridTemplateRows === value}
                                    onChange={() => setGridTemplateRows(value)}
                                />
                            ))}
                        </div>

                        {/* getGridTemplateRowsContent */}
                        <div>
                            {getGridTemplateRowsContent()}
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
                                    </div>
                                </>
                            ) : null
                        }
                    </div>
                </div>
            </div >

            {/* view 파트 */}
            <div id="view" className='w-full h-full flex items-center justify-center overflow-scroll'>
                <div id='grid-template-rows' className='w-[500px] h-[500px] grid bg-blue-50 shadow transition-transform duration-500 overflow-scroll'
                    style={{
                        gridTemplateRows: getGridTemplateRowsValue(),
                        transform: `translateY(${boxTranslateY}px)`,
                    }}
                >
                    {addBoxes(boxCount, { width: '100px', height: '100%' })}
                </div>
            </div>
        </>
    );
}

export default GridTemplateRows;