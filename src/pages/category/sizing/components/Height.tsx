// Height.tsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../../utils/handleOptionToggle';
import { copyCss } from '../../../../utils/clipboardUtils';

const Height: React.FC = () => {
    type Units = 'px' | '%' | 'vw' | 'rem';
    const [height, setHeight] = useState(200);
    const [unit, setUnit] = useState<Units>('px');
    const unitValues = ['px', '%', 'vw', 'rem']
    const [boxTranslateY, setBoxTranslateY] = useState(0);

    // update 너비
    const updateHeight = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const value = inputValue === '' || isNaN(Number(inputValue)) ? 200 : Number(inputValue);
        setHeight(value);
    }

    // unit 업데이트 (단위 변경)
    const updateUnit = (value: Units) => {
        setUnit(value);
    }

    // height가 #view태그의 높이를 벗어나는지 확인 후 윗 부분이 잘리는 부분 처리
    const adjustOverflowHeight = () => {
        const viewTag = document.querySelector('#view') as Element;
        const heightTag = document.querySelector('#view>.height') as Element;

        if (heightTag) {
            if (heightTag.clientHeight > viewTag.clientHeight) {
                return setBoxTranslateY((heightTag.clientHeight - viewTag.clientHeight) / 2);
            }
            setBoxTranslateY(0);
        }
    }

    useEffect(() => {
        setTimeout(() => {
            adjustOverflowHeight();
        }, 500);
    }, [height, unit]);


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
                        <div className='text-center pt-2 font-bold text-lg'>Height</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll'>
                        {/*height */}
                        <div className='text-center p-0.5 text-xs'>
                            height:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={height}
                                readOnly
                            />
                            {/* 속성 복사 */}
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('height', `${height}${unit}`, false)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        <div className='grid'>
                            <input type="text" className="btn border-2 focus:border-gray-400"
                                value={height}
                                onChange={updateHeight}
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
                    </div>
                </div>
            </div>

            {/* view 파트 */}
            <div id="view" className='w-full h-full flex items-center justify-center'>
                <div className='height w-[200px] transition-height duration-300'
                    style={{
                        height: `${height}${unit}`,
                        backgroundImage: 'linear-gradient(to bottom, #00dbde 0%, #fc00ff 100%)',
                        transform: `translateY(${boxTranslateY}px)`
                    }}
                ></div>
            </div>
        </>
    );
}

export default Height;