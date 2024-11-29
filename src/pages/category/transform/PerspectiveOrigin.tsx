// PerspectiveOrigin.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../utils/handleOptionToggle';
import { copyCss } from '../../../utils/clipboardUtils';

const PerspectiveOrigin: React.FC = () => {
    const [originX, setOriginX] = useState(50);
    const [originY, setOriginY] = useState(50);

    const [rotate3d, setRotate3d] = useState<{ position: string, elements: string, value: number }[]>([
        { position: 'x', elements: 'X Rotate', value: 0 },
        { position: 'y', elements: 'Y Rotate', value: 0 },
        { position: 'z', elements: 'Z Rotate', value: 0 },
    ]);

    // perspective-origin 업데이트
    const updateOrigin = (pos: string, inputValue: number) => {
        pos === 'x' ? setOriginX(inputValue) : setOriginY(inputValue);
    }
    // update rotate3d value
    const updateRotateValues = (position: string, inputValue: string,
        values: { position: string; elements: string; value: number }[],
        setValues: React.Dispatch<React.SetStateAction<{ position: string; elements: string; value: number }[]>>
    ) => {
        let value = isNaN(Number(inputValue)) ? 0 : Number(inputValue);
        value = Math.max(-360, Math.min(360, value));

        const newValues = values.map(item =>
            item.position === position ? { ...item, value } : item
        );
        setValues(newValues);
    };


    return (
        <>
            <div id='option-wrap' className='absolute top-10 left-6 z-[1000]'>
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
                        <div className='text-center pt-2 font-bold text-lg'>Perspective Origin</div>
                        <div className='px-4 text-xs text-right font-bold'><span className='text-red-700'>*</span> Unit: %</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div id='option-wrap-bottom' className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll px-2'>
                        <div className='text-center p-0.5 text-xs'>
                            perspective-origin:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={`${originX}% ${originY}%`}
                                readOnly
                            />
                            {/* 속성 복사 */}
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('perspective-origin', `${originX}% ${originY}%`)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        {/* origin X, Y */}
                        <div className="divider font-bold text-lg">Origin</div>
                        <div className='grid grid-cols-2 items-center text-center gap-2'>
                            <div className='font-bold text-sm'>Origin X</div>
                            <input type='number' className='btn btn-sm border-2 focus:border-gray-400 focus:outline-none'
                                value={originX}
                                style={{ MozAppearance: 'textfield' }}
                                onChange={(e) => updateOrigin('x', Number(e.target.value))}
                            />
                            <div className='font-bold text-sm'>Origin Y</div>
                            <input type='number' className='btn btn-sm border-2 focus:border-gray-400 focus:outline-none'
                                value={originY}
                                style={{ MozAppearance: 'textfield' }}
                                onChange={(e) => updateOrigin('y', Number(e.target.value))}
                            />
                        </div>

                        {/* Rotate 3D */}
                        <div className="divider font-bold text-lg">Rotate 3D</div>
                        <div className='grid grid-cols-2 items-center text-center gap-2'>
                            {rotate3d.map((rotate, index) => (
                                <React.Fragment key={index}>
                                    <div className='font-bold text-sm'>{rotate.elements}</div>
                                    <input type='number' className='btn btn-sm border-2 focus:border-gray-400 focus:outline-none' min={-360} max={360}
                                        value={rotate.value}
                                        style={{ MozAppearance: 'textfield' }}
                                        onChange={(e) => updateRotateValues(rotate.position, e.target.value, rotate3d, setRotate3d)}
                                    />
                                    <input type="range" min={-360} max="360" className="col-start-1 col-end-3 range range-xs mb-4" step="1"
                                        value={rotate.value}
                                        onChange={(e) => updateRotateValues(rotate.position, e.target.value, rotate3d, setRotate3d)}
                                    />
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* view 파트 */}
            <div id="view" className='relative w-full h-full flex items-center justify-center transition-perspective duration-500'
                style={{
                    transformStyle: 'preserve-3d',
                    perspective: '500px',
                    perspectiveOrigin: `${originX}% ${originY}%`
                }}
            >
                {/* 각 면의 x,y,z 순서 중요함 */}
                {/* 앞면 */}
                <div id='front' className='absolute w-[200px] h-[200px] bg-red-500 bg-opacity-80 border-2 border-black'
                    style={{
                        transform: `
                            rotate3d(1, 0, 0, ${rotate3d[0].value}deg)
                            rotate3d(0, 0, 1, ${rotate3d[2].value}deg)
                            rotate3d(0, 1, 0, ${-rotate3d[1].value}deg)
                            translateZ(100px)
                        `,
                    }}
                >
                    <div className='text-center font-bold text-2xl pt-10'>FRONT</div>
                </div>

                {/* 뒷면 */}
                <div id='back' className='absolute w-[200px] h-[200px] bg-orange-500 bg-opacity-80 border-2 border-black'
                    style={{
                        transform: `
                            rotate3d(1, 0, 0, ${rotate3d[0].value}deg)
                            rotate3d(0, 0, 1, ${rotate3d[2].value}deg)
                            rotate3d(0, 1, 0, ${-rotate3d[1].value}deg)
                            translateZ(-100px)
                        `,
                    }}
                >
                    <div className='text-center font-bold text-2xl pt-10' style={{ transform: 'rotateY(180deg)' }}>BACK</div>
                </div>

                {/* 우측면 */}
                <div id='right' className='absolute w-[200px] h-[200px] bg-yellow-500 bg-opacity-80 border-2 border-black'
                    style={{
                        transform: `
                            rotate3d(1, 0, 0, ${rotate3d[0].value}deg)
                            rotate3d(0, 0, 1, ${rotate3d[2].value}deg)
                            rotate3d(0, 1, 0, ${-rotate3d[1].value + 90}deg)
                            translateZ(100px)
                        `,
                    }}
                >
                    <div className='text-center font-bold text-2xl pt-10'>RIGHT</div>
                </div>

                {/* 좌측면 */}
                <div id='left' className='absolute w-[200px] h-[200px] bg-green-500 bg-opacity-80 border-2 border-black'
                    style={{
                        transform: `
                            rotate3d(1, 0, 0, ${rotate3d[0].value}deg)
                            rotate3d(0, 0, 1, ${rotate3d[2].value}deg)
                            rotate3d(0, 1, 0, ${-rotate3d[1].value + 90}deg)
                            translateZ(-100px)
                        `,
                    }}
                >
                    <div className='text-center font-bold text-2xl pt-10' style={{ transform: 'rotateY(180deg)' }}>LEFT</div>
                </div>

                {/* 윗면 */}
                <div id='top' className='absolute w-[200px] h-[200px] bg-blue-500 bg-opacity-80 border-2 border-black'
                    style={{
                        transform: `
                            rotate3d(1, 0, 0, ${rotate3d[0].value + 90}deg)
                            rotate3d(0, 1, 0, ${rotate3d[2].value}deg)
                            rotate3d(0, 0, 1, ${rotate3d[1].value}deg)
                            translateZ(100px)
                        `,
                    }}
                >
                    <div className='text-center font-bold text-2xl pt-10'>TOP</div>
                </div>

                {/* 아랫면 */}
                <div id='bottom' className='absolute w-[200px] h-[200px] bg-indigo-500 bg-opacity-80 border-2 border-black'
                    style={{
                        transform: `
                            rotate3d(1, 0, 0, ${rotate3d[0].value + 90}deg)
                            rotate3d(0, 1, 0, ${rotate3d[2].value}deg)
                            rotate3d(0, 0, 1, ${rotate3d[1].value}deg)
                            translateZ(-100px)
                        `,
                    }}
                >
                    <div className='text-center font-bold text-2xl pb-10' style={{ transform: 'rotateX(180deg)' }}>BOTTOM</div>
                </div>
            </div>
        </>
    );
}

export default PerspectiveOrigin;