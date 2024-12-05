// Float.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../utils/handleOptionToggle';
import { copyCss } from '../../../utils/clipboardUtils';
import { addBoxes } from '../../../utils/commonElements';
import { useOverflowHandler } from '../../../hooks/useOverflowHandler';

const Float: React.FC = () => {
    type FloatValue = 'none' | 'right' | 'left';
    type ClearValue = 'none' | 'right' | 'left' | 'both';

    // float
    const [float, setFloat] = useState<FloatValue>('none');
    const floatValues: string[] = ['none', 'right', 'left'];;
    const [floatTags, setFloatTags] = useState([1, 0, 0, 0, 0]);

    // clear
    const [clear, setClear] = useState<ClearValue>('none');
    const clearValues: string[] = ['none', 'right', 'left', 'both'];
    const [useClear, setUseClear] = useState(false);
    const [clearTags, setClearTags] = useState(Array(5).fill(0));

    const [boxTranslateY, setBoxTranslateY] = useState(0);

    // 속성 적용
    const updateProperty = (index: number, prop: string) => {
        if (prop === 'float') {
            const updatedTags = [...floatTags];
            updatedTags[index] = Number(!Boolean(floatTags[index]));
            setFloatTags(updatedTags);
        } else {
            const updatedTags = [...clearTags];
            updatedTags[index] = Number(!Boolean(clearTags[index]));
            setClearTags(updatedTags);
        }

    };

    useOverflowHandler(['#float'], () => 0, setBoxTranslateY, [float, clear, floatTags, clearTags]);

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
                        <div className='text-center pt-2 font-bold text-lg'>Float</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div id='option-wrap-bottom' className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll px-2'>
                        {/* float */}
                        <div className='text-center p-0.5 text-xs'>
                            float: <input type="text" className='input input-xs border-gray-200 w-24 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={float}
                                readOnly
                            />
                            {/* float 복사 */}
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('float', float)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        {/* float 속성을 적용할 태그 선택 */}
                        <div className='divider font-bold text-lg'>Check Box</div>
                        <div className="flex grid grid-cols-5 gap-2">
                            {floatTags.map((isChecked, index) => (
                                <input type="checkbox"
                                    key={index}
                                    className='btn btn-sm'
                                    aria-label={`${index + 1}`}
                                    checked={Boolean(isChecked)}
                                    onChange={() => updateProperty(index, 'float')}
                                />
                            ))}
                        </div>

                        {/* float values */}
                        <div className='divider font-bold text-lg'>Float</div>
                        <div className='grid grid-cols-3 gap-2'>
                            {floatValues.map(value => (
                                <input
                                    key={value}
                                    type='radio'
                                    name='float'
                                    className='btn border-2 focus:border-gray-400'
                                    value={value}
                                    aria-label={value}
                                    checked={float === value}
                                    onChange={() => setFloat(value as FloatValue)}
                                />
                            ))}
                        </div>

                        {/* clear 속성 활성화 버튼 */}
                        <div className='divider mb-0'></div>
                        <div className='flex items-center justify-center gap-2'>
                            <span className='font-bold text-xl'>Clear</span>
                            <input type="checkbox"
                                id="toggle-clear"
                                className="toggle toggle-info toggle-sm"
                                onChange={(e) => {
                                    setUseClear(!useClear);
                                    if (!e.target.checked) {
                                        setClear('none');
                                        setClearTags(Array(5).fill(0));
                                    }
                                }}
                            />
                        </div>

                        {/* clear 속성 wrap */}
                        {
                            useClear ? (
                                <div id="clear-wrap" className='flex flex-col gap-2'>
                                    {/* clear */}
                                    <div className='text-center p-0.5 text-xs'>
                                        clear: <input type="text" className='input input-xs border-gray-200 w-24 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                            value={clear}
                                            readOnly
                                        />
                                        {/* clear 복사 */}
                                        <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                            onClick={() => copyCss('clear', clear)}
                                        >
                                            <FontAwesomeIcon icon={faCopy} />
                                        </button>
                                    </div>

                                    {/* clear 속성을 적용할 태그 선택 */}
                                    <div className='divider font-bold text-lg'>Check Box</div>
                                    <div className="flex grid grid-cols-5 gap-2">
                                        {clearTags.map((isChecked, index) => (
                                            <input type="checkbox"
                                                key={index}
                                                className='btn btn-sm'
                                                aria-label={`${index + 1}`}
                                                checked={Boolean(isChecked)}
                                                onChange={() => updateProperty(index, 'clear')}
                                            />
                                        ))}
                                    </div>

                                    {/* clear values */}
                                    <div className='divider font-bold text-lg'>Clear</div>
                                    <div className='grid grid-cols-4 gap-2'>
                                        {/* clear values 태그 생성 */}
                                        {clearValues.map(value => (
                                            <input
                                                key={value}
                                                type='radio'
                                                name='clear'
                                                className='btn border-2 focus:border-gray-400'
                                                value={value}
                                                aria-label={value}
                                                checked={clear === value}
                                                onChange={() => setClear(value as ClearValue)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                </div>
            </div>

            <div id="view" className='w-full h-full flex items-center justify-center overflow-scroll font-mono'>
                <div id='float' className='transition-transform duration-300'
                    style={{ transform: `translateY(${boxTranslateY}px)` }}
                >
                    <div className='w-[500px] h-[500px] bg-blue-50 shadow box-border rounded-none box-content'>
                        {
                            addBoxes(5, { width: 100, height: 100 }, ''
                                , Array.from({ length: 5 }, (_, index) => ({
                                    float: floatTags[index] === 1 ? float : 'none',
                                    clear: clearTags[index] === 1 ? clear : 'none'
                                }))
                                , true
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Float;