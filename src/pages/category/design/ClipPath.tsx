// ClipPath.tsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../utils/handleOptionToggle';
import { copyCss } from '../../../utils/clipboardUtils';
import { useElementOverflowAdjustment } from '../../../hooks/useElementOverflowAdjustment ';

const ClipPath: React.FC = () => {
    // 1. clipPath, 값 선택
    const [clipPath, setClipPath] = useState('none');
    const clipPathValues: string[] = ['none', 'inset', 'circle', 'ellipse', 'polygon', 'path'];
    // 'url', 'margin-box', 'border-box', 'padding-box', 'content-box', 'fill-box', /'stroke-box', 'view-box'
    // 2. inset
    const [inset, setInset] = useState<number[]>([70, 50, 0]);                  // [top-bottom, left-right, round]
    // 3. circle
    const [circle, setCircle] = useState<number[]>([200, 50, 50]);              // [radius, pos-x, pox-y]
    // 4. ellipse
    const [ellipse, setEllipse] = useState<number[]>([200, 300, 50, 50]);       // [h-radius, v-radius, pos-x, pos-y]
    // 5. polygon
    const [point, setPoint] = useState(4);                                      // polygon point
    const [polygon, setPolygon] = useState<{ x: number; y: number }[]>([]);     // [{point-x, point-y} * 4] point = 4 => square
    const [isDragging, setIsDragging] = useState(false);                        // dragging state
    const [selectedPoint, setSelectedPoint] = useState(-1);                     // selected point element
    // 6. path
    const [svgPath, setSvgPath] = useState('M 50 250 L 250 100 L 450 250 Z M 120 250 L 120 450 L 380 450 L 380 250 Z ');

    // 기타
    // 이미지
    const image = 'https://cdn.pixabay.com/photo/2022/08/25/09/59/mountains-7409870_1280.jpg';
    // round 관련
    const [round, setRound] = useState(0);                      // round
    const [showRound, setShowRound] = useState(false);          // round wrap 보이기
    // at 관련
    const [showAt, setShowAt] = useState(false);                // at 보이기

    const [boxTranslateY, setBoxTranslateY] = useState(0);

    // update clipPath
    const updateClipPath = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setClipPath(inputValue);
    }

    // update clip-path: inset
    const updateInset = (index: number, inputValue: number) => {
        const value = isNaN(Number(inputValue)) ? 0 : Number(inputValue);

        const updateInsetArr = [...inset];
        updateInsetArr[index] = value;

        if (showRound) {
            updateInsetArr[index] = value;
        }

        setInset(updateInsetArr);
    }
    // update round, inset에서만 사용
    const updateRound = (inputValue: number) => {
        setRound(inputValue);
        updateInset(2, inputValue);
    }

    // update clip-path: circle
    const updateCircle = (index: number, inputValue: number) => {
        const value = isNaN(Number(inputValue)) ? 0 : Number(inputValue);

        const updateCircleArr = [...circle];
        updateCircleArr[index] = value;

        if (showAt) {
            updateCircleArr[index] = value;
        }

        setCircle(updateCircleArr);
    }

    // update clip-path: ellipse
    const updateEllipse = (index: number, inputValue: number) => {
        const value = isNaN(Number(inputValue)) ? 0 : Number(inputValue);

        const updateEllipseArr = [...ellipse];
        updateEllipseArr[index] = value;

        if (showAt) {
            updateEllipseArr[index] = value;
        }

        setEllipse(updateEllipseArr);
    }

    // update clip-path: polygon ===
    const updatePolygon = () => {
        const newPolygon = Array(point).fill({ x: 0, y: 0 });

        const updatedPolygon = newPolygon.map((value, i) => {
            const angle = (i / point) * 2 * Math.PI; // 각도 계산
            const x = (0.5 + 0.5 * Math.cos(angle)) * 100; // x 좌표 계산
            const y = (0.5 + 0.5 * Math.sin(angle)) * 100; // y 좌표 계산
            return { x, y };
        });

        setPolygon(updatedPolygon); // 상태 업데이트
    };
    // update point
    const updatePoint = (inputValue: number) => {
        const value = isNaN(Number(inputValue)) ? 4 : Number(inputValue);
        const rangeValue = Math.max(3, Math.min(12, value)); // 범위 제한 3 ~ 12
        setPoint(rangeValue); // 상태 업데이트
    };
    // 사용자 입력 point position 업데이트
    const updatePolygonPoint = (index: number, axis: 'x' | 'y', newValue: string) => {
        let parsedValue = parseFloat(newValue);
        if (isNaN(parsedValue)) {
            return; // 유효한 값이 아니면 업데이트하지 않음
        }

        parsedValue = Math.max(0, Math.min(100, parsedValue));      // 0 ~ 100 범위 제한
        parsedValue = parseFloat(parsedValue.toFixed(2));           // 소수점 둘째 자리까지 제한

        const updatedPolygon = polygon.map((point, i) => {
            if (i === index) {
                return {
                    ...point,
                    [axis]: parsedValue,  // 'x' 또는 'y' 좌표 업데이트
                };
            }
            return point;
        });
        setPolygon(updatedPolygon); // 업데이트된 폴리곤 상태 설정
    };

    useEffect(() => { updatePolygon(); }, [point]);   // polygon 초기화 업데이트
    useEffect(() => {                               // polygon 변경
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging && selectedPoint !== -1) {
                const viewContainer = document.querySelector('#clip-path') as HTMLElement;
                if (!viewContainer) return;

                const containerRect = viewContainer.getBoundingClientRect();
                let pointX = e.clientX - containerRect.left;
                let pointY = e.clientY - containerRect.top;

                // 포인트가 polygonContainer 바깥으로 나가지 않도록 제한
                pointX = Math.max(0, Math.min(pointX, containerRect.width));
                pointY = Math.max(0, Math.min(pointY, containerRect.height));

                // 소수점 둘째 자리까지 제한
                pointX = parseFloat((pointX / containerRect.width * 100).toFixed(2));
                pointY = parseFloat((pointY / containerRect.height * 100).toFixed(2));

                // 선택된 포인트 위치 업데이트
                const updatedPolygon = [...polygon];
                updatedPolygon[selectedPoint] = {
                    x: pointX,
                    y: pointY,
                };
                setPolygon(updatedPolygon);
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            setSelectedPoint(-1);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, selectedPoint, polygon]);
    const selectPoint = (index: number) => {
        setSelectedPoint(index);
        setIsDragging(true);
    };
    // ===

    // update clip-path: path
    const updatePath = (inputValue: string) => {
        setSvgPath(inputValue);
    }

    // get clipPath wrap
    const getClipPathWrap = () => {
        let clipPathWrap = [
            <div key={clipPath} className="divider font-bold text-lg">Values</div>
        ];

        switch (clipPath) {
            case 'none': clipPathWrap[0] = (<></>); break;
            case 'inset':
                clipPathWrap.push(
                    <>
                        <div className='flex items-center justify-end gap-2 font-bold text-xs px-2'>
                            <div><span className='text-red-500'>*</span> Round</div>
                            <input type="checkbox" className="checkbox checkbox-info checkbox-xs"
                                checked={showRound}
                                onChange={() => setShowRound(!showRound)}
                            />
                        </div>
                        {/* input */}
                        <div className='grid grid-cols-2 gap-2'>
                            {inset.slice(0, 2).map((value, index) => (
                                <React.Fragment key={index}>
                                    <div className='flex items-center justify-center font-bold text-sm'>{index === 0 ? 'top-bototm' : 'left-right'}</div>
                                    <input type="text" className="btn btn-sm focus:outline-none border-2 focus:border-gray-400"
                                        value={value}
                                        onChange={(e) => updateInset(index, Number(e.target.value))}
                                        placeholder='inset'
                                    />
                                </React.Fragment>
                            ))}
                        </div>
                        {/* round */}
                        <div className={showRound ? '' : 'hidden'}>
                            <div className='flex items-center justify-center gap-2'>
                                <input type="range" min={0} max="50" className="range range-xs"
                                    value={round}
                                    onChange={(e) => updateRound(Number(e.target.value))}
                                />
                                <div className='flex items-center'>
                                    <input type="text" className='input input-xs input-bordered w-10 text-center focus:outline-none' value={round + '%'} readOnly />
                                </div>
                            </div>
                        </div>
                    </>
                );
                break;
            case 'circle':
                clipPathWrap.push(
                    <>
                        <div className='flex items-center justify-end gap-2 font-bold text-xs px-2'>
                            <div><span className='text-red-500'>*</span> at</div>
                            <input type="checkbox" className="checkbox checkbox-info checkbox-xs"
                                checked={showAt}
                                onChange={() => setShowAt(!showAt)}
                            />
                        </div>
                        {/* input */}
                        <div className='grid grid-cols-2 gap-2'>
                            <div className='flex items-center justify-center font-bold text-sm'>Radius</div>
                            <input type="text" className="btn btn-sm focus:outline-none border-2 focus:border-gray-400"
                                value={circle[0]}
                                onChange={(e) => updateCircle(0, Number(e.target.value))}
                                placeholder='circle'
                            />
                        </div>
                        {/* at */}
                        <div className={showAt ? '' : 'hidden'}>
                            <div className='grid grid-cols-2 gap-2'>
                                {circle.slice(1).map((value, index) => (
                                    <React.Fragment key={index + 1}>
                                        <div className='flex items-center justify-center font-bold text-sm'>{index === 0 ? 'x (%)' : 'y (%)'}</div>
                                        <input type="text" className="btn btn-sm focus:outline-none border-2 focus:border-gray-400"
                                            value={value}
                                            onChange={(e) => updateCircle(index + 1, Number(e.target.value))}
                                            placeholder='circle'
                                        />
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </>
                );
                break;
            case 'ellipse':
                clipPathWrap.push(
                    <>
                        <div className='flex items-center justify-end gap-2 font-bold text-xs px-2'>
                            <div><span className='text-red-500'>*</span> at</div>
                            <input type="checkbox" className="checkbox checkbox-info checkbox-xs"
                                checked={showAt}
                                onChange={() => setShowAt(!showAt)}
                            />
                        </div>
                        {/* input */}
                        <div className='grid grid-cols-2 gap-2'>
                            {ellipse.slice(0, 2).map((value, index) => (
                                <React.Fragment key={index}>
                                    <div className='flex items-center justify-center font-bold text-sm'>{index === 0 ? 'H-Radius' : 'V-Radius'}</div>
                                    <input type="text" className="btn btn-sm focus:outline-none border-2 focus:border-gray-400"
                                        value={value}
                                        onChange={(e) => updateEllipse(index, Number(e.target.value))}
                                        placeholder='ellipse'
                                    />
                                </React.Fragment>
                            ))}
                        </div>
                        {/* at */}
                        <div className={showAt ? '' : 'hidden'}>
                            <div className='grid grid-cols-2 gap-2'>
                                {ellipse.slice(2).map((value, index) => (
                                    <React.Fragment key={index + 2}>
                                        <div className='flex items-center justify-center font-bold text-sm'>{index === 0 ? 'x (%)' : 'y (%)'}</div>
                                        <input type="text" className="btn btn-sm focus:outline-none border-2 focus:border-gray-400"
                                            value={value}
                                            onChange={(e) => updateEllipse(index + 2, Number(e.target.value))}
                                            placeholder='ellipse'
                                        />
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </>
                );
                break;
            case 'polygon':
                clipPathWrap.push(
                    <>
                        <div className='grid grid-cols-2 gap-2 pb-4'>
                            <div className='flex items-center justify-center font-bold text-sm'>Polygon</div>
                            <input type="number" className="btn btn-sm focus:outline-none border-2 focus:border-gray-400" min="3" max="12"
                                value={point}
                                onChange={(e) => updatePoint(Number(e.target.value))}
                            />
                        </div>
                        <div className='grid grid-cols-3 gap-2'>
                            {polygon.map((value, index) => (
                                <React.Fragment key={index}>
                                    <div className='flex items-center justify-center font-bold text-sm'>Point {index + 1}</div>
                                    <input type="text" className="btn btn-sm focus:outline-none border-2 focus:border-gray-400"
                                        value={parseFloat(value.x.toFixed(2))}
                                        onChange={(e) => updatePolygonPoint(index, 'x', e.target.value)}
                                        placeholder='x'
                                    />
                                    <input type="text" className="btn btn-sm focus:outline-none border-2 focus:border-gray-400"
                                        value={parseFloat(value.y.toFixed(2))}
                                        onChange={(e) => updatePolygonPoint(index, 'y', e.target.value)}
                                        placeholder='y'
                                    />
                                </React.Fragment>
                            ))}
                        </div>
                    </>
                );
                break;
            case 'path':
                clipPathWrap.push(
                    <>
                        <div className='font-bold'>
                            <textarea className='textarea w-full h-32 resize-none border border-gray-400 focus:outline-none focus:border-gray-500'
                                value={svgPath}
                                onChange={(e) => updatePath(e.target.value)}
                            />
                        </div>
                    </>
                );
                break;
        }
        return (clipPathWrap);
    }

    // get clipPath value
    const getClipPathValue = () => {
        let clipPathValue = clipPath;
        switch (clipPathValue) {
            case 'none': break;
            case 'inset':
                clipPathValue = `${clipPath}(${inset[0]}px ${inset[1]}px)`;
                if (showRound) {
                    clipPathValue = clipPathValue.slice(0, -1) + ` round ${inset[2]}%)`;
                }
                break;
            case 'circle':
                clipPathValue = `${clipPath}(${circle[0]}px)`;
                if (showAt) {
                    clipPathValue = clipPathValue.slice(0, -1) + ` at ${circle[1]}% ${circle[2]}%)`;
                }
                break;
            case 'ellipse':
                clipPathValue = `${clipPath}(${ellipse[0]}px ${ellipse[1]}px)`;
                if (showAt) {
                    clipPathValue = clipPathValue.slice(0, -1) + ` at ${ellipse[2]}% ${ellipse[3]}%)`;
                }
                break;
            case 'polygon':
                let polygonPoints = polygon.map(p => `${parseFloat(p.x.toFixed(2))}% ${parseFloat(p.y.toFixed(2))}%`).join(', ');
                clipPathValue = `polygon(${polygonPoints})`;
                break;
            case 'path':
                clipPathValue = `${clipPath}('${svgPath}')`;
                break;
        }
        return clipPathValue;
    }

    const dependencies = [clipPath, inset, circle, ellipse, point, polygon, isDragging, selectedPoint, svgPath, round, showRound, showAt];
    useElementOverflowAdjustment(['#clip-path'], () => 0, setBoxTranslateY, dependencies);


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
                        <div className='text-center pt-2 font-bold text-lg'>Clip Path</div>
                        <div className='px-4 text-xs text-right font-bold'><span className='text-red-700'>*</span> Unit: px</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div id='option-wrap-bottom' className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll px-2'>
                        {/* clip-path */}
                        <div className='text-center p-0.5 text-xs'>
                            clip-path:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-40 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={getClipPathValue()}
                                readOnly
                            />
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('clip-path', getClipPathValue())}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>
                        {/* clip-path 값 선택 */}
                        <div className='grid grid-cols-3 gap-2'>
                            {clipPathValues.map((value, index) => (
                                <input
                                    key={index}
                                    type='radio'
                                    name='clipPath'
                                    className='btn'
                                    aria-label={value}
                                    value={value}
                                    checked={clipPath === value}
                                    onChange={updateClipPath}
                                />
                            ))}
                        </div>

                        {/* clip-path 값 설정 부분 */}

                        {getClipPathWrap()}
                    </div>
                </div>
            </div>

            {/* view 파트 */}
            <div id="view" className='w-full h-full flex items-center justify-center overflow-scroll'>
                <div id='clip-path' className='relative w-[500px] bg-blue-50 shadow transition-transform duration-500'
                    style={{ transform: `translateY(${boxTranslateY}px)` }}
                >
                    <img id="image" className='w-[500px] select-none' alt="no image"
                        draggable='false'
                        src={image}
                        style={{
                            clipPath: getClipPathValue(),
                            transition: clipPath !== 'polygon' ? 'clip-path .5s' : 'none'
                        }}
                    />

                    {/* polygon 사용 시 point 표시 */}
                    <div className={clipPath === 'polygon' ? '' : 'hidden'}>
                        {polygon.map((point, i) => (
                            <div key={i} className="point absolute w-[10px] h-[10px] bg-blue-500 cursor-pointer hover:ring -translate-x-1/2 -translate-y-1/2"
                                style={{
                                    left: `${point.x}%`,
                                    top: `${point.y}%`,
                                    borderRadius: "50%",
                                }}
                                onMouseDown={() => selectPoint(i)}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ClipPath;