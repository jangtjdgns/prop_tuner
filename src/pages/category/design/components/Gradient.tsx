// Gradient.tsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../../utils/handleOptionToggle';
import { copyCss } from '../../../../utils/clipboardUtils';
import { useElementOverflowAdjustment } from '../../../../hooks/useElementOverflowAdjustment ';

const Gradient: React.FC = () => {
    type GradientType = 'linear' | 'radial' | 'conic';
    const [gradientType, setGradientType] = useState<GradientType>('linear');    // linear-gradient, radial-gradient, conic-gradient
    const gradientTypeValues: string[] = ['linear', 'radial', 'conic'];

    // radial
    const [radial, setRadial] = useState('circle');
    const radialValues: string[] = ['circle', 'ellipse', 'closest-side', 'farthest-side', 'closest-corner', 'farthest-corner'];

    // 그라데이션 각도
    const [gradientDegree, setGradientDegree] = useState(180);
    // 단일 각도 사용 여부
    const [useSingleDeg, setUseSingleDeg] = useState(false);

    // 그라데이션이 적용되는 색상의 수, 기본값 = 2
    const [gradientCount, setGradientCount] = useState(2);
    // 그라데이션에 사용될 {색상, 위치, 방향} 배열
    const [gradientDetails, setGradientDetails] = useState<{ color: string, stops: number, startDegree: number, endDegree: number }[]>([
        { color: '#a18cd1', stops: 0, startDegree: 0, endDegree: 180 },
        { color: '#fbc2eb', stops: 100, startDegree: 180, endDegree: 360 }
    ]);

    // 텍스트에 적용 여부, 보류 (적용은 되지만 제대로 동작에 문제가있음)
    // const [useText, setUseText] = useState(false);

    // const [boxTranslateX, setBoxTranslateX] = useState(0);
    // const [boxTranslateY, setBoxTranslateY] = useState(0);

    // event: React.ChangeEvent<HTMLInputElement>
    // update grideient type
    const updateGradientType = (inputValue: string) => {
        setGradientType(inputValue as GradientType);
    }

    // update grideient degree
    const updateGradientDegree = (inputValue: number) => {
        const value = isNaN(Number(inputValue)) ? 180 : Number(inputValue);
        const rangeValue = Math.max(0, Math.min(360, value));       // 범위 제한 0 ~ 360
        setGradientDegree(rangeValue);
    }

    // update gradientCount
    const updateGradientCount = (inputValue: number) => {
        const value = isNaN(Number(inputValue)) ? 2 : Number(inputValue);
        const rangeValue = Math.max(2, Math.min(5, value));         // 범위 제한 2 ~ 5
        setGradientCount(rangeValue);

        // new GradientDetails
        const newGradient = Array.from({ length: rangeValue }, (v, index) => {
            const angleStep = 360 / rangeValue;
            const startDegree = angleStep * index;
            const endDegree = index === rangeValue - 1 ? 360 : angleStep * (index + 1);

            return {
                color: gradientDetails[index] ? gradientDetails[index].color : '#ffffff',  // 색상
                stops: index === 0 ? 0 : index === rangeValue - 1 ? 100 : (100 / (rangeValue - 1)) * index, // stops 계산
                startDegree: startDegree,
                endDegree: endDegree,  // 각도 계산
            };
        });

        setGradientDetails(newGradient);
    }

    // update gradientDetails
    const updateGradientDetails = (index: number, detail: 'color' | 'stops' | 'startDegree' | 'endDegree', newValue: string) => {
        const updatedGraident = gradientDetails.map((gradient, i) => {
            if (i === index) {
                return {
                    ...gradient,
                    [detail]: newValue,
                };
            }
            return gradient;
        });

        setGradientDetails(updatedGraident);
    };

    // get Gradient Value
    const getGradientValue = () => {
        let gradientValue = '';
        switch (gradientType) {
            case 'linear':
                gradientValue = `${gradientType}-gradient(${gradientDegree}deg, ` + gradientDetails.map(detail => `${detail.color} ${String(detail.stops)}%`).join(', ') + ')';
                break;
            case 'radial':
                gradientValue = `${gradientType}-gradient(${radial}, ` + gradientDetails.map(detail => `${detail.color} ${String(detail.stops)}%`).join(', ') + ')';
                break;
            case 'conic':
                !useSingleDeg
                    ? gradientValue = `${gradientType}-gradient(` + gradientDetails.map(detail => `${detail.color} ${detail.startDegree}deg ${detail.endDegree}deg`).join(', ') + ')'
                    : gradientValue = `${gradientType}-gradient(` + gradientDetails.map(detail => `${detail.color} ${detail.startDegree}deg`).join(', ') + ')'
                break;
        }

        return gradientValue;
    }


    // const dependencies = [outlineWidth, outlineStyle, outlineColor, outlineOpacity, outlineOffset];
    // useElementOverflowAdjustment(['#outline'], () => 0, setBoxTranslateY, dependencies);


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
                        <div className='text-center pt-2 font-bold text-lg'>Gradient</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll'>
                        {/* gridient */}
                        <div className='text-center p-0.5 text-xs'>
                            background:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-40 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={getGradientValue()}
                                readOnly
                            />
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('background', getGradientValue())}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        {/* gradientType */}
                        <div className='grid grid-cols-3 gap-2'>
                            {gradientTypeValues.map((value, index) => (
                                <input
                                    key={index}
                                    type='radio'
                                    name='gradient'
                                    className="btn"
                                    aria-label={value}
                                    value={value}
                                    checked={gradientType === value}
                                    onChange={(e) => updateGradientType(e.target.value)}
                                />
                            ))}
                        </div>

                        <div className="divider font-bold text-lg">Detail</div>
                        <div className='grid grid-cols-2 gap-2'>
                            <div className='col-start-1 col-end-3 flex justify-end'>
                                {/* use text 체크박스 */}
                                {/* <div className='flex items-center justify-end gap-2 px-2'>
                                    <div className='flex items-center justify-center font-bold text-sm'>Use Text</div>
                                    <input type="checkbox" className="checkbox checkbox-info checkbox-xs"
                                        checked={useText}
                                        onChange={() => setUseText(!useText)}
                                    />
                                </div> */}

                                {/* conic sing degree 체크박스 */}
                                {gradientType === 'conic' ? (
                                    <div className='flex items-center justify-end gap-2 px-2'>
                                        <div className='flex items-center justify-center font-bold text-sm'>Single Degree</div>
                                        <input type="checkbox" className="checkbox checkbox-info checkbox-xs"
                                            checked={useSingleDeg}
                                            onChange={() => setUseSingleDeg(!useSingleDeg)}
                                        />
                                    </div>
                                ) : null}
                            </div>

                            {/* stops, 모두 사용됨 */}
                            <div className='flex items-center justify-center font-bold text-sm'>Stops</div>
                            <input type="number" className="btn btn-sm focus:outline-none border-2 focus:border-gray-400" min="2" max="5"
                                value={gradientCount}
                                onChange={(e) => updateGradientCount(Number(e.target.value))}
                            />

                            {/* linear 인 경우 전체 degree 지정 */}
                            {gradientType === 'linear' ? (
                                <>
                                    <div className='flex items-center justify-center font-bold text-sm'>Degree</div>
                                    <input type="number" className="btn btn-sm focus:outline-none border-2 focus:border-gray-400" min="0" max="360"
                                        value={gradientDegree}
                                        onChange={(e) => updateGradientDegree(Number(e.target.value))}
                                    />
                                </>
                            ) : null}

                            {/* radial 인 경우 radial 형태 지정 */}
                            {gradientType === 'radial' ? (
                                <div className='col-start-1 col-end-3 grid grid-cols-3 gap-2 pt-2'>
                                    {radialValues.map((value, index) => (
                                        <input type="radio" name='radial' className="btn"
                                            aria-label={value}
                                            checked={radial === value}
                                            onChange={() => setRadial(value)}
                                        />
                                    ))}
                                </div>
                            ) : null}
                        </div>

                        {gradientDetails.map((graident, index) => (
                            <div key={index}>
                                <div className="divider font-bold text-lg">Gradient Stop {index + 1}</div>
                                <div className='grid grid-cols-4 gap-2'>
                                    <input type="color" className="col-start-1 col-end-3 btn p-0 w-full"
                                        value={graident.color}
                                        onChange={(e) => updateGradientDetails(index, 'color', e.target.value)}
                                    />
                                    <input type="text" className="col-start-3 col-end-5 btn focus:outline-none border-2 focus:border-gray-400"
                                        value={graident.color}
                                        onChange={(e) => updateGradientDetails(index, 'color', e.target.value)}
                                        placeholder='color'
                                    />
                                    {gradientType !== 'conic' ? (
                                        <>
                                            <div className='col-start-1 col-end-3 flex items-center justify-center font-bold text-sm'>Stops</div>
                                            <input type="text" className="col-start-3 col-end-5 btn focus:outline-none border-2 focus:border-gray-400"
                                                value={graident.stops}
                                                onChange={(e) => updateGradientDetails(index, 'stops', e.target.value)}
                                                placeholder='stops'
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <div className='col-start-1 col-end-3 flex items-center justify-center font-bold text-sm'>Start Deg</div>
                                            <input type="text" className="col-start-3 col-end-5 btn focus:outline-none border-2 focus:border-gray-400"
                                                value={graident.startDegree}
                                                onChange={(e) => updateGradientDetails(index, 'startDegree', e.target.value)}
                                                placeholder='Start Deg'
                                            />
                                            {!useSingleDeg ? (
                                                <>
                                                    <div className='col-start-1 col-end-3 flex items-center justify-center font-bold text-sm'>End Deg</div>
                                                    <input type="text" className="col-start-3 col-end-5 btn focus:outline-none border-2 focus:border-gray-400"
                                                        value={graident.endDegree}
                                                        onChange={(e) => updateGradientDetails(index, 'endDegree', e.target.value)}
                                                        placeholder='End Deg'
                                                    />
                                                </>
                                            ) : null}
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* view 파트 */}
            {/* transition-transform duration-500 */}
            {/* transform: `translateY(${boxTranslateY}px)` */}
            <div id="view" className='w-full h-full flex items-center justify-center overflow-scroll'>
                <div id='gradient' className='w-[500px] h-[500px] shadow'
                    style={{
                        background: getGradientValue(),
                    }}
                >
                    {/* {useText ? (
                        <p id='background-text' className='font-bold font-mono text-2xl text-transparent text-center p-2'
                            style={{
                                background: getGradientValue(),
                                WebkitBackgroundClip: 'text
                            }}
                        >
                            Phasellus vel justo scelerisque, aliquet nisl in, elementum neque.
                            Proin luctus tortor nec tempor dictum.
                            Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                            In hac habitasse platea dictumst. Nam id lectus metus.
                            Fusce porttitor consectetur augue, at viverra dolor pulvinar ut.
                            Phasellus pellentesque diam eu eros scelerisque, sed auctor nibh pulvinar.
                            Nulla vel egestas nulla. Aliquam in ligula nec velit mollis imperdiet.
                            Nulla et lacinia odio, nec tristique elit. Duis eu metus vel nisl porta venenatis.
                            Etiam vel sem at lorem varius lacinia et venenatis dui. Morbi ultrices vestibulum semper.
                            Phasellus at mi fringilla, auctor dolor vitae, finibus purus.
                            Proin mi urna, aliquam at nibh ac, semper semper eros.
                        </p>
                    ) : null} */}
                </div>
            </div>
        </>
    );
}

export default Gradient;