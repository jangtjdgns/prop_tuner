// Display.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../utils/handleOptionToggle';
import { copyCss } from '../../../utils/clipboardUtils';
import { colorsRGB } from '../../../utils/colorUtils';
import { useOverflowHandler } from '../../../hooks/useOverflowHandler';

const Display: React.FC = () => {
    const [display, setDisplay] = useState('block');
    const [activeTags, setActiveTags] = useState([1, 1, 1, 1, 1]);                  // 현재 선택된 태그, 1 on, 0 off
    const childTagsColor: string[] = ['red', 'orange', 'yellow', 'green', 'blue']   // 자식 태그들 색상
    const [boxTranslateY, setBoxTranslateY] = useState(0);
    const displayValues: string[] = [
        'block'
        , 'inline-block'
        , 'inline'
        , 'flex'
        , 'inline-flex'
        , 'table'
        , 'inline-table'
        , 'table-caption'
        , 'table-cell'
        , 'table-column'
        , 'table-row'
        , 'flow-root'
        , 'grid'
        , 'inline-grid'
        , 'content'
        , 'list-item'
        , 'none'
    ];

    const updateDisplay = (value: string) => {
        setDisplay(value);
    };

    // 자식 태그 선택/해제 함수
    const updateActiveTags = (index: number) => {
        const updatedTags = [...activeTags];
        updatedTags[index] = activeTags[index] === 1 ? 0 : 1;
        setActiveTags(updatedTags);
    };

    useOverflowHandler(['#display'], () => 0, setBoxTranslateY, [display, activeTags]);

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
                        <div className='text-center pt-2 font-bold text-lg'>Display</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div id='option-wrap-bottom' className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll px-2'>
                        {/* display */}
                        <div className='text-center p-0.5 text-xs'>
                            display: <input type="text" className='input input-xs border-gray-200 w-24 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={display}
                                readOnly
                            />
                            {/* display 복사 */}
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2'
                                onClick={() => copyCss('display', display)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        {/* 속성을 적용할 태그 선택 */}
                        <div className='divider font-bold text-lg'>Select Tag</div>
                        <div className="flex grid grid-cols-5 gap-2">
                            {activeTags.map((tagState, index) => (
                                <input
                                    type="checkbox"
                                    key={index}
                                    className='btn'
                                    aria-label={`${index + 1}`}
                                    checked={tagState === 1}
                                    onChange={() => updateActiveTags(index)}
                                />
                            ))}
                        </div>

                        {/* display values */}
                        <div className='divider font-bold text-lg'>Values</div>
                        <div className='grid grid-cols-2 gap-2'>
                            {/* display values 태그 생성 */}
                            {displayValues.map(value => (
                                <input
                                    key={value}
                                    type='radio'
                                    name='breakValue'
                                    className='btn border-2 focus:border-gray-400'
                                    value={value}
                                    aria-label={value}
                                    checked={display === value}
                                    onChange={() => updateDisplay(value)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div id="view" className='w-full h-full flex items-center justify-center overflow-scroll font-mono'>
                <div id='display' className='transition-transform duration-300'
                    style={{ transform: `translateY(${boxTranslateY}px)` }}
                >
                    <div id="parent" className='w-[500px] h-[500px] bg-blue-50 shadow box-border rounded-none box-content'
                        style={{
                            ...(display === 'flex'
                                || display === 'inline-flex'
                                || display === 'grid'
                                || display === 'inline-grid'
                                || display === 'flow-root'
                                || display === 'table'
                                || display === 'inline-table'
                                ? { 'display': display } : {}),
                            ...(display.startsWith('table-')
                                ? { 'display': 'table' } : {}),
                            ...(display.endsWith('-table')
                                ? { 'display': 'table' } : {})
                        }}
                    >
                        {/* 자식 태그 생성 */}
                        {childTagsColor.map((color, index) => (
                            <div key={index}
                                className='children w-[100px] h-[100px] text-center text-xs font-bold'
                                style={{
                                    backgroundColor: `rgba(${colorsRGB[color.toLowerCase()]})`,
                                    display: activeTags[index] === 1 ? display : undefined
                                }}
                            >
                                CHILDREN {index + 1}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Display;