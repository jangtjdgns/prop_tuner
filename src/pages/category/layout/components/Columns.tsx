// Columns.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../../utils/handleOptionToggle';
import { copyCss } from '../../../../utils/clipboardUtils';

const Columns: React.FC = () => {
    const [columnWidth, setColumnWidth] = useState('auto');
    const displayColumnWidth = columnWidth === 'auto' ? columnWidth : `${columnWidth}px`;
    const [columnCount, setColumnCount] = useState<string | number>(1);
    const [columnGap, setColumnGap] = useState('auto');
    const [columnRuleWidth, setColumnRuleWidth] = useState(0);
    const [columnRuleStyle, setColumnRuleStyle] = useState('none');
    const [columnRuleColor, setColumnRuleColor] = useState('none');


    // column-width 업데이트 함수
    const updateColumnWidth = (event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        const width: string = target.value;

        if (!isNaN(Number(width)) && width.length != 0) {
            setColumnWidth(width);
        } else {
            setColumnWidth('auto');
        }
    };

    // column-count 업데이트 함수
    const updateColumnCount = (event: string | React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>) => {
        if (typeof event === 'string') {
            setColumnCount(event);
        } else {
            const target = event.target as HTMLInputElement;
            const count: number = Number(target.value);
            !(count > 0 && count <= 10) ? setColumnCount(1) : setColumnCount(count);    // 1~10 데이터 입력 제한
        }
    }

    // column-gap 업데이트 함수
    const updateColumnGap = (event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        const gap: string = target.value;

        if (!isNaN(Number(gap)) && gap.length !== 0) {
            setColumnGap(gap);
        } else {
            setColumnGap('auto');
        }
    }

    // column-rule 속성 활성화 버튼, 토글
    const activateColumnRuleProperty = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        const activateBtn = target.checked;     // column-rule 속성 버튼 활성화 유무
        const columnRuleWrap = document.getElementById('column-rules-wrap') as HTMLElement;
        
        columnRuleWrap.classList.toggle('hidden')

        if(activateBtn) {
            setColumnRuleWidth(5);
            setColumnRuleStyle('solid')
            setColumnRuleColor('#000000')
        } else {
            setColumnRuleWidth(0);
            setColumnRuleStyle('none')
            setColumnRuleColor('none')
        }
    }

    // column-rule-width 업데이트 함수
    const updateColumnRuleWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        const value: number = Number(target.value);

        if (!isNaN(value)) {
            setColumnRuleWidth(value);
        } else {
            setColumnRuleWidth(5);
        }
    }

    // column-rule-style 업데이트 함수
    const updateColumnRuleStyle = (value:string) => {
        setColumnRuleStyle(value);
    }

    // column-rule-color 업데이트 함수
    const updateColumnRuleColor = (event: React.ChangeEvent<HTMLInputElement>) => {
        const color = event.target.value;
        setColumnRuleColor(color);
    }

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
                        <div className='text-center pt-2 font-bold text-lg'>Columns</div>
                        <div className='px-4 text-xs text-right font-bold'><span className='text-red-700'>*</span> Unit: px</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div className='flex flex-col max-h-[360px] overflow-y-scroll'>
                        {/* column-width */}
                        <div className='text-center p-0.5 text-xs'>
                            column-width: <input type="text" className='input input-xs border-gray-200 w-20 rounded focus:outline-none focus:border-gray-200 text-center' value={columnWidth} readOnly />
                            {/* column-width 복사 */}
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2'
                                onClick={() => copyCss('column-width', columnWidth, true)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>
                        <button className="btn p-0">
                            <input type="text"
                                className='input input-xs w-full h-full bg-transparent focus:outline-none border-2 focus:border-gray-400 text-center'
                                value={columnWidth}
                                onClick={(event) => updateColumnWidth(event)}
                                onChange={(event) => updateColumnWidth(event)}
                                placeholder='width'
                            />
                        </button>

                        {/* column-count */}
                        <div className='text-center p-0.5 text-xs'>
                            column-count: <input type="text" className='input input-xs border-gray-200 w-20 rounded focus:outline-none focus:border-gray-200 text-center px-2' value={columnCount} readOnly />
                            {/* column-count 복사 */}
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2'
                                onClick={() => copyCss('column-count', columnCount, false)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>
                        <div className='grid grid-cols-2 gap-2'>
                            <button className="btn border-2 focus:border-gray-400" onClick={() => updateColumnCount('auto')}>auto;</button>
                            <input type="number" className="btn focus:outline-none border-2 focus:border-gray-400"
                                value={columnCount}
                                onClick={updateColumnCount}
                                onChange={updateColumnCount}
                                min="1" max="10"
                                placeholder='count' />
                        </div>

                        {/* column-gap */}
                        <div className='text-center p-0.5 text-xs'>
                            column-gap: <input type="text" className='input input-xs border-gray-200 w-20 rounded focus:outline-none focus:border-gray-200 text-center px-2' value={columnGap} readOnly />
                            {/* column-count 복사 */}
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2'
                                onClick={() => copyCss('column-gap', columnGap, true)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>
                        <input type="text" className="btn focus:outline-none border-2 focus:border-gray-400"
                            value={columnGap}
                            onClick={updateColumnGap}
                            onChange={updateColumnGap}
                            placeholder='gap'
                        />

                        {/* column-rule 속성 활성화 버튼 */}
                        <div className='divider flex items-center justify-center text-xs'>
                            <span className='font-bold'>Column Rule</span>
                            <input type="checkbox"
                                id="toggle-column-rule"
                                className="toggle toggle-info toggle-sm"
                                onChange={activateColumnRuleProperty}
                            />
                        </div>

                        {/* column-rule 속성 wrap */}
                        <div id="column-rules-wrap" className='flex flex-col gap-2 hidden'>
                            {/* column-rule-width */}
                            <div className='text-center p-0.5 text-xs'>
                                column-rule-width: <input type="text" className='input input-xs border-gray-200 w-20 rounded focus:outline-none focus:border-gray-200 text-center px-2' value={columnRuleWidth} readOnly />
                                {/* column-rule-width 복사 */}
                                <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2'
                                    onClick={() => copyCss('column-rule-width', columnRuleWidth, true)}
                                >
                                    <FontAwesomeIcon icon={faCopy} />
                                </button>
                            </div>
                            <input type="text" className="btn focus:outline-none border-2 focus:border-gray-400"
                                value={columnRuleWidth}
                                onChange={(event) => updateColumnRuleWidth(event)}
                                placeholder='rule-width'
                            />

                            {/* column-rule-style */}
                            <div className='text-center p-0.5 text-xs'>
                                column-rule-style: <input type="text" className='input input-xs border-gray-200 w-20 rounded focus:outline-none focus:border-gray-200 text-center px-2' value={columnRuleStyle} readOnly />
                                {/* column-rule-style 복사 */}
                                <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2'
                                    onClick={() => copyCss('column-rule-style', columnRuleStyle, false)}
                                >
                                    <FontAwesomeIcon icon={faCopy} />
                                </button>
                            </div>
                            <div className='grid grid-cols-2 gap-2'>
                                <input type='radio' name='columnRuleStyle' className="btn border-2 focus:border-gray-400" value='solid' aria-label='solid'
                                    checked={columnRuleStyle === 'solid'}
                                    onChange={() => updateColumnRuleStyle('solid')}
                                 />
                                <input type='radio' name='columnRuleStyle' className="btn border-2 focus:border-gray-400" value='dotted' aria-label='dotted'
                                    checked={columnRuleStyle === 'dotted'}
                                    onChange={() => updateColumnRuleStyle('dotted')}
                                />
                            </div>

                            {/* column-rule-color */}
                            <div className='text-center p-0.5 text-xs'>
                                column-rule-color: <input type="text" className='input input-xs border-gray-200 w-20 rounded focus:outline-none focus:border-gray-200 text-center px-2' value={columnRuleColor} readOnly />
                                {/* column-rule-style 복사 */}
                                <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2'
                                    onClick={() => copyCss('column-rule-color', columnRuleColor, false)}
                                >
                                    <FontAwesomeIcon icon={faCopy} />
                                </button>
                            </div>
                            <div className='grid grid-cols-3 gap-2'>
                                <input type="color" className="col-start-1 col-end-2 btn p-0 w-full"
                                    value={columnRuleColor}
                                    onChange={(event) => updateColumnRuleColor(event)}
                                />
                                <input type="text" className="col-start-2 col-end-4 btn focus:outline-none border-2 focus:border-gray-400"
                                    value={columnRuleColor}
                                    onChange={(event) => updateColumnRuleColor(event)}
                                    placeholder='rule-color'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="view" className='w-full h-full flex items-start justify-center'>
                <div className='overflow-x-scroll'>
                    <p className='w-full' style={{
                        columnCount: columnCount
                        , columnWidth: displayColumnWidth
                        , columnGap: `${columnGap}px`
                        , columnRuleWidth: `${columnRuleWidth}px`
                        , columnRuleStyle: columnRuleStyle
                        , columnRuleColor: columnRuleColor
                    }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis nisl dolor. Curabitur rutrum eros justo, tincidunt porttitor urna aliquam vel. Mauris bibendum arcu massa, nec iaculis libero dictum vitae. Vestibulum sollicitudin congue diam ac feugiat. Proin vitae ante efficitur, finibus dolor eu, sagittis ipsum. Curabitur sodales pharetra enim, vitae gravida dolor gravida porta. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla varius ornare lacus. Quisque sed lectus a metus blandit pulvinar semper sagittis nunc. Etiam vel lobortis nibh. Morbi id orci sit amet purus porta mollis at eu sapien. Nulla facilisi.
                        Ut vehicula sed ligula sed fermentum. Duis id orci id augue dapibus molestie id sit amet mauris. Mauris at diam pretium ante vulputate euismod ultricies eget quam. Sed erat metus, tristique at urna ut, vulputate vehicula massa. Phasellus a magna tincidunt nisi condimentum efficitur. Phasellus fermentum volutpat ligula. Fusce vitae arcu eget orci facilisis posuere ac sed nulla. Maecenas vel arcu ultrices metus commodo egestas eu et velit. Aliquam ac elit vestibulum dui ornare commodo sit amet a nisi. Suspendisse ac mauris volutpat, semper ipsum sed, fringilla eros. Nulla eu aliquet turpis, quis bibendum leo.
                        Curabitur nulla risus, sagittis a eleifend porttitor, congue at ligula. Quisque tincidunt velit magna, vitae suscipit est condimentum in. Sed pellentesque, ante nec tempor tincidunt, quam mi cursus nisl, in semper mi enim id lorem. Etiam interdum neque id ligula convallis dictum. Maecenas consectetur quis dui non placerat. Ut cursus tellus quis placerat hendrerit. Vivamus condimentum orci ut ultricies lobortis. Vestibulum in mauris vulputate libero viverra pretium id a justo. Donec ultricies venenatis nisi, sit amet accumsan urna gravida quis. Aliquam iaculis cursus sem vitae tincidunt. In mauris purus, viverra id eleifend id, congue molestie diam. Morbi leo turpis, posuere viverra consequat vitae, pharetra et odio. In volutpat tristique sem. Vestibulum posuere turpis vel sapien finibus facilisis a nec sem. Integer suscipit, risus ac laoreet volutpat, lacus lectus iaculis metus, at viverra dolor neque ac felis. Duis blandit leo at elit scelerisque lacinia.
                        Duis porttitor efficitur augue non auctor. Vivamus ut felis id quam auctor feugiat. Suspendisse consequat lorem ac odio vehicula pretium. Ut in convallis dui. Quisque ac laoreet lacus, rutrum iaculis nisi. Maecenas posuere vestibulum mi id laoreet. Suspendisse mi quam, aliquet nec molestie sed, elementum eget sapien. Cras tempus diam ac eleifend lobortis. Aenean rutrum vulputate lectus.
                        Sed finibus maximus ultricies. Donec quis metus sed ligula euismod rhoncus sit amet ut neque. In molestie laoreet ultrices. Cras eget tincidunt quam, nec porta elit. In velit leo, aliquam sit amet ultrices ac, ornare id ipsum. Duis in molestie lectus. Aenean fringilla varius ante sit amet iaculis. Nunc malesuada fermentum tellus auctor dignissim.
                    </p>
                </div>
            </div>
        </>
    );
}

export default Columns;