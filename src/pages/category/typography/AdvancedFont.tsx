// AdvancedFont.tsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus, faPen, faCheck } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../utils/handleOptionToggle';
import { copyCss } from '../../../utils/clipboardUtils';
import { useElementOverflowAdjustment } from '../../../hooks/useElementOverflowAdjustment ';

const AdvancedFont: React.FC = () => {
    // 1. font-family
    const [fontFamily, setFontFamily] = useState('serif');
    const fontFamilyValues: string[] = ['serif', 'system-ui', 'sans-serif', 'monospace', 'cursive', 'fantasy'];

    // // 2. font-feature-settings
    const [fontFeatureSettings, setFontFeatureSettings] = useState('normal');
    const fontFeatureValues: string[] = ['liga', 'dlig', 'smcp', 'c2pc', 'onum', 'pnum', 'tnum', 'frac', 'ordn', 'swsh'];
    const [activeFeatures, setActiveFeatures] = useState(Array(fontFeatureValues.length).fill(0));

    // 3. font-kerning
    const [fontKerning, setFontKerning] = useState<'none' | 'normal' | 'auto'>('none');
    const fontKerningValues: string[] = ['none', 'normal', 'auto'];

    // 4. font-variant
    const usedVariant = false;                  // font-variant 사용 여부
    type FVCapsType = 'normal' | 'small-caps' | 'all-small-caps';
    const [fontVariantCaps, setFontVariantCaps] = useState<FVCapsType>('normal');
    const [fontVariantLigatures, setFontVariantLigatures] = useState('normal');
    const [fontVariantNumeric, setFontVariantNumeric] = useState('normal');
    const [fontVariantAlternates, setFontVariantAlternates] = useState('normal');
    const [fontVariantEastAsian, setFontVariantEastAsian] = useState('normal');
    // 4-1. font-variant-caps 
    const fontVariantCapsValues = [
        'normal',
        'small-caps',              // 소문자를 작은 대문자로 변환
        'all-small-caps',          // 모든 대문자와 소문자를 작은 대문자로 변환
    ];
    // 4-2. font-variatn-ligatures
    const fontVariantLigaturesValues = [
        'normal',
        'discretionary-ligatures', // 임의의 리가추어 사용
    ];
    // 4-3. font-variant-numeric
    const fontVariantNumericValues = [
        'normal',                  // 기본 숫자 변형 사용
        'oldstyle-nums',           // 구식 숫자 사용 (숫자가 상하로 다름)
        'proportional-nums',       // 숫자의 폭을 글자에 맞게 조정
        'diagonal-fractions',      // 대각선 분수 사용
    ];
    // 4-4. font-variant-east-asian
    const fontVariantEastAsianValues = [
        'normal',                  // 기본 동아시아 글꼴 변형 사용
        'ruby',
        'jis00',                   // JIS 2000 기준에 따른 동아시아 글꼴 변형
        'jis78',                   // JIS 1978 기준에 따른 동아시아 글꼴 변형
        'jis83',                   // JIS 1983 기준에 따른 동아시아 글꼴 변형
        'jis90',                   // JIS 1990 기준에 따른 동아시아 글꼴 변형
        'simplified',              // 간체 글꼴 변형 사용
        'traditional'              // 번체 글꼴 변형 사용
    ];

    // 5. font-stretch
    const [fontStretch, setFontStretch] = useState('normal');
    const fontStretchValues = ['normal', 'ultra-condensed', 'extra-condensed', 'condensed', 'semi-condensed', 'semi-expanded', 'expanded', 'extra-expanded', 'ultra-expanded'];


    // 기타
    const [boxTranslateY, setBoxTranslateY] = useState(0);

    // update font-family
    const updateFontFaily = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setFontFamily(inputValue);
    }



    // update font-features-settings
    const updateActiveFeatures = (index: number) => {
        const updatedActives = [...activeFeatures];
        updatedActives[index] = activeFeatures[index] === 1 ? 0 : 1;
        setActiveFeatures(updatedActives);

        // activeFeatures에서 1인 값에 해당하는 fontFeatureValues 값을 가져옴
        const newFontFeatureSettings = fontFeatureValues
            .map((value, i) => (updatedActives[i] === 1 ? `'${value}' 1` : null))
            .filter(Boolean)
            .join(', ');
        setFontFeatureSettings(newFontFeatureSettings);
    }

    // update font-kerning
    const updateFontKerning = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value as 'none' | 'normal' | 'auto';
        setFontKerning(inputValue);
    }

    // update font-stretch
    const updateFontStretch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setFontStretch(inputValue);
    }

    // props 활성화
    // activeProps
    const activeProps = (elementId: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        // const isActive = target.checked;
        const activeElement = document.querySelector(elementId) as HTMLElement;
        activeElement.classList.toggle('hidden');

        switch (target.value) {
            case 'feature':
                const updatedFeatures = activeFeatures.map(() => 0);  // 모든 값을 0으로 변경
                setActiveFeatures(updatedFeatures);
                setFontFeatureSettings('normal');
                break;
            case 'kerning':
                setFontKerning('none');
                break;
            case 'variant':
                setFontVariantCaps('normal');
                setFontVariantLigatures('normal');
                setFontVariantNumeric('normal');
                setFontVariantEastAsian('normal');
                break;
            case 'stretch':
                break;
        }
    }

    // update font-variant
    const updateFontVariant = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
        const inputValue = event.target.value;

        switch (type) {
            case 'caps': setFontVariantCaps(inputValue as FVCapsType); break;
            case 'ligatures': setFontVariantLigatures(inputValue); break;
            case 'numeric': setFontVariantNumeric(inputValue); break;
            case 'eastAsian': setFontVariantEastAsian(inputValue); break;
        }
    }

    const dependencies = [fontFamily, fontFeatureSettings, fontKerning, fontVariantCaps, fontVariantLigatures, fontVariantNumeric, fontVariantAlternates];
    useElementOverflowAdjustment(['#advanced-font'], () => 0, setBoxTranslateY, dependencies);


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
                        <div className='text-center pt-2 font-bold text-lg'>Advanced Font</div>
                        {/* 아래 태그는 표시할 내용이 있는 경우 사용 */}
                        {/* <div className='px-4 text-xs text-right font-bold'><span className='text-red-700'>*</span> Basis: object-fit: none;</div> */}
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll'>
                        {/* 1. font-family */}
                        <div className="divider font-bold text-lg">Font Family</div>
                        <div className='text-center pb-0.5 text-xs'>
                            font-family:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-20 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={fontFamily}
                                readOnly
                            />
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('font-family', fontFamily)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>
                        {/* font-family 값 */}
                        <div className='grid grid-cols-3 gap-2'>
                            {fontFamilyValues.map((value, index) => (
                                <input
                                    key={index}
                                    type='radio'
                                    name='fontFamily'
                                    className="btn btn-xs h-12 border-2 focus:border-gray-400"
                                    value={value}
                                    aria-label={value}
                                    checked={fontFamily === value}
                                    onChange={updateFontFaily}
                                />
                            ))}
                        </div>

                        {/* 2. font-feature-settings */}
                        {/* font-feature-settings 활성화 버튼 */}
                        <div className='divider flex items-center justify-center font-bold'>
                            <span>Font Feature Settings</span>
                            <input type="checkbox"
                                id="toggle-fontFeature"
                                className="toggle toggle-info toggle-sm"
                                value='feature'
                                onChange={(event) => activeProps('#font-feature-wrap', event)}
                            />
                        </div>
                        <div id='font-feature-wrap' className='hidden'>
                            <div className='text-center pb-2 text-xs'>
                                font-feature-settings:
                                <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                    value={fontFeatureSettings}
                                    readOnly
                                />
                                <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                    onClick={() => copyCss('font-feature-settings', fontFeatureSettings)}
                                >
                                    <FontAwesomeIcon icon={faCopy} />
                                </button>
                            </div>
                            {/* font-feature-settings 값 */}
                            <div className='grid grid-cols-5 gap-2'>
                                {fontFeatureValues.map((value, index) => (
                                    <input
                                        key={index}
                                        type='checkbox'
                                        name='fontFeature'
                                        className="btn btn-xs h-12"
                                        aria-label={value}
                                        checked={activeFeatures[index] === 1}
                                        onChange={() => updateActiveFeatures(index)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* 3. font-kerning */}
                        <div className='divider flex items-center justify-center font-bold text-lg'>
                            <span>Font Kerning</span>
                            <input type="checkbox"
                                id="toggle-fontKerning"
                                className="toggle toggle-info toggle-sm"
                                value='kerning'
                                onChange={(event) => activeProps('#font-kerning-wrap', event)}
                            />
                        </div>
                        <div id='font-kerning-wrap' className='hidden'>
                            <div className='text-center pb-2 text-xs'>
                                font-kerning:
                                <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                    value={fontKerning}
                                    readOnly
                                />
                                <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                    onClick={() => copyCss('font-kerning', fontKerning)}
                                >
                                    <FontAwesomeIcon icon={faCopy} />
                                </button>
                            </div>
                            {/* font-kerning 값 */}
                            <div className='grid grid-cols-3 gap-2'>
                                {fontKerningValues.map((value, index) => (
                                    <input
                                        key={index}
                                        type='radio'
                                        name='fontKerning'
                                        className="btn"
                                        value={value}
                                        aria-label={value}
                                        checked={fontKerning === value}
                                        onChange={updateFontKerning}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* 4. font-variant */}
                        {/* font-variant 활성화 버튼 */}
                        <div className='divider flex items-center justify-center font-bold text-lg'>
                            <span>Font Variant</span>
                            <input type="checkbox"
                                id="toggle-fontVariant"
                                className="toggle toggle-info toggle-sm"
                                value='variant'
                                onChange={(event) => activeProps('#font-variant-wrap', event)}
                            />
                        </div>

                        {/* 4.1 */}
                        <div id='font-variant-wrap' className='hidden'>
                            <div className='text-center pb-2 text-xs'>
                                font-variant-caps:
                                <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                    value={fontVariantCaps}
                                    readOnly
                                />
                                <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                    onClick={() => copyCss('font-variant-caps', fontVariantCaps)}
                                >
                                    <FontAwesomeIcon icon={faCopy} />
                                </button>
                            </div>
                            <div className='grid grid-cols-3 gap-2'>
                                {fontVariantCapsValues.map((value, index) => (
                                    <input
                                        key={index}
                                        type='radio'
                                        name='fontVariantCaps'
                                        className="btn btn-xs h-12"
                                        value={value}
                                        aria-label={value}
                                        checked={fontVariantCaps === value}
                                        onChange={(event) => updateFontVariant(event, 'caps')}
                                    />
                                ))}
                            </div>

                            {/* 4.2 */}
                            <div className='text-center pt-3 pb-2 text-xs'>
                                font-variant-ligatures:
                                <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                    value={fontVariantLigatures}
                                    readOnly
                                />
                                <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                    onClick={() => copyCss('font-variant-ligatures', fontVariantLigatures)}
                                >
                                    <FontAwesomeIcon icon={faCopy} />
                                </button>
                            </div>
                            <div className='grid grid-cols-2 gap-2'>
                                {fontVariantLigaturesValues.map((value, index) => (
                                    <input
                                        key={index}
                                        type='radio'
                                        name='fontVariantLigatures'
                                        className="btn btn-xs h-12"
                                        value={value}
                                        aria-label={value}
                                        checked={fontVariantLigatures === value}
                                        onChange={(event) => updateFontVariant(event, 'ligatures')}
                                    />
                                ))}
                            </div>

                            {/* 4.3 */}
                            <div className='text-center pt-3 pb-2 text-xs'>
                                font-variant-numeric:
                                <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                    value={fontVariantNumeric}
                                    readOnly
                                />
                                <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                    onClick={() => copyCss('font-variant-numeric', fontVariantNumeric)}
                                >
                                    <FontAwesomeIcon icon={faCopy} />
                                </button>
                            </div>
                            <div className='grid grid-cols-2 gap-2'>
                                {fontVariantNumericValues.map((value, index) => (
                                    <input
                                        key={index}
                                        type='radio'
                                        name='fontVariantNumeric'
                                        className="btn btn-xs h-12"
                                        value={value}
                                        aria-label={value}
                                        checked={fontVariantNumeric === value}
                                        onChange={(event) => updateFontVariant(event, 'numeric')}
                                    />
                                ))}
                            </div>

                            {/* 4.4 */}
                            <div className='text-center pt-3 pb-2 text-xs'>
                                font-variant-east-asian:
                                <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                    value={fontVariantEastAsian}
                                    readOnly
                                />
                                <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                    onClick={() => copyCss('font-variant-east-asian', fontVariantEastAsian)}
                                >
                                    <FontAwesomeIcon icon={faCopy} />
                                </button>
                            </div>
                            <div className='grid grid-cols-2 gap-2'>
                                {fontVariantEastAsianValues.map((value, index) => (
                                    <input
                                        key={index}
                                        type='radio'
                                        name='fontVariantEaseAsian'
                                        className="btn btn-xs h-12"
                                        value={value}
                                        aria-label={value}
                                        checked={fontVariantEastAsian === value}
                                        onChange={(event) => updateFontVariant(event, 'eastAsian')}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* 5. font-fontStretch */}
                        <div className='divider flex items-center justify-center font-bold text-lg'>
                            <span>Font Stretch</span>
                            <input type="checkbox"
                                id="toggle-fontStretch"
                                className="toggle toggle-info toggle-sm"
                                value='stretch'
                                onChange={(event) => activeProps('#font-stretch-wrap', event)}
                            />
                        </div>
                        <div id='font-stretch-wrap' className='hidden'>
                            <div className='text-center pb-2 text-xs'>
                                font-stretch:
                                <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                    value={fontStretch}
                                    readOnly
                                />
                                <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                    onClick={() => copyCss('font-stretch', fontStretch)}
                                >
                                    <FontAwesomeIcon icon={faCopy} />
                                </button>
                            </div>
                            {/* font-fontStretch 값 */}
                            <div className='grid grid-cols-3 gap-2'>
                                {fontStretchValues.map((value, index) => (
                                    <input
                                        key={index}
                                        type='radio'
                                        name='fontStretch'
                                        className="btn btn-xs h-12"
                                        value={value}
                                        aria-label={value}
                                        checked={fontStretch === value}
                                        onChange={updateFontStretch}
                                    />
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* view 파트 */}
            <div id="view" className='w-full h-full flex items-center justify-center overflow-scroll'>
                <div id='advanced-font' className='transition-transform duration-500 text-3xl text-center bg-blue-50 shadow p-4'
                    style={{
                        fontFamily,
                        fontFeatureSettings,
                        fontKerning,
                        fontVariantCaps: fontVariantCaps as FVCapsType,
                        fontVariantLigatures,
                        fontVariantNumeric,
                        fontVariantEastAsian,
                        fontStretch,
                        transform: `translateY(${boxTranslateY}px)`
                    }}>
                    <p>The Quick Brown Fox Jumps Over The Lazy Dog</p>
                    <p>다람쥐 헌 쳇바퀴에 타고파</p>
                    <p>月亮照耀着夜空，星星像是无数的宝石。</p>
                    <p>春风轻拂，花开满地，仿佛一幅美丽的画卷。</p>
                    <p>月明かりが静かな夜を照らし、星々がまるで宝石のように輝いている。</p>
                    <p>春の風が吹き抜け、花々が咲き誇る様子は、美しい絵巻のようだ。ど、</p>
                    <p>1 2 3 4 5 6 7 8 9 0</p>
                    <p>0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9</p>
                    <p>1/2 1/3 1/4 1/5 1/6 1/7 1/8 1/9 1/10</p>
                    <p>! @ # $ % ^ & * ( ) _ + \ | , . / ? : ; ' "</p>
                </div>
            </div>
        </>
    );
}

export default AdvancedFont;