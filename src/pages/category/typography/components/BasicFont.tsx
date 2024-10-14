// BasicFont.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../../utils/handleOptionToggle';
import { copyCss } from '../../../../utils/clipboardUtils';
import { useElementOverflowAdjustment } from '../../../../hooks/useElementOverflowAdjustment ';

const BasicFont: React.FC = () => {
    // 1. font-style
    const [fontStyle, setFontStyle] = useState('normal');
    const fontStyleValues: string[] = ['normal', 'italic', 'oblique'];
    const [obliqueDeg, setObliqueDeg] = useState(14);       // oblique 기본 deg = 14

    // 2. font-weight
    const [fontWeight, setFontWeight] = useState(400);      // 범위 100~900, step=100

    // 3. font-size
    const [fontSize, setFontSize] = useState('medium');
    const [customFontSize, setCustomFontSize] = useState('');
    const fontSizevalues: string[] = ['xx-small', 'x-small', 'small', 'smaller', 'medium', 'large', 'larger', 'x-large', 'xx-large', 'xxx-large'];

    // 6. font-family
    const [fontFamily, setFontFamily] = useState('system-ui');
    const fontFamilyValues: string[] = ['system-ui', 'serif', 'sans-serif', 'monospace', 'cursive', 'fantasy'];

    // 기타
    const [boxTranslateY, setBoxTranslateY] = useState(0);

    // update font-style
    const updateFontStyle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;

        const obliqueDegWrap = document.querySelector('#obliqueDeg-wrap') as Element;
        inputValue === 'oblique' ? obliqueDegWrap.classList.remove('hidden') : obliqueDegWrap.classList.add('hidden');

        setObliqueDeg(14);
        setFontStyle(inputValue);
    }

    // update obliqueDeg
    const updateObliqueDeg = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const value = inputValue === '' || isNaN(Number(inputValue)) ? 14 : Number(inputValue); // 14가 기본 값
        const clampedValue = Math.max(-90, Math.min(90, value));     // 범위 제한 -90 ~ +90
        setObliqueDeg(clampedValue);
    };

    // update font-weight
    const updateFontWeight = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = Number(event.target.value);
        setFontWeight(inputValue);
    }

    // update font-size
    const updateFontSize = (event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>, isCustom: boolean = false) => {
        const target = event.target as HTMLInputElement;
        const inputValue = target.value;

        if (isCustom) {
            setCustomFontSize(inputValue);
        }
        setFontSize(inputValue);
    }

    // update font-family
    const updateFontFaily = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setFontFamily(inputValue);
    }


    const dependencies = [fontStyle, fontWeight, fontSize, fontFamily];
    useElementOverflowAdjustment(['#BasicFont'], () => 0, setBoxTranslateY, dependencies, { widthPadding: 0, heightPadding: 50 });

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
                        <div className='text-center pt-2 font-bold text-lg'>Basic Font</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll'>
                        {/* 1. font-style */}
                        <div className="divider font-bold text-lg">Font Style</div>
                        <div className='text-center pb-0.5 text-xs'>
                            font-style:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-20 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={fontStyle}
                                readOnly
                            />
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('font-style', fontStyle !== 'oblique' ? fontStyle : `${fontStyle} ${obliqueDeg}deg`, false)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>
                        {/* font-style 값 */}
                        <div className='grid grid-cols-2 gap-2'>
                            {fontStyleValues.map((value, index) => (
                                <input
                                    key={index}
                                    type='radio'
                                    name='fontStyle'
                                    className="btn border-2 focus:border-gray-400"
                                    value={value}
                                    aria-label={value}
                                    checked={fontStyle === value}
                                    onChange={updateFontStyle}
                                />
                            ))}
                            {/* obliqueDeg 값 */}
                            <div id='obliqueDeg-wrap' className='hidden'>
                                <input type="range" min={-90} max="90" value={obliqueDeg} className="range range-xs"
                                    onChange={updateObliqueDeg}
                                />
                                <div className="flex w-full items-center justify-center px-2 text-xs">
                                    <input type='number' className='input input-xs w-14 text-center focus:outline-none' min={-90} max={90}
                                        value={obliqueDeg}
                                        style={{ MozAppearance: 'textfield' }}  // 화살표 제거
                                        onChange={updateObliqueDeg}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 2. font-weight */}
                        <div className="divider font-bold text-lg">Font weight</div>
                        <div className='text-center pb-0.5 text-xs'>
                            font-weight:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-20 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={fontWeight}
                                readOnly
                            />
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('font-weight', fontWeight, false)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>
                        {/* fontWeigth 값 */}
                        <div>
                            <input type="range" min={100} max="900" className="range" step="100"
                                value={fontWeight}
                                onChange={updateFontWeight}
                            />
                            <div className="flex w-full justify-between px-2 text-xs text-center">
                                <div className="dropdown dropdown-hover">
                                    <div tabIndex={0} role="button" className="font-bold">100</div>
                                    <div tabIndex={0} className="dropdown-content shadow bg-gray-50 rounded p-2 z-[1] font-bold">
                                        ligther
                                    </div>
                                </div>
                                <span>200</span>
                                <span>300</span>
                                <div className="dropdown dropdown-hover">
                                    <div tabIndex={0} role="button" className="font-bold">400</div>
                                    <div tabIndex={0} className="dropdown-content shadow bg-gray-50 rounded p-2 z-[1] font-bold">
                                        normal
                                    </div>
                                </div>
                                <span>500</span>
                                <span>600</span>
                                <div className="dropdown dropdown-hover">
                                    <div tabIndex={0} role="button" className="font-bold">700</div>
                                    <div tabIndex={0} className="dropdown-content shadow bg-gray-50 rounded p-2 z-[1] font-bold">
                                        bold
                                    </div>
                                </div>
                                <span>800</span>
                                <div className="dropdown dropdown-end dropdown-hover">
                                    <div tabIndex={0} role="button" className="font-bold">900</div>
                                    <div tabIndex={0} className="dropdown-content shadow bg-gray-50 rounded p-2 z-[1] font-bold">
                                        bolder
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. font-size */}
                        <div className="divider mb-0 font-bold text-lg">Font Size</div>
                        <div className='px-4 text-xs text-right font-bold'><span className='text-red-700'>*</span> Unit: px</div>
                        <div className='text-center pb-0.5 text-xs'>
                            font-size:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-20 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={fontSize}
                                readOnly
                            />
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('font-size', fontSize, false)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>
                        {/* font-size 값 */}
                        <div className='grid grid-cols-2 gap-2'>
                            {fontSizevalues.map((value, index) => (
                                <input
                                    key={index}
                                    type='radio'
                                    name='fontSize'
                                    className="btn border-2 focus:border-gray-400"
                                    value={value}
                                    aria-label={value}
                                    checked={fontSize === value}
                                    onChange={(event) => updateFontSize(event)}
                                />
                            ))}
                            {/* custom size */}
                            <button className="btn p-0 col-start-1 col-end-3">
                                <input
                                    type='text'
                                    className='input w-full h-full bg-transparent focus:outline-none border-2 focus:border-gray-400 text-center'
                                    onClick={(event) => updateFontSize(event, true)}
                                    onChange={(event) => updateFontSize(event, true)}
                                    value={customFontSize}
                                    placeholder='20px'
                                />
                            </button>
                        </div>

                        {/* 6. font-family */}
                        <div className="divider font-bold text-lg">Font Family</div>
                        <div className='text-center pb-0.5 text-xs'>
                            font-family:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-20 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={fontFamily}
                                readOnly
                            />
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('font-family', fontFamily, false)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>
                        {/* font-family 값 */}
                        <div className='grid grid-cols-2 gap-2'>
                            {fontFamilyValues.map((value, index) => (
                                <input
                                    key={index}
                                    type='radio'
                                    name='fontFamily'
                                    className="btn border-2 focus:border-gray-400"
                                    value={value}
                                    aria-label={value}
                                    checked={fontFamily === value}
                                    onChange={updateFontFaily}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* view 파트 */}
            <div id="view" className='w-full h-full flex items-center justify-center overflow-scroll'>
                <div id='BasicFont' className='w-[700px] transition-transform duration-300 text-center'
                    style={{
                        fontWeight,
                        fontSize,
                        fontFamily,
                        transform: `translateY(${boxTranslateY}px)`
                    }}>
                    <textarea placeholder='Please enter text.' className='w-[500px] h-[600px] resize-none bg-transparent'
                        style={{
                            fontStyle: fontStyle !== 'oblique' ? fontStyle : `${fontStyle} ${obliqueDeg}deg`,
                        }}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer iaculis lectus a fermentum convallis. Maecenas lacus libero, tristique et lacus eget, faucibus pellentesque lorem. Vivamus sit amet mattis mi. Nunc cursus congue justo eu convallis. Sed nec aliquam mauris. Nunc consequat, nibh sit amet volutpat ultricies, diam elit fringilla nisl, nec sodales ipsum nisl et leo. Suspendisse potenti.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque porttitor pellentesque pharetra. Duis sit amet felis in sapien sagittis porta id et mauris. Duis egestas ligula at lorem consequat, et vulputate risus maximus. Maecenas sed neque hendrerit, finibus lectus ut, venenatis nibh. Aenean viverra varius dolor. Aenean non placerat velit, quis elementum augue. In hac habitasse platea dictumst. Quisque eget dictum mauris, in consequat felis. Phasellus congue justo non sagittis gravida.
                    </textarea>
                </div>
            </div >
        </>
    );
}

export default BasicFont;