// Color.tsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../utils/handleOptionToggle';
import { copyCss } from '../../../utils/clipboardUtils';
import { hexToRgb, hexToRgba, hexToHsl, hexToHsla } from '../../../utils/colorUtils';
import { useElementOverflowAdjustment } from '../../../hooks/useElementOverflowAdjustment ';

const Color: React.FC = () => {
    const [colorType, setColorType] = useState('hex');
    const colorTypeValues: string[] = ['hex', 'rgb', 'rgba', 'hsl', 'hsla'];        // 색상 값 타입
    const [color, setColor] = useState('#000000');                                  // 색상 값
    const [hexColor, setHexColor] = useState('#000000');                            // 16진수, 기준 헥스코드
    const [colorOpacity, setColorOpacity] = useState(1);                            // 색상 투명도

    const [boxTranslateY, setBoxTranslateY] = useState(0);

    // update colorType
    const updateColorType = (event: React.ChangeEvent<HTMLInputElement>) => {
        const type = event.target.value;
        const opacityWrap = document.querySelector('#opacity-wrap') as Element;
        type === 'rgba' || type === 'hsla' ? opacityWrap.classList.remove('hidden') : opacityWrap.classList.add('hidden');

        setColorType(type);
    }

    // update color
    const updateColor = (event: React.ChangeEvent<HTMLInputElement>) => {
        let colorValue = event.target.value;
        setHexColor(colorValue);
    }

    // 색상 변환 함수
    const convertColor = () => {
        let colorValue = hexColor;
        switch (colorType) {
            case 'hex': break;
            case 'rgb': colorValue = hexToRgb(hexColor); break;
            case 'rgba': colorValue = hexToRgba(hexColor, colorOpacity); break;
            case 'hsl': colorValue = hexToHsl(hexColor); break;
            case 'hsla': colorValue = hexToHsla(hexColor, colorOpacity); break;
        }
        setColor(colorValue);
    }

    // update opacity
    const updateOpacity = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const value = inputValue === '' || isNaN(Number(inputValue)) ? 1 : Number(inputValue);
        setColorOpacity(value);
    }

    const dependencies = [colorType, color, hexColor, colorOpacity];
    useEffect(() => { convertColor() }, [dependencies]);
    useElementOverflowAdjustment(['#color'], () => 0, setBoxTranslateY, dependencies);


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
                        <div className='text-center pt-2 font-bold text-lg'>Color</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll'>
                        {/* color */}
                        <div className='text-center p-0.5 text-xs'>
                            color:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-36 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={color}
                                readOnly
                            />
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('color', color)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        {/* color 값 타입 선택 */}
                        <div className='grid grid-cols-5 gap-2 pb-2'>
                            {colorTypeValues.map((value, index) => (
                                <input
                                    key={index}
                                    type='radio'
                                    name='colorType'
                                    className="btn btn-sm text-xs"
                                    aria-label={value}
                                    value={value}
                                    checked={colorType === value}
                                    onChange={updateColorType}
                                />
                            ))}
                        </div>

                        {/* opacity */}
                        <div id='opacity-wrap' className='hidden py-1'>
                            <input type="range" min={0} max="1" className="range range-xs" step="0.1"
                                value={colorOpacity}
                                onChange={updateOpacity}
                            />
                            <div className="flex w-full justify-between px-2 text-xs">
                                <span>0</span>
                                <span>0.1</span>
                                <span>0.2</span>
                                <span>0.3</span>
                                <span>0.4</span>
                                <span>0.5</span>
                                <span>0.6</span>
                                <span>0.7</span>
                                <span>0.8</span>
                                <span>0.9</span>
                                <span>1</span>
                            </div>
                        </div>

                        {/* color 변경 */}
                        <div className='grid grid-cols-3 gap-2'>
                            <input type="color" className="col-start-1 col-end-2 btn p-0 w-full"
                                value={hexColor}
                                onChange={updateColor}
                            />
                            <input type="text" className="col-start-2 col-end-4 px-1 input input-bordered text-center font-bold text-sm focus:outline-none"
                                placeholder='Color'
                                value={color}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* view 파트 */}
            <div id="view" className='w-full h-full flex items-center justify-center overflow-scroll'>
                <div id='color' className='w-[700px] min-h-[500px] font-mono font-bold p-6 text-2xl bg-blue-50 transition-transform duration-500'
                    style={{ transform: `translateY(${boxTranslateY}px)` }}
                >
                    <p style={{ color }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tempor sollicitudin massa ac efficitur.
                        Cras fringilla quam lectus. Donec eros ipsum, rutrum eu laoreet commodo, interdum varius tortor.
                        Donec feugiat risus eu hendrerit finibus. Maecenas eget sapien et neque pellentesque posuere. Donec sed metus metus.
                        Fusce faucibus, purus a accumsan laoreet, sapien leo tincidunt ante, blandit consectetur dolor magna sit amet odio.
                        Donec in eros non sem tempor viverra. Vivamus id ultricies sapien. Donec consectetur ex vitae nulla ullamcorper commodo.
                        Nam interdum, libero eget maximus sagittis, odio tortor facilisis velit, eu feugiat ex ante id quam. Nulla facilisi.
                        Aliquam sit amet velit tortor.
                    </p>
                </div>
            </div>
        </>
    );
}

export default Color;