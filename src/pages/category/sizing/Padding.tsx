// Padding.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../utils/handleOptionToggle';
import { copyCss } from '../../../utils/clipboardUtils';
import { useOverflowHandler } from '../../../hooks/useOverflowHandler';

const Padding: React.FC = () => {
    const [paddingType, setPaddingType] = useState(0);                // padding 타입, 0: all, 1: V&H, 2:Individual
    const [padding, setPadding] = useState(20);                       // 모든 방향 패딩
    const [paddingVertical, setPaddingVertical] = useState(20);       // 수직 여백
    const [paddingHorizontal, setPaddingHorizontal] = useState(20);   // 수평 여백
    const [paddingTop, setPaddingTop] = useState(20);                 // 상단 여백
    const [paddingRight, setPaddingRight] = useState(20);             // 우측 여백
    const [paddingBottom, setPaddingBottom] = useState(20);           // 하단 여백
    const [paddingLeft, setPaddingLeft] = useState(20);               // 좌측 여백

    const [boxTranslateX, setBoxTranslateX] = useState(0);
    const [boxTranslateY, setBoxTranslateY] = useState(0);

    // 패딩 방향 선택
    const handlepaddingType = (event: React.MouseEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        const index = Number(target.value);

        const paddingCopy = document.querySelectorAll('#padding-copy-body>.padding-copy');
        const paddingValues = document.querySelectorAll('#padding-values-body>.padding-value');

        for (let i = 0; i < paddingCopy.length; i++) {
            if (i === index) {
                paddingCopy[i].classList.remove('hidden');
                paddingValues[i].classList.remove('hidden');
                continue;
            }
            paddingCopy[i].classList.add('hidden');
            paddingValues[i].classList.add('hidden');
        }

        setPaddingType(index);
    }

    // update 패딩
    const updatepadding = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const value = inputValue === '' || isNaN(Number(inputValue)) ? 20 : Number(inputValue);
        setPadding(value);
    }

    // update V & H 패딩
    const updateVHpadding = (dir: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const value = inputValue === '' || isNaN(Number(inputValue)) ? 20 : Number(inputValue);
        if (dir === 'V') {
            setPaddingVertical(value);
        } else {
            setPaddingHorizontal(value);
        }
    }

    // update Individual 패딩
    const updateIndividualpadding = (dir: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const value = inputValue === '' || isNaN(Number(inputValue)) ? 20 : Number(inputValue);

        switch (dir) {
            case 'top':
                setPaddingTop(value);
                break;
            case 'right':
                setPaddingRight(value);
                break;
            case 'bottom':
                setPaddingBottom(value);
                break;
            case 'left':
                setPaddingLeft(value);
                break;
        }
    }

    // addBorderLine, 테두리 생성 함수
    const addBorderLine = () => {
        let dir: number[] = new Array(4);

        switch (paddingType) {
            case 0:
                dir.fill(padding);
                break;
            case 1:
                dir.fill(paddingHorizontal, 0, 2);
                dir.fill(paddingVertical, 2, 4);
                break;
            case 2:
                dir.fill(paddingLeft, 0, 1);
                dir.fill(paddingRight, 1, 2);
                dir.fill(paddingTop, 2, 3);
                dir.fill(paddingBottom, 3, 4);
                break;
        }

        return (
            <>
                <div className='absolute h-full text-white font-bold flex items-center'>
                    <div className='relative h-6 flex items-center transition-width duration-500'
                        style={{ width: `${dir[0]}px` }}
                    >
                        <span className='absolute -left-full w-full h-0.5 border-indigo-600 border-t-4 border-dashed'></span>
                        <div className='absolute -left-full -translate-x-12 w-12 text-center text-black select-none'>{dir[0]}</div>
                    </div>
                </div>
                <div className='absolute right-0 h-full text-white font-bold flex items-center'>
                    <div className='relative h-6 flex items-center transition-width duration-500'
                        style={{ width: `${dir[1]}px` }}
                    >
                        <span className='absolute -right-full w-full h-0.5 border-indigo-600 border-t-4 border-dashed'></span>
                        <div className='absolute -right-full translate-x-12 w-12 text-center text-black select-none'>{dir[1]}</div>
                    </div>
                </div>
                <div className='absolute w-full text-white font-bold flex justify-center'>
                    <div className='relative w-6 flex justify-center transition-height duration-500'
                        style={{ height: `${dir[2]}px` }}
                    >
                        <span className='absolute -top-full w-0.5 h-full border-indigo-600 border-r-4 border-dashed'></span>
                        <div className='absolute -top-full -translate-y-8 text-center text-black select-none'>{dir[2]}</div>
                    </div>
                </div>
                <div className='absolute bottom-0 w-full text-white font-bold flex justify-center'>
                    <div className='relative w-6 flex justify-center transition-height duration-500'
                        style={{ height: `${dir[3]}px` }}
                    >
                        <span className='absolute -bottom-full w-0.5 h-full border-indigo-600 border-r-4 border-dashed'></span>
                        <div className='absolute -bottom-full translate-y-8 text-center text-black select-none'>{dir[3]}</div>
                    </div>
                </div>
            </>
        );
    }

    const dependencies = [paddingType, padding, paddingVertical, paddingHorizontal, paddingTop, paddingRight, paddingBottom, paddingLeft];
    useOverflowHandler(['#padding'], setBoxTranslateX, setBoxTranslateY, dependencies, { widthPadding: 100, heightPadding: 150 });

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
                        <div className='text-center pt-2 font-bold text-lg'>padding</div>
                        <div className='px-4 text-xs text-right font-bold'><span className='text-red-700'>*</span> Unit: px</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div id='option-wrap-bottom' className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll px-2'>
                        {/* padding copy body */}
                        <div id='padding-copy-body'>
                            {/* all */}
                            <div className='padding-copy text-center p-0.5 text-xs'>
                                padding:
                                <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                    value={padding}
                                    readOnly
                                />
                                <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                    onClick={() => copyCss('padding', padding, 'px')}
                                >
                                    <FontAwesomeIcon icon={faCopy} />
                                </button>
                            </div>

                            {/* vertical & horizontal */}
                            <div className='padding-copy text-center p-0.5 text-xs hidden'>
                                padding:
                                <input type="text" className='input input-xs mx-1 border-gray-200 w-24 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                    value={`${paddingVertical} ${paddingHorizontal}`}
                                    readOnly
                                />
                                <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                    onClick={() => copyCss('padding', `${paddingVertical}px ${paddingHorizontal}px`)}
                                >
                                    <FontAwesomeIcon icon={faCopy} />
                                </button>
                            </div>

                            {/* top, right, bottom, left */}
                            <div className='padding-copy text-center p-0.5 text-xs hidden'>
                                padding:
                                <input type="text" className='input input-xs mx-1 border-gray-200 w-36 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                    value={`${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`}
                                    readOnly
                                />
                                <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                    onClick={() => copyCss('padding', `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`)}
                                >
                                    <FontAwesomeIcon icon={faCopy} />
                                </button>
                            </div>
                        </div>

                        {/* padding values body */}
                        <div id='padding-values-body'>
                            {/* all */}
                            <div className='padding-value grid'>
                                <input type='text' className="btn border-2 focus:border-gray-400 focus:outline-none"
                                    value={padding}
                                    onChange={updatepadding}
                                />
                            </div>

                            {/* vertical & horizontal */}
                            <div className='padding-value grid grid-cols-2 gap-2 items-center text-center hidden'>
                                <div className='font-bold text-sm'>vertical</div>
                                <input type='text' className="btn btn-sm border-2 focus:border-gray-400 focus:outline-none"
                                    value={paddingVertical}
                                    onChange={(event) => updateVHpadding('V', event)}
                                />
                                <div className='font-bold text-sm'>horizontal</div>
                                <input type='text' className="btn btn-sm border-2 focus:border-gray-400 focus:outline-none"
                                    value={paddingHorizontal}
                                    onChange={(event) => updateVHpadding('H', event)}
                                />
                            </div>

                            {/* top, right, bottom, left */}
                            <div className='padding-value grid grid-cols-4 gap-2 items-center text-center hidden'>
                                {/* top */}
                                <div className='font-bold text-xs'>top</div>
                                <input type='text' className="btn btn-sm border-2 focus:border-gray-400 focus:outline-none"
                                    value={paddingTop}
                                    onChange={(event) => updateIndividualpadding('top', event)}
                                />
                                {/* right */}
                                <div className='font-bold text-xs'>right</div>
                                <input type='text' className="btn btn-sm border-2 focus:border-gray-400 focus:outline-none"
                                    value={paddingRight}
                                    onChange={(event) => updateIndividualpadding('right', event)}
                                />
                                {/* bottom */}
                                <div className='font-bold text-xs'>bottom</div>
                                <input type='text' className="btn btn-sm border-2 focus:border-gray-400 focus:outline-none"
                                    value={paddingBottom}
                                    onChange={(event) => updateIndividualpadding('bottom', event)}
                                />
                                {/* left */}
                                <div className='font-bold text-xs'>left</div>
                                <input type='text' className="btn btn-sm border-2 focus:border-gray-400 focus:outline-none"
                                    value={paddingLeft}
                                    onChange={(event) => updateIndividualpadding('left', event)}
                                />
                            </div>
                        </div>

                        <div className="divider font-bold text-lg">Direction</div>
                        <div className='grid grid-cols-3 gap-2'>
                            <input type='radio' name='padding' className="btn" value='0' aria-label='All' onClick={handlepaddingType} defaultChecked />
                            <input type='radio' name='padding' className="btn" value='1' aria-label='V & H' onClick={handlepaddingType} />
                            <input type='radio' name='padding' className="btn" value='2' aria-label='Individual' onClick={handlepaddingType} />
                        </div>
                    </div>
                </div>
            </div>

            {/* view 파트 */}
            <div id="view" className='relative w-full h-full flex items-center justify-center overflow-scroll font-mono'>
                <div id='padding' className='relative bg-indigo-400 trnasition-transform duration-500'
                    style={{
                        transform: `translate(${boxTranslateX}px, ${boxTranslateY}px)`,
                        padding: paddingType === 0 ?
                            padding : (
                                paddingType === 1 ?
                                    `${paddingVertical}px ${paddingHorizontal}px`
                                    : `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`
                            )
                    }}
                >
                    {/* 상단 블록 */}
                    <div className='w-[500px] min-h-[500px] absolute bottom-full right-1/2 trnasition-transform duration-500'
                        style={{
                            transform: `translate(50%, 0)`,
                            backgroundImage: 'linear-gradient(to top, rgba(161, 140, 209, 1) 0%, rgba(161, 140, 209, 0.5) 50%, rgba(161, 140, 209, 0) 100%)'
                        }}>
                    </div>

                    {/* 하단 블록 */}
                    <div className='w-[500px] min-h-[500px] absolute top-full right-1/2 trnasition-transform duration-500'
                        style={{
                            transform: `translate(50%, 0)`,
                            backgroundImage: 'linear-gradient(to bottom, rgba(161, 140, 209, 1) 0%, rgba(161, 140, 209, 0.5) 50%, rgba(161, 140, 209, 0) 100%)'
                        }}>
                    </div>

                    {/* 좌측 블록 */}
                    <div className='min-w-[500px] h-[500px] absolute top-1/2 right-full trnasition-transform duration-500'
                        style={{
                            transform: `translate(0, -50%)`,
                            backgroundImage: 'linear-gradient(to left, rgba(161, 140, 209, 1) 0%, rgba(161, 140, 209, 0.5) 50%, rgba(161, 140, 209, 0) 100%)'
                        }}>
                    </div>

                    {/* 우측 블록 */}
                    <div className='min-w-[500px] h-[500px] absolute top-1/2 left-full trnasition-transform duration-500'
                        style={{
                            transform: `translate(0, -50%)`,
                            backgroundImage: 'linear-gradient(to right, rgba(161, 140, 209, 1) 0%, rgba(161, 140, 209, 0.5) 50%, rgba(161, 140, 209, 0) 100%)'
                        }}>
                    </div>

                    {/* 테두리 생성 */}
                    <div id='border-line' className='relative w-[500px] h-[500px] border-2 border-indigo-500 bg-indigo-400 transition-padding duration-500'>
                        {addBorderLine()}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Padding;