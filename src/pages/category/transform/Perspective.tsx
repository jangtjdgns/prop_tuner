// Perspective.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../utils/handleOptionToggle';
import { copyCss } from '../../../utils/clipboardUtils';

const Perspective: React.FC = () => {
    const [perspective, setPerspective] = useState(1500);
    const [rotate3d, setRotate3d] = useState<{ position: string, elements: string, value: number }[]>([
        { position: 'x', elements: 'X Rotate', value: 0 },
        { position: 'y', elements: 'Y Rotate', value: 0 },
        { position: 'z', elements: 'Z Rotate', value: 0 },
    ]);


    // perspective 업데이트
    const updatePerspective = (inputValue: string) => {
        let value = isNaN(Number(inputValue)) ? 1500 : Number(inputValue);
        setPerspective(value);
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
                        <div className='text-center pt-2 font-bold text-lg'>Perspective</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div id='option-wrap-bottom' className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll px-2'>
                        <div className='text-center p-0.5 text-xs'>
                            perspective:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={perspective}
                                readOnly
                            />
                            {/* 속성 복사 */}
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('perspective', perspective, 'px')}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        {/* Perspective */}
                        <div className="divider font-bold text-lg">Perspective</div>
                        <div className='grid grid-cols-2 items-center text-center gap-2'>
                            <div className='font-bold text-sm'>perspective</div>
                            <input type='number' className='btn btn-sm border-2 focus:border-gray-400 focus:outline-none'
                                value={perspective}
                                style={{ MozAppearance: 'textfield' }}
                                onChange={(e) => updatePerspective(e.target.value)}
                            />
                            <input type="range" min={500} max="3000" className="col-start-1 col-end-3 range range-xs" step="100"
                                value={perspective}
                                onChange={(e) => updatePerspective(e.target.value)}
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
            <div id="view" className='relative w-full h-full flex items-center justify-center'
                style={{
                    transformStyle: 'preserve-3d',
                    perspective,
                    transform: 'perspective(500px)'
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

                {/* x축 기준선, red */}
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[1px] border border-red-500 text-right font-bold'
                    style={{
                        transformOrigin: '0 0 0',
                        transform: `
                            rotate3d(1, 0, 0, ${rotate3d[0].value}deg)
                            rotate3d(0, 0, 1, ${rotate3d[2].value}deg)
                            rotate3d(0, 1, 0, ${-rotate3d[1].value}deg)
                            translateX(-200px)
                        `,
                    }}
                >
                    <div className='relative right-2 text-red-500'>x</div>
                </div>
                {/* y축 기준선, blue */}
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[400px] border border-green-500 font-bold'
                    style={{
                        transformOrigin: '0 0 0',
                        transform: `
                            rotate3d(1, 0, 0, ${rotate3d[0].value}deg)
                            rotate3d(0, 0, 1, ${rotate3d[2].value}deg)
                            rotate3d(0, 1, 0, ${rotate3d[1].value}deg)
                            translateY(-200px)
                    `,
                    }}
                >
                    <div className='relative left-2 text-green-500'>y</div>
                </div>
                {/* z축 기준선, black */}
                <div className="absolute top-1/2 left-1/2 w-[1px] h-[400px] border border-blue-500 font-bold"
                    style={{
                        transformOrigin: '0 0 0',
                        transform: `
                            rotate3d(1, 0, 0, ${rotate3d[0].value + 90}deg)
                            rotate3d(0, 1, 0, ${rotate3d[2].value}deg)
                            rotate3d(0, 0, 1, ${rotate3d[1].value}deg)
                            translate3d(0, -50%, 0)
                    `,
                    }}
                >
                    <div className='relative top-[93%] left-2 text-blue-500'>z</div>
                </div>
            </div>
        </>
    );
}

export default Perspective;