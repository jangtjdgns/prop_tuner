// ObjectPosition.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../../utils/handleOptionToggle';
import { copyCss } from '../../../../utils/clipboardUtils';
import { useElementOverflowAdjustment } from '../../../../hooks/useElementOverflowAdjustment ';

const ObjectPosition: React.FC = () => {
    const [objectPositionX, setObjectPositionX] = useState('center');      // 포지션 수평 값
    const [objectPositionY, setObjectPositionY] = useState('center');      // 포지션 수직 값
    const [customValueX, setCustomValueX] = useState('50%');            // 포지션 수평 커스텀 값
    const [customValueY, setCustomValueY] = useState('50%');            // 포지션 수직 커스텀 값
    const objectPositionValues: string[] = ['center', 'left', 'right', 'top', 'bottom'];
    const [image, setImage] = useState('/images/모찌.jpg');
    const [boxTranslateY, setBoxTranslateY] = useState(0);


    // object-position 스타일 업데이트
    const updateObjectPosition = (
        position: 'x' | 'y'
        , isCustom: boolean
        , value: string
        , event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>
    ) => {
        const target = event.target as HTMLInputElement;
        const customValue: string = target.value !== 'on' ? target.value : value;

        if(position === 'x') {
            // 커스텀 속성을 선택한 경우 라디오 버튼의 선택 효과 제거
            if (isCustom) {
                setCustomValueX(customValue);
                setObjectPositionX(customValue); // 커스텀 입력 값으로 업데이트
                return;
            }
            setObjectPositionX(customValue)
        } else {
            if (isCustom) {
                setCustomValueY(customValue);
                setObjectPositionY(customValue);
                return;
            }
            setObjectPositionY(customValue);
        }
    }

    // 이미지 변경
    const changeImage = (event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        const imageUrl: string = target.value;

        if(imageUrl.length != 0) {
            setImage(imageUrl);
        }
    }

    const dependencies = [objectPositionX, objectPositionY, customValueX, customValueY, image];
    useElementOverflowAdjustment(['#object-position'], () => 0, setBoxTranslateY, dependencies);

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
                        <div className='text-center pt-2 font-bold text-lg'>Object Position</div>
                        <div className='px-4 text-xs text-right font-bold'><span className='text-red-700'>*</span> Basis: object-fit: none;</div>
                    </div>
                    
                    {/* 옵션 내용 하단 */}
                    <div className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll'>
                        {/* objectPosition */}
                        <div className='text-center p-0.5 text-xs'>
                            object-position:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={objectPositionX}
                                readOnly
                            />
                            <input type="text" className='input input-xs border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={objectPositionY}
                                readOnly
                            />
                            {/* object-position 복사 */}
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('object-position', `${objectPositionX} ${objectPositionY}`, false)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        <div className="divider font-bold text-lg">X-Values</div>
                        <div className='grid grid-cols-3 gap-2'>
                            {objectPositionValues.map((value, index) => (
                                <input
                                    key={index}
                                    type='radio'
                                    name='objectPositionX'
                                    className="btn border-2 focus:border-gray-400"
                                    aria-label={value}
                                    checked= {objectPositionX === value}
                                    onChange={(event) => updateObjectPosition('x', false, value, event)}
                                />
                            ))}
                            {/* 커스텀 속성 x */}
                            <button className="btn p-0">
                                <input type='text'
                                    className='input input-xs w-full h-full bg-transparent focus:outline-none border-2 focus:border-gray-400 text-center'
                                    onClick={(event) => updateObjectPosition('x', true, objectPositionX, event)}
                                    onChange={(event) => updateObjectPosition('x', true, objectPositionX, event)}
                                    value={customValueX}
                                    placeholder='Custom X'
                                />
                            </button>
                        </div>

                        <div className="divider font-bold text-lg">Y-Values</div>
                        <div className='grid grid-cols-3 gap-2'>
                            {objectPositionValues.map((value, index) => (
                                <input
                                    key={index}
                                    type='radio'
                                    name='objectPositionY'
                                    className="btn border-2 focus:border-gray-400"
                                    aria-label={value}
                                    checked= {objectPositionY === value}
                                    onChange={(event) => updateObjectPosition('y', false, value, event)}
                                />
                            ))}
                            {/* 커스텀 속성 y */}
                            <button className="btn p-0">
                                <input type='text'
                                    className='input input-xs w-full h-full bg-transparent focus:outline-none border-2 focus:border-gray-400 text-center'
                                    onClick={(event) => updateObjectPosition('y', true, objectPositionY, event)}
                                    onChange={(event) => updateObjectPosition('y', true, objectPositionY, event)}
                                    value={customValueY}
                                    placeholder='Custom Y'
                                />
                            </button>
                        </div>
                        
                        {/* 이미지 */}
                        <div className="divider font-bold text-lg">Image</div>
                        <button className="btn p-0">
                            <input type="text"
                                className="input input-xs w-full h-full bg-transparent focus:outline-none border-2 focus:border-gray-400 text-center"
                                onClick={changeImage}
                                onChange={changeImage}
                                value={image}
                                placeholder='image url'
                            />
                        </button>
                    </div>
                </div>
            </div>

            <div id="view" className='w-full h-full flex items-center justify-center overflow-scroll'>
                <div id='object-position' className='w-[500px] h-[500px] bg-blue-50 shadow transition-transform duration-300'
                    style={{ transform: `translateY(${boxTranslateY}px)` }}
                >
                    <img
                        src={image}
                        alt='no image'
                        style={{ 
                            objectFit: 'none'
                            , objectPosition: `${objectPositionX} ${objectPositionY}`
                        }}
                        id = 'view-image'
                        className='w-full h-full transition-all duration-200 bg-white bg-opacity-0 flex justify-center items-center text-xl'
                    />
                </div>
            </div>
        </>
    );
}

export default ObjectPosition;