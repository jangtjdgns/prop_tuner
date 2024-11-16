// Overflow.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../utils/handleOptionToggle';
import { copyCss } from '../../../utils/clipboardUtils';
import { useElementOverflowAdjustment } from '../../../hooks/useElementOverflowAdjustment ';

const Overflow: React.FC = () => {
    const [overflow, setOverflow] = useState('visible'); // 기본값 visible
    const oveflowValues: string[] = ['visible', 'hidden', 'clip', 'scroll', 'auto'];
    const [whiteSpace, setWhiteSpace] = useState<'normal' | 'nowrap'>('normal');    // "normal" - "nowrap" 값 사용
    const [boxTranslateY, setBoxTranslateY] = useState(0);

    // overflow 업데이트
    const updateOverflow = (value: string) => {
        setOverflow(value);
    }

    // whitespace 업데이트
    const updateWhiteSpace = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.checked ? setWhiteSpace('nowrap') : setWhiteSpace('normal');
    }

    useElementOverflowAdjustment(['#overflow'], () => 0, setBoxTranslateY, [overflow, whiteSpace], {widthPadding: 0, heightPadding: 20});

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
                        <div className='text-center pt-2 font-bold text-lg'>Overflow</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div id='option-wrap-bottom' className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll px-2'>
                        {/* overflow */}
                        <div className='text-center p-0.5 text-xs'>
                            overflow:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={overflow}
                                readOnly
                            />
                            {/* overflow 복사 */}
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('overflow', overflow)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        {/* overflow-values 버튼 */}
                        <div className='grid grid-cols-3 gap-2'>
                            {oveflowValues.map((value, index) => (
                                <input
                                    key={index}
                                    type='radio'
                                    name='overflow'
                                    className="btn border-2 focus:border-gray-400"
                                    aria-label={value}
                                    checked={overflow === value}
                                    onChange={() => updateOverflow(value)}
                                />
                            ))}
                        </div>

                        {/* white-space: nowrap; 속성 활성화 버튼 */}
                        <div className='divider flex items-center justify-center text-xs'>
                            <span className='font-bold'>nowrap</span>
                            <input type="checkbox"
                                id="toggle-clear"
                                className="toggle toggle-info toggle-sm"
                                onChange={(event) => updateWhiteSpace(event)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* view 파트 */}
            <div id="view" className='w-full h-full flex items-center justify-center overflow-scroll'>
                <div id='overflow' className='w-[500px] h-[500px] bg-blue-50 shadow py-2 px-6 transition-transform duration-300'
                    style={{
                        overflow,
                        transform: `translateY(${boxTranslateY}px)`
                    }}
                >
                    <div className='underline'>
                        <p style={{ whiteSpace }}> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a leo eget mauris consectetur porttitor.</p>
                        <p style={{ whiteSpace }}> Sed vitae volutpat leo. Ut dolor mi, suscipit quis tellus et, congue fermentum nunc.</p>
                        <p style={{ whiteSpace }}> Fusce venenatis arcu magna, in facilisis tellus aliquet vitae. Nulla lacinia metus eu ex tincidunt viverra eu eget elit.</p>
                        <p style={{ whiteSpace }}> Etiam dictum sem sed suscipit pellentesque. Phasellus vitae leo eu sem blandit rhoncus.</p>
                        <p style={{ whiteSpace }}> Donec congue nunc in purus ultricies egestas. Quisque sit amet euismod ex, sed luctus purus.</p>
                        <p style={{ whiteSpace }}> Phasellus pretium eget nulla eget eleifend.</p>
                        <p style={{ whiteSpace }}> Ut volutpat justo ex, id iaculis est lobortis sit amet. Donec bibendum mollis dolor, in eleifend metus sagittis id.</p>
                        <p style={{ whiteSpace }}> Maecenas id venenatis odio, ac pulvinar risus. Vestibulum a massa ut nulla sodales fringilla. Integer vestibulum ullamcorper massa nec pulvinar.</p>
                        <p style={{ whiteSpace }}> Phasellus et nibh ultrices, mattis velit nec, scelerisque neque. Nam placerat venenatis lorem sit amet sagittis.</p>
                        <p style={{ whiteSpace }}> Vestibulum condimentum quam dignissim metus pellentesque, sed ornare lacus fringilla. Nullam sit amet lacinia diam.</p>
                        <p style={{ whiteSpace }}> Donec in consequat sem. Integer eget eleifend tellus. Cras eu tempor lectus. Maecenas feugiat sem ac nulla elementum, in rhoncus quam sollicitudin.</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Overflow;