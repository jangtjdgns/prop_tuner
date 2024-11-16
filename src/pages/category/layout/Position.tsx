// Position.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../utils/handleOptionToggle';
import { copyCss } from '../../../utils/clipboardUtils';
import { useElementOverflowAdjustment } from '../../../hooks/useElementOverflowAdjustment ';

const Position: React.FC = () => {
    type PositionValue = 'static' | 'relative' | 'absolute' | 'sticky' | 'fixed';
    const [position, setPosition] = useState<PositionValue>('static');
    const [top, setTop] = useState<number | string>('0');
    const [left, setLeft] = useState<number | string>('0');
    const [right, setRight] = useState<number | string>('auto');
    const [bottom, setBottom] = useState<number | string>('auto');
    const [unit, setUnit] = useState<'px' | '%'>('px');
    const positionValues: string[] = ['static', 'relative', 'absolute', 'sticky', 'fixed'];
    const [boxTranslateY, setBoxTranslateY] = useState(0);

    // position 업데이트
    const updatePosition = (value: PositionValue) => {
        setPosition(value);
    }

    // unit 업데이트 (단위 변경)
    const updateUnit = (value: 'px' | '%') => {
        setUnit(value);
    }

    // element 위치 업데이트
    const updateElementPosition = (pos: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        // 입력된 값이 빈 문자열이거나 숫자로 변환 불가능한 경우 'auto'로 설정
        const value = inputValue === '' || isNaN(Number(inputValue)) ? 'auto' : Number(inputValue);
        switch (pos) {
            case 'top':
                setTop(value);
                if (value !== 'auto' && bottom !== 'auto') {
                    // bottom이 설정된 상태에서 top을 수정하면 bottom을 auto로
                    setBottom('auto');
                }
                break;
            case 'left':
                setLeft(value);
                if (value !== 'auto' && right !== 'auto') {
                    // right가 설정된 상태에서 left를 수정하면 right를 auto로
                    setRight('auto');
                }
                break;
            case 'bottom':
                setBottom(value);
                if (value !== 'auto' && top !== 'auto') {
                    // top이 설정된 상태에서 bottom을 수정하면 top을 auto로
                    setTop('auto');
                }
                break;
            case 'right':
                setRight(value);
                if (value !== 'auto' && left !== 'auto') {
                    // left가 설정된 상태에서 right를 수정하면 left를 auto로
                    setLeft('auto');
                }
                break;
        }
    }

    const dependencies = [position, top, right, bottom, left, unit];
    useElementOverflowAdjustment(['#position'], () => 0, setBoxTranslateY, dependencies);


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
                        <div className='text-center pt-2 font-bold text-lg'>Position</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div id='option-wrap-bottom' className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll px-2'>
                        {/* Position */}
                        <div className='text-center p-0.5 text-xs'>
                            position:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={position}
                                readOnly
                            />
                            {/* position 복사 */}
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('position', position)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        {/* unit */}
                        <div className="divider font-bold text-base">Unit</div>
                        <div className='grid grid-cols-2 gap-2'>
                            <input type="radio" name='unit' className='btn btn-sm border-2' aria-label='px' value='px'
                                checked={unit === 'px'}
                                onChange={() => updateUnit('px')}
                            />
                            <input type="radio" name='unit' className='btn btn-sm border-2' aria-label='%' value='%'
                                checked={unit === '%'}
                                onChange={() => updateUnit('%')}
                            />
                        </div>

                        {/* position 값 */}
                        <div className="divider font-bold text-lg">Values</div>
                        <div className='grid grid-cols-2 gap-2'>
                            {positionValues.map((value, index) => (
                                <input
                                    key={index}
                                    type='radio'
                                    name='position'
                                    className="btn border-2 focus:border-gray-400"
                                    aria-label={value}
                                    checked={position === value}
                                    onChange={() => updatePosition(value as PositionValue)}
                                />
                            ))}
                        </div>

                        {/* top, right, bottom, left */}
                        <div className="divider font-bold text-base">top right bottom left</div>
                        <div className='grid grid-cols-4 gap-2 items-center text-center'>
                            {/* top */}
                            <div className='font-bold text-xs'>top</div>
                            <input type='text' className="btn btn-sm border-2 focus:border-gray-400 focus:outline-none"
                                value={top}
                                onChange={(event) => updateElementPosition('top', event)}
                            />
                            {/* left */}
                            <div className='font-bold text-xs'>left</div>
                            <input type='text' className="btn btn-sm border-2 focus:border-gray-400 focus:outline-none"
                                value={left}
                                onChange={(event) => updateElementPosition('left', event)}
                            />
                            {/* bottom */}
                            <div className='font-bold text-xs'>bottom</div>
                            <input type='text' className="btn btn-sm border-2 focus:border-gray-400 focus:outline-none"
                                value={bottom}
                                onChange={(event) => updateElementPosition('bottom', event)}
                            />
                            {/* right */}
                            <div className='font-bold text-xs'>right</div>
                            <input type='text' className="btn btn-sm border-2 focus:border-gray-400 focus:outline-none"
                                value={right}
                                onChange={(event) => updateElementPosition('right', event)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* view 파트 */}
            <div id="view" className='w-full h-full flex items-center justify-center overflow-scroll'>
                <div id='position' className='w-[500px] h-[500px] bg-blue-50 shadow relative overflow-scroll transition-transform duration-300'
                    style={{ transform: `translateY(${boxTranslateY}px)` }}
                >
                    <div className='w-[100px] h-[100px] bg-green-500 transition-all duration-300'
                        style={{
                            position,
                            top: top === 'auto' ? undefined : top + unit,
                            right: right === 'auto' ? undefined : right + unit,
                            bottom: bottom === 'auto' ? undefined : bottom + unit,
                            left: left === 'auto' ? undefined : left + unit,
                        }}
                    ></div>
                </div>
            </div>
        </>
    );
}

export default Position;