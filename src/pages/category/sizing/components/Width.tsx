// 기본 레이아웃 형식(복사용 tsx 파일).tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../../utils/handleOptionToggle';
import { copyCss } from '../../../../utils/clipboardUtils';

const Width: React.FC = () => {
    type Units = 'px' | '%' | 'vw' | 'rem';
    const [width, setWidth] = useState(200);
    const [unit, setUnit] = useState<Units>('px');
    const unitValues = ['px', '%', 'vw', 'rem']
    const [boxColor, setBoxColor] = useState('#ef4444');

    // update 너비
    const updateWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const value = inputValue === '' || isNaN(Number(inputValue)) ? 200 : Number(inputValue);
        setWidth(value);
    }

    // unit 업데이트 (단위 변경)
    const updateUnit = (value: Units) => {
        setUnit(value);
    }

    // 박스 색상 업데이트
    const updateBoxColor = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBoxColor(event.target.value);
    }

    // js
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
                        <div className='text-center pt-2 font-bold text-lg'>Width</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll'>
                        {/* width */}
                        <div className='text-center p-0.5 text-xs'>
                            width:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={width}
                                readOnly
                            />
                            {/* 속성 복사 */}
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('width', `${width}${unit}`, false)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        <div className="divider font-bold text-lg">Values</div>
                        <div className='grid'>
                            <input type="text" className="btn border-2 focus:border-gray-400"
                                value={width}
                                onChange={updateWidth}
                            />
                        </div>

                        {/* unit */}
                        <div className="divider font-bold text-base">Unit</div>
                        <div className='grid grid-cols-4 gap-2'>
                            {unitValues.map((value, index) => (
                                <input key={index} type="radio" name='unit'
                                    className='btn border-2'
                                    aria-label={value}
                                    value={value}
                                    checked={unit === value}
                                    onChange={() => updateUnit(value as Units)}
                                />
                            ))}
                        </div>

                        {/* Box Color */}
                        <div className="divider font-bold text-base">Color</div>
                        <div className='grid grid-cols-3 gap-2'>
                            <input type="color" className="col-start-1 col-end-2 btn p-0 w-full"
                                value={boxColor}
                                onChange={(event) => updateBoxColor(event)}
                            />
                            <input type="text" className="col-start-2 col-end-4 btn focus:outline-none border-2 focus:border-gray-400"
                                value={boxColor}
                                onChange={(event) => updateBoxColor(event)}
                                placeholder='Box color'
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* view 파트 */}
            <div id="view" className='w-full h-full flex flex-col items-center justify-start'>
                <div className='h-[200px] bg-red-500 transition-width duration-200'
                    style={{
                        width: `${width}${unit}`,
                        backgroundColor: boxColor,
                    }}
                ></div>
            </div>
        </>
    );
}

export default Width;