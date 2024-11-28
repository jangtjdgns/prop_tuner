// Transform.tsx
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../utils/handleOptionToggle';
import { copyCss } from '../../../utils/clipboardUtils';

const Transform: React.FC = () => {
    const transformValues = ["none", "translate", "scale", "skew", "matrix", "rotate"];
    // translate - "translateX", "translateY"
    // sacle - "scaleX", "scaleY"
    // skew - "skewX", "skewY"
    // 1. transform
    const [transform, setTransform] = useState('none');

    // 2. translate(x, y)
    const [translateValues, setTranslateValues] = useState<{ position: string, elements: string, value: number | string }[]>([
        { position: 'x', elements: 'X Translate', value: 0 },
        { position: 'y', elements: 'Y Translate', value: 0 },
    ]);

    // 3. scale(x, y)
    const [scaleValues, setScaleValues] = useState<{ position: string, elements: string, value: number | string }[]>([
        { position: 'x', elements: 'X Scale', value: 1 },
        { position: 'y', elements: 'Y Scale', value: 1 },
    ]);

    // 4. skew(x, y)
    const [skewValues, setSkewValues] = useState<{ position: string, elements: string, value: number | string }[]>([
        { position: 'x', elements: 'X Skew', value: 0 },
        { position: 'y', elements: 'Y Skew', value: 0 },
    ]);

    // 5. matrix(a, b, c, d, e, f)
    const [matrixValues, setMatrixValues] = useState<{ position: string, elements: string, value: number | string }[]>([
        { position: 'a', elements: 'X Scale', value: 1 },             // a. X축 크기 조정 (X-scale)
        { position: 'b', elements: 'X Skew', value: 0 },              // b. X축 기준 Y축 기울기 (X skew)
        { position: 'c', elements: 'Y Skew', value: 0 },              // c. Y축 기준 X축 기울기 (Y skew)
        { position: 'd', elements: 'Y Scale', value: 1 },             // d. Y축 크기 조정 (Y-scale)
        { position: 'e', elements: 'X Translate', value: 0 },         // e. X축 이동 (X translate)
        { position: 'f', elements: 'Y Translate', value: 0 },         // f. Y축 이동 (Y translate)
    ]);

    // 6. rotate(0.5turn)
    const [rotate, setRotate] = useState(0);
    const [rotateDeg, setRotateDeg] = useState(0);
    const [showBorderLine, setShowBorderLine] = useState(false);

    // units
    const [unit, setUnit] = useState<'px' | '%'>('px');

    // update transform value / rotate를 제외한 나머지 속성 값 업데이트(중복부분 제거)
    const updateValue = (position: string, inputValue: number | string,
        values: { position: string; elements: string; value: number | string }[],
        setValues: React.Dispatch<React.SetStateAction<{ position: string; elements: string; value: number | string }[]>>
    ) => {
        const value = inputValue === '' || isNaN(Number(inputValue)) ? 0 : Number(inputValue);

        const newValues = values.map(item =>
            item.position === position ? { ...item, value } : item
        );

        setValues(newValues);
    };

    // update rotate
    const updateRotate = (inputValue: number) => {
        const rangeValue = Math.max(-1, Math.min(1, inputValue));     // 범위 제한 -1 ~ +1
        setRotate(rangeValue);
        setRotateDeg(parseFloat((360 * rangeValue).toFixed(2)));
    }

    // translate 경우 단위 선택란 표시
    const getUnitWrap = () => {
        if (transform === 'translate') {
            return (
                <>
                    <div className="divider font-bold text-lg">Unit</div>
                    <div className='grid grid-cols-2 gap-2'>
                        <input type='radio' name='unit' className="btn btn-sm" aria-label='px' checked={unit === 'px'}
                            onChange={() => setUnit('px')}
                        />
                        <input type='radio' name='unit' className="btn btn-sm" aria-label='%' checked={unit === '%'}
                            onChange={() => setUnit('%')}
                        />
                    </div>
                </>
            )
        }
    }

    // rotate 경우 확인용 테두리 표시
    const getRotateBorderLine = () => {
        if (transform === 'rotate') {
            return (
                <>
                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[200px] w-[1px] h-[200px] bg-black'>
                        <div className='relative font-bold text-lg'>
                            <div className='absolute -translate-y-10 -translate-x-1/2'>{rotateDeg}deg</div>
                        </div>
                    </div>
                    {/* 표시용 테두리 */}
                    {
                        showBorderLine ? (
                            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-black rounded-full'></div>
                        ) : null
                    }

                </>
            )
        }
    }

    // transform 속성 옵션란 반환
    const getPropsOptionWrap = () => {
        switch (transform) {
            case 'translate':
                return (
                    <>
                        {translateValues.map((translate, index) => (
                            <React.Fragment key={index}>
                                <div className='font-bold text-sm'>{translate.elements}</div>
                                <input type='text' className="btn btn-sm border-2 focus:border-gray-400 focus:outline-none"
                                    value={translate.value}
                                    onChange={(e) => updateValue(translate.position, e.target.value, translateValues, setTranslateValues)}
                                />
                            </React.Fragment>
                        ))}
                    </>
                )
            case 'scale':
                return (
                    <>
                        {scaleValues.map((scale, index) => (
                            <React.Fragment key={index}>
                                <div className='font-bold text-sm'>{scale.elements}</div>
                                <input type='text' className="btn btn-sm border-2 focus:border-gray-400 focus:outline-none"
                                    value={scale.value}
                                    onChange={(e) => updateValue(scale.position, e.target.value, scaleValues, setScaleValues)}
                                />
                            </React.Fragment>
                        ))}
                    </>
                )
            case 'skew':
                return (
                    <>
                        {skewValues.map((skew, index) => (
                            <React.Fragment key={index}>
                                <div className='font-bold text-sm'>{skew.elements}</div>
                                <input type='text' className="btn btn-sm border-2 focus:border-gray-400 focus:outline-none"
                                    value={skew.value}
                                    onChange={(e) => updateValue(skew.position, e.target.value, skewValues, setSkewValues)}
                                />
                            </React.Fragment>
                        ))}
                    </>
                )
            case 'matrix':
                return (
                    <>
                        {matrixValues.map((matrix, index) => (
                            <React.Fragment key={index}>
                                <div className='font-bold text-sm'>{matrix.elements}</div>
                                <input type='text' className="btn btn-sm border-2 focus:border-gray-400 focus:outline-none"
                                    value={matrix.value}
                                    onChange={(e) => updateValue(matrix.position, e.target.value, matrixValues, setMatrixValues)}
                                />

                            </React.Fragment>
                        ))}
                    </>
                )
            case 'rotate':
                return (
                    <>
                        <div className='col-start-1 col-end-3 flex items-center justify-end gap-2 font-bold text-xs px-2'>
                            <div><span className='text-red-500'>*</span> border-line</div>
                            <input type="checkbox" className="checkbox checkbox-info checkbox-xs"
                                checked={showBorderLine}
                                onChange={() => setShowBorderLine(!showBorderLine)}
                            />
                        </div>

                        <div className='col-start-1 col-end-3 grid grid-cols-2 gap-2 items-center text-center'>
                            <div className='font-bold text-sm'>Rotate</div>
                            <input type='number' className='btn btn-sm border-2 focus:border-gray-400 focus:outline-none' min={-1} max={1}
                                value={rotate}
                                style={{ MozAppearance: 'textfield' }}  // 화살표 제거
                                onChange={(e) => updateRotate(Number(e.target.value))}
                            />
                        </div>

                        <input type="range" min={-1} max="1" className="col-start-1 col-end-3 range range-xs" step="0.1"
                            value={rotate}
                            onChange={(e) => updateRotate(Number(e.target.value))}
                        />
                    </>
                )
        }
    }

    // transform 속성값 반환
    const getTransform = () => {
        switch (transform) {
            case 'translate': return `translate(${translateValues[0].value}${unit}, ${translateValues[1].value}${unit})`;
            case 'scale': return `scale(${scaleValues[0].value}, ${scaleValues[1].value})`;
            case 'skew': return `skew(${skewValues[0].value}deg, ${skewValues[1].value}deg)`;
            case 'matrix': return `matrix(${matrixValues.map(matrix => matrix.value).join(', ')})`;
            case 'rotate': return `rotate(${rotate}turn)`;
        }
        return '';
    }

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
                        <div className='text-center pt-2 font-bold text-lg'>Transform</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div id='option-wrap-bottom' className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll px-2'>
                        {/* transform */}
                        <div className='text-center p-0.5 text-xs'>
                            transform:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-24 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={getTransform()}
                                readOnly
                            />
                            {/* 속성 복사 */}
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('transform', getTransform())}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        <div className='grid grid-cols-3 gap-2'>
                            {transformValues.map((value, index) => (
                                <input
                                    key={index}
                                    type='radio'
                                    name='transform'
                                    className="btn"
                                    aria-label={value}
                                    checked={transform === value}
                                    onChange={() => setTransform(value)}
                                />
                            ))}
                        </div>

                        {/* 단위 */}
                        {getUnitWrap()}

                        {transform !== 'none' ? (<div className="divider font-bold text-lg">Values</div>) : null}
                        <div className='grid grid-cols-2 gap-2 items-center text-center'>
                            {getPropsOptionWrap()}
                        </div>
                    </div>
                </div>
            </div>

            {/* view 파트 */}
            <div id="view" className='w-full h-full flex items-center justify-center overflow-scroll'>
                <div id='transform' className='relative w-[200px] h-[200px] transition-transform duration-500'
                    style={{
                        backgroundImage: 'linear-gradient(125deg, #00dbde 0%, #fc00ff 100%)',
                        transform: getTransform(),
                    }}
                >
                    {getRotateBorderLine()}
                </div>
            </div>
        </>
    );
}

export default Transform;