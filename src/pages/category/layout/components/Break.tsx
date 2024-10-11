// Break.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../../utils/handleOptionToggle';
import { copyCss } from '../../../../utils/clipboardUtils';

const Break: React.FC = () => {
    const [breakType, setBreakType] = useState('after');    // after, before, inside
    let breakTypeCap = breakType.charAt(0).toUpperCase() + breakType.slice(1);    // breakType 첫번째 문자만 대문자로 변경, 속성으로 사용하기 위함
    const [breakValue, setBreakValue] = useState('auto');
    const [activeTag, setActiveTag] = useState(2);          // 현재 선택된 태그 번호

    // 현재 활성화된 태그를 변경하는 함수, 스타일을 지정할 태그 선택
    const handleTagSelect = (tagIndex: number) => {
        setActiveTag(tagIndex);
    };

    // break${type} 업데이트 함수
    const updateBreakType = (value: string) => {
        setBreakType(value);
        breakTypeCap = breakType.charAt(0).toUpperCase() + breakType.slice(1);
    };

    // break value 업데이트 함수
    const updateBreakValue = (value: string) => {
        setBreakValue(value);
    };

    // break 타입(속성)에 맞는 값 가져오기
    const getBreakValuesByType = (type: string) => {
        switch (type) {
            case 'after':
            case 'before':
                return ['auto', 'avoid', 'always', 'page', 'left', 'right'];
            case 'inside':
                return ['auto', 'avoid', 'avoid-page', 'avoid-column'];
            default:
                return [];
        }
    };


    // 프린트 창 설정 및 띄우기
    const handlePrint = () => {
        const printContent = document.getElementById('view')?.innerHTML;
        const newWindow = window.open('', '_blank');
        newWindow?.document.write(`
            <html>
                <head>
                    <title>Show Print View</title>
                    <script src="https://cdn.tailwindcss.com"></script>
                </head>
                <body onload="window.print(); window.close();">
                    <div id="view" class='w-full h-full flex flex-col items-center justify-start'>
                        ${printContent}
                    </div>
                </body>
            </html>
        `);
        newWindow?.document.close();
    };

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
                        <div className='text-center pt-2 font-bold text-lg'>Break</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll'>
                        <div className='text-center p-0.5 text-xs'>
                            break-{breakType}: <input type="text" className='input input-xs border-gray-200 w-20 rounded focus:outline-none focus:border-gray-200 text-center px-2' value={breakValue} readOnly />
                            {/* column-width 복사 */}
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2'
                                onClick={() => copyCss(`break-${breakType}`, breakValue, false)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        {/* print preview */}
                        <button className='btn' onClick={handlePrint}>Show Print Preivew</button>

                        {/* 속성을 적용할 태그 선택 */}
                        <div className='divider font-bold text-lg'>Select Tag</div>
                        <div className="flex grid grid-cols-4 gap-2">
                            <input type='radio' className="btn" value={1} aria-label='1' checked={activeTag === 1} onChange={() => handleTagSelect(1)} />
                            <input type='radio' className="btn" value={2} aria-label='2' checked={activeTag === 2} onChange={() => handleTagSelect(2)} />
                            <input type='radio' className="btn" value={3} aria-label='3' checked={activeTag === 3} onChange={() => handleTagSelect(3)} />
                            <input type='radio' className="btn" value={4} aria-label='4' checked={activeTag === 4} onChange={() => handleTagSelect(4)} />
                        </div>

                        {/* break-타입 지정, break-${breakType} */}
                        <div className='divider font-bold text-lg'>Property Type</div>
                        <div className='grid grid-cols-3 gap-2'>
                            <input type='radio' name='breakType' className="btn border-2 focus:border-gray-400" value='after' aria-label='after' onChange={() => updateBreakType('after')} defaultChecked />
                            <input type='radio' name='breakType' className="btn border-2 focus:border-gray-400" value='before' aria-label='before' onChange={() => updateBreakType('before')} />
                            <input type='radio' name='breakType' className="btn border-2 focus:border-gray-400" value='inside' aria-label='inside' onChange={() => updateBreakType('inside')} />
                        </div>

                        {/* break values */}
                        <div className='divider font-bold text-lg'>Values</div>
                        {/* breka 타입(속성)에 맞는 value 생성 */}
                        <div className='grid grid-cols-2 gap-2'>
                            {getBreakValuesByType(breakType).map(value => (
                                <input
                                    key={value} type='radio' name='breakValue' value={value}
                                    aria-label={value}
                                    className='btn border-2 focus:border-gray-400'
                                    checked={breakValue === value}
                                    onChange={() => updateBreakValue(value)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div id="view" className='w-full h-full flex flex-col items-center justify-start'>
                <div className='text-xl font-bold pb-4'>This property can be recognized when printing a document or displaying the print preview.</div>
                <div className='flex flex-col gap-4 font-bold'>
                    <div className='flex items-center gap-2'>
                        <span>{activeTag === 1 ? <FontAwesomeIcon icon={faCheck} /> : ''}</span>
                        <div className=' w-[600px] p-2 border-4 border-red-400' 
                            style={activeTag === 1 ? { [`break${breakTypeCap}`]: breakValue } : {}}
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quam.
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <span>{activeTag === 2 ? <FontAwesomeIcon icon={faCheck} /> : ''}</span>
                        <div className='w-[600px] p-2 border-4 border-orange-400' 
                            style={activeTag === 2 ? { [`break${breakTypeCap}`]: breakValue } : {}}
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur facilisis.
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <span>{activeTag === 3 ? <FontAwesomeIcon icon={faCheck} /> : ''}</span>
                        <div className='w-[600px] p-2 border-4 border-yellow-700' 
                            style={activeTag === 3 ? { [`break${breakTypeCap}`]: breakValue } : {}}
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu.
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <span>{activeTag === 4 ? <FontAwesomeIcon icon={faCheck} /> : ''}</span>
                        <div className='w-[600px] p-2 border-4 border-green-700' 
                            style={activeTag === 4 ? { [`break${breakTypeCap}`]: breakValue } : {}}
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Break;