// TextShadow.tsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../utils/handleOptionToggle';
import { copyCss } from '../../../utils/clipboardUtils';
import { useOverflowHandler } from '../../../hooks/useOverflowHandler';
import { hexToRgba } from '../../../utils/colorUtils';

const TextShadow: React.FC = () => {
    const [textShadow, setTextShadow] = useState('2px 2px 5px rgba(0, 0, 0, 1)');

    // shadow 효과 여러번 사용하는 경우, 최대 수 지정
    const [curCount, setCurCount] = useState(1);        // 그림자 현재 수
    const maxCount = 5;                                 // 그림자 최대 수
    const [shadows, setShadows] = useState(             // 그림자 값 배열
        Array.from({ length: maxCount }, () => ({
            offsetX: 2,                         // 수평 그림자 거리
            offsetY: 2,                         // 수직 그림자 거리
            blurRadius: 5,                      // 흐림 반경
            color: '#000000',                   // 색상 (hexToRgba 사용)
            opacity: 1                          // 투명도
        }))
    );

    const [boxTranslateY, setBoxTranslateY] = useState(0);


    // shadow element 추가
    const createShadowElements = () => {
        // shadowTags를 배열로 초기화
        const shadowTags = [];

        for (let i = 0; i < curCount; i++) {
            const shadow = shadows[i];

            shadowTags.push(
                <>
                    <div className="divider font-bold text-lg">Shadow {i + 1}</div>
                    <div key={i} className='grid grid-cols-4 gap-2 items-center text-center'>
                        {Object.entries(shadow).map(([key, value], index) => (
                            <>
                                <div key={key} className='font-bold text-xs'>
                                    {key}
                                </div>
                                {key !== 'color' && key !== 'opacity' ? (
                                    <button className="col-start-2 col-end-5 btn btn-sm p-0">
                                        <input
                                            type='text'
                                            className='input w-full h-full bg-transparent focus:outline-none border-2 focus:border-gray-400 text-center'
                                            placeholder={key}
                                            value={value}
                                            onChange={(e) => updateTextShadow(key, Number(e.target.value), i)}
                                        />
                                    </button>
                                ) : key === 'color' ? (
                                    <div className='col-start-2 col-end-5 grid grid-cols-2 items-center gap-2'>
                                        <input type="color" className="col-start-1 col-end-2 btn btn-sm p-0 w-full"
                                            value={value}
                                            onChange={(e) => updateTextShadow('color', e.target.value, i)}
                                        />
                                        <input type="text" className="col-start-2 col-end-4 btn btn-sm focus:outline-none outline-2 focus:border-gray-400"
                                            placeholder='Color'
                                            value={value}
                                            onChange={(e) => updateTextShadow('color', e.target.value, i)}
                                        />
                                    </div>
                                ) : (
                                    <div className='col-start-2 col-end-5 flex flex-col items-center justify-center gap-1'>
                                        <input type="range" min={0} max="1" className="range range-xs" step="0.1"
                                            value={value}
                                            onChange={(e) => updateTextShadow('opacity', e.target.value, i)}
                                        />
                                        <div className="flex w-full items-center justify-center px-2 text-xs">
                                            <input type='text' className='input input-xs w-14 readonly' value={value} />
                                        </div>
                                    </div>
                                )}
                            </>
                        ))}
                    </div>
                </>
            );
        }

        return shadowTags;
    };

    // update text-shadow
    const updateTextShadow = (key: string, value: string | number, index: number) => {
        const updateShadows = shadows.map((shadow, i) =>
            i === index ? { ...shadow, [key]: value } : shadow
        );
        setShadows(updateShadows);
    }

    // get text-shadow value
    // text-shadow 값 반환
    const getTextShadowValue = () => {
        let shadowValues = '';

        for (let i = 0; i < curCount; i++) {
            let shadowValue = '';

            // shadows[i]의 각 값에 대해 반복
            Object.entries(shadows[i]).forEach(([key, value], index) => {
                if (key === 'color') {
                    shadowValue += `${hexToRgba(value as string, shadows[i].opacity)} `;
                } else if (key === 'opacity') {
                    shadowValue += '';
                } else {
                    shadowValue += `${value}px `;
                }
            });

            // 생성된 shadowValue를 shadowValues에 추가
            shadowValue = shadowValue.trim();
            shadowValues += i === 0 ? '' + shadowValue.trim() : ', ' + shadowValue.trim();
        }
        setTextShadow(shadowValues);
    }


    const dependencies = [textShadow, curCount, shadows];
    useEffect(() => { getTextShadowValue(); }, dependencies);
    useOverflowHandler(['#text-shadow'], () => 0, setBoxTranslateY, dependencies);


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
                        <div className='text-center pt-2 font-bold text-lg'>Text Shadow</div>
                        <div className='px-4 text-xs text-right font-bold'><span className='text-red-700'>*</span> Unit: px</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div id='option-wrap-bottom' className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll px-2'>
                        {/* text shadow */}
                        <div className='text-center p-0.5 text-xs'>
                            text-shadow:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-36 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={textShadow}
                                readOnly
                            />
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('text-shadow', textShadow)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        {/* shadow 값 */}
                        {createShadowElements()}

                        <div className="divider font-bold text-lg mb-0"></div>
                        <div className='flex items-center justify-center gap-2 my-2'>
                            {/* shadow 제거 버튼 */}
                            {curCount > 1 ? (

                                <button className="btn btn-circle btn-sm"
                                    onClick={() => setCurCount(curCount - 1)}
                                >
                                    <FontAwesomeIcon icon={faMinus} />
                                </button>
                            ) : (
                                null
                            )}
                            {/* shadow 추가 버튼 */}
                            {curCount < maxCount ? (
                                <button className="btn btn-circle btn-sm"
                                    onClick={() => setCurCount(curCount + 1)}
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            ) : (
                                null
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* view 파트 */}
            <div id="view" className='w-full h-full flex items-center justify-center overflow-scroll'>
                <div id='text-shadow' className='w-[700px] text-lg text-lg bg-blue-50 shadow p-4 font-mono transition-transform duration-500'
                    style={{ transform: `translateY(${boxTranslateY}px)` }}
                >
                    <p className='pb-4' style={{ textShadow: textShadow }}>
                        Nunc in viverra sapien. Duis ut sem nulla.
                        Morbi fermentum nisi sapien, sit amet semper sapien dapibus et.
                        Ut lorem ligula, placerat vel consectetur vel, ullamcorper lobortis neque.
                        Morbi faucibus lobortis nulla. Pellentesque pulvinar aliquet quam non aliquam.
                        Integer ex diam, congue non consequat eget, efficitur eu ligula. Praesent quis pulvinar orci.
                        Vivamus quis dapibus mauris.
                    </p>
                    <p style={{ textShadow: textShadow }}>
                        Praesent elementum nulla non dictum vestibulum. Donec quis dictum enim.
                        Phasellus varius enim luctus, malesuada risus vel, hendrerit libero.
                        Vivamus ut posuere libero, suscipit vehicula ligula.
                        Nulla massa elit, aliquam ac est gravida, aliquet scelerisque magna.
                        Nunc sit amet ultrices augue. Donec rutrum est nunc, in vestibulum velit cursus at.
                    </p>
                </div>
            </div>
        </>
    );
}

export default TextShadow;