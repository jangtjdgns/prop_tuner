// 기본 레이아웃 형식(복사용 tsx 파일).tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../utils/handleOptionToggle';
import { copyCss } from '../../../utils/clipboardUtils';
// import { useOverflowHandler } from '../../../hooks/useOverflowHandler';
// transform에서 사용하기 어려움

const Transform3D: React.FC = () => {
    // transform이 제대로 적용되기 위해서는 순서가 중요함, (일단 matrix3d는 제외)
    const transform3DValues = ["perspective", "scale3d", "translate3d", "rotate3d"];
    // 활성화된 속성 체크용
    const [activeProps, setActiveProps] = useState(Array(transform3DValues.length).fill(0));
    // translate - "translateX", "translateY", "translateZ"
    // rotate - "rotateX", "rotateY", "rotateZ"
    // sacle - "scaleX", "scaleY", "scaleZ"

    // 1. perspective
    const [perspective, setPerspective] = useState(500);

    // 2. scale3d(x, y, z)
    const [scale3d, setScale3d] = useState<{ position: string, elements: string, value: number | string }[]>([
        { position: 'x', elements: 'X Scale', value: 1 },
        { position: 'y', elements: 'Y Scale', value: 1 },
        { position: 'z', elements: 'Z Scale', value: 1 },
    ]);

    // 3. translate3d(x, y, z)
    const [translate3d, setTranslate3d] = useState<{ position: string, elements: string, value: number | string }[]>([
        { position: 'x', elements: 'X Translate', value: 0 },
        { position: 'y', elements: 'Y Translate', value: 0 },
        { position: 'z', elements: 'Z Translate', value: 0 },
    ]);

    // 4. rotate3d(x, y, z, deg)
    const [rotate3d, setRotate3d] = useState<{ position: string, elements: string, value: number }[]>([
        { position: 'x', elements: 'X Rotate', value: 1 },
        { position: 'y', elements: 'Y Rotate', value: 1 },
        { position: 'z', elements: 'Z Rotate', value: 1 },
    ]);
    const [rotateDeg, setRotateDeg] = useState(45);

    // update activeProps
    const updateActiveProps = (index: number) => {
        const updatedActive = [...activeProps];
        updatedActive[index] = activeProps[index] === 1 ? 0 : 1;
        setActiveProps(updatedActive);
    }

    // update perspective
    const updatePerspective = (inputValue: number) => {
        const value = isNaN(inputValue) ? 200 : inputValue;
        setPerspective(value);
    }

    // update transform3d value
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

    // update rotate3d value
    const updateRotateValues = (position: string, inputValue: boolean,
        values: { position: string; elements: string; value: number }[],
        setValues: React.Dispatch<React.SetStateAction<{ position: string; elements: string; value: number }[]>>
    ) => {
        const value = inputValue === true ? 1 : 0;
        const newValues = values.map(item =>
            item.position === position ? { ...item, value } : item
        );
        setValues(newValues);
    };
    // update rotateDegree
    const updateRotateDegree = (inputValue: number) => {
        const value = isNaN(inputValue) ? 0 : inputValue;
        setRotateDeg(value);
    }

    // transform3d 속성 옵션란 반환
    const getPropsOptionWrap = (value: string) => {
        switch (value) {
            case 'perspective':
                return activeProps[0] === 1 ? (
                    <>
                        <div className='col-start-1 col-end-3 grid grid-cols-2 gap-2 items-center text-center'>
                            <div className='font-bold text-sm'>perspective</div>
                            <input type='number' className='btn btn-sm border-2 focus:border-gray-400 focus:outline-none' min={-1} max={1}
                                value={perspective}
                                style={{ MozAppearance: 'textfield' }}  // 화살표 제거
                                onChange={(e) => updatePerspective(Number(e.target.value))}
                            />
                        </div>

                        <input type="range" min={200} max="800" className="col-start-1 col-end-3 range range-xs" step="100"
                            value={perspective}
                            onChange={(e) => updatePerspective(Number(e.target.value))}
                        />
                    </>
                ) : null;
            case 'scale3d':
                return activeProps[1] === 1 ? (
                    <>
                        {scale3d.map((scale, index) => (
                            <React.Fragment key={index}>
                                <div className='font-bold text-sm'>{scale.elements}</div>
                                <input type='text' className="btn btn-sm border-2 focus:border-gray-400 focus:outline-none"
                                    value={scale.value}
                                    onChange={(e) => updateValue(scale.position, e.target.value, scale3d, setScale3d)}
                                />
                            </React.Fragment>
                        ))}
                    </>
                ) : null;
            case 'translate3d':
                return activeProps[2] === 1 ? (
                    <>
                        {translate3d.map((translate, index) => (
                            <React.Fragment key={index}>
                                <div className='font-bold text-sm'>{translate.elements}</div>
                                <input type='text' className="btn btn-sm border-2 focus:border-gray-400 focus:outline-none"
                                    value={translate.value}
                                    onChange={(e) => updateValue(translate.position, e.target.value, translate3d, setTranslate3d)}
                                />
                            </React.Fragment>
                        ))}
                    </>
                ) : null;
            case 'rotate3d':
                return activeProps[3] === 1 ? (
                    <>
                        {rotate3d.map((rotate, index) => (
                            <React.Fragment key={index}>
                                <div className='font-bold text-sm'>{rotate.elements}</div>
                                <input type='checkbox' className="checkbox justify-self-center"
                                    checked={Boolean(rotate.value)}
                                    onChange={(e) => updateRotateValues(rotate.position, e.target.checked, rotate3d, setRotate3d)}
                                />
                            </React.Fragment>
                        ))}
                        {/* rotate degree */}
                        <div className='font-bold text-sm'>degree</div>
                        <input type='text' className="btn btn-sm border-2 focus:border-gray-400 focus:outline-none"
                            value={rotateDeg}
                            onChange={(e) => updateRotateDegree(Number(e.target.value))}
                        />
                    </>
                ) : null;
        }
    }

    // transform 속성값 반환
    const getTransform = () => {
        const transform3dValues = {
            perspective: `perspective(${perspective}px)`,
            scale3d: `scale3d(${scale3d.map(scale => scale.value).join(', ')})`,
            translate3d: `translate3d(${translate3d.map(translate => translate.value + 'px').join(', ')})`,
            rotate3d: `rotate3d(${rotate3d.map(rotate => rotate.value).join(', ')}, ${rotateDeg}deg)`,
        }

        // 활성화된 속성들 이어붙이기
        const activeTransform = transform3DValues.map((prop, index) => {
            // activeProps에서 해당 속성이 활성화(1)되었으면 그 값을 반환
            if (activeProps[index] === 1) {
                switch (prop) {
                    case "perspective": return transform3dValues.perspective;
                    case "scale3d": return transform3dValues.scale3d;
                    case "translate3d": return transform3dValues.translate3d;
                    case "rotate3d": return transform3dValues.rotate3d;
                }
            }
            return '';
        }).filter(Boolean).join(' ');

        return activeTransform;
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

                        {transform3DValues.map((value, index) => (
                            <React.Fragment key={index}>
                                <div className='divider flex items-center justify-center font-bold'>
                                    <span>{value === 'perspective' ? '* ' + value : value}</span>
                                    <input type="checkbox"
                                        id="toggle-transform3d"
                                        className="toggle toggle-info toggle-sm"
                                        onChange={() => updateActiveProps(index)}
                                    />
                                </div>
                                <div className='grid grid-cols-2 gap-2 items-center text-center'>
                                    {getPropsOptionWrap(value)}
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>

            {/* view 파트 */}
            {/* transition-transform duration-500 */}
            {/* transform: `translateY(${boxTranslateY}px)` */}
            <div id="view" className='w-full h-full flex items-center justify-center overflow-scroll'>
                <div id='transform' className='relative w-[200px] h-[200px] transition-transform duration-500'
                    style={{
                        backgroundImage: 'linear-gradient(125deg, #00dbde 0%, #fc00ff 100%)',
                        transform: getTransform(),
                        transformStyle: "preserve-3d",      // 3D 변환 유지
                    }}
                >
                    {/* x축 기준선, red */}
                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[1px] border border-red-500 text-right'>x</div>
                    {/* y축 기준선, blue */}
                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[400px] border border-blue-500'>y</div>
                    {/* z축 기준선, black */}
                    <div className="absolute top-1/2 left-1/2 w-[1px] h-[400px] border border-black"
                        style={{ transform: "translate(-50%, -50%) rotateX(-90deg)" }}
                    >z</div>
                </div>
            </div>
        </>
    );
}

export default Transform3D;