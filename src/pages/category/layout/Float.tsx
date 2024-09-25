// Float.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../utils/handleOptionToggle';
import { copyCss } from '../../../utils/clipboardUtils';
import { colorsRGB } from '../../../utils/colorUtils';

const Display: React.FC = () => {
    const floatValues: string[] = ['none', 'right', 'left'];
    type FloatValue = 'none' | 'right' | 'left';

    const [float, setFloat] = useState<FloatValue>('none');
    const [activeTags, setActiveTags] = useState([1, 0, 0, 0, 0]);
    const childTagsColor: string[] = ['red', 'orange', 'yellow', 'green', 'blue']   // 자식 태그들 색상

    const updateFloat = (value: FloatValue) => {
        setFloat(value);
    };

    const handleTagToggle = (index: number) => {
        const updatedTags = [...activeTags];
        updatedTags[index] = activeTags[index] === 1 ? 0 : 1;
        setActiveTags(updatedTags);
    };

    return (
        <>
            <div id='option-wrap' className='absolute top-10 left-6 transition-transform duration-500'>
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
                        <div className='text-center pt-2 font-bold text-lg'>Float</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll'>
                        {/* float */}
                        <div className='text-center p-0.5 text-xs'>
                            float: <input type="text" className='input input-xs border-gray-200 w-24 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                            value={float}
                            readOnly
                        />
                            {/* display 복사 */}
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2'
                                onClick={() => copyCss('float', float, false)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        {/* 속성을 적용할 태그 선택 */}
                        <div className='divider font-bold text-lg'>Select Tag</div>
                        <div className="flex grid grid-cols-5 gap-2">
                            {activeTags.map((tag, index) => (
                                <input type="checkbox"
                                    key={index}
                                    className='btn'
                                    aria-label={`${index + 1}`}
                                    checked={tag === 1}
                                    onChange={() => handleTagToggle(index)}
                                />
                            ))}
                        </div>
                        
                        {/* float values */}
                        <div className='divider font-bold text-lg'>Values</div>
                        <div className='grid grid-cols-2 gap-2'>
                            {/* float values 태그 생성 */}
                            {floatValues.map(value => (
                                <input
                                    key={value}
                                    type='radio'
                                    name='float'
                                    className='btn border-2 focus:border-gray-400'
                                    value={value}
                                    aria-label={value}
                                    checked={float === value}
                                    onChange={() => updateFloat(value as FloatValue)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div id="view" className='w-full h-full flex flex-col items-center justify-start'>
                <div id="parent" className='w-[400px] h-[400px] border-2 border-black bg-white box-border rounded-none'
                    
                >
                    {/* 자식 태그 생성 */}
                    {childTagsColor.map((color, index) => (
                        <div className={`children border-2 w-[calc(400px/5)] h-[calc(400px/5)] text-center text-xs font-bold`}
                            key={index}
                            style={{
                                border: `2px solid rgb(${colorsRGB[color.toLowerCase()]})`,
                                backgroundColor: `rgba(${colorsRGB[color.toLowerCase()]}, 0.2)`,
                                float: activeTags[index] === 1 ? float : 'none'
                            }}
                        >
                            Children {index + 1}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Display;