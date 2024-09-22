// BoxSizing.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../utils/handleOptionToggle';
import { copyCss } from '../../../utils/clipboardUtils';

const BoxSizing: React.FC = () => {
    const [boxSizing, setBoxSizing] = useState('border');
    const [childWidth, setChildWidth] = useState('100%');
    const [childBorderWidth, setChildBorderWidth] = useState('20px');
    const [childPadding, setChildPadding] = useState('20px');

    // box-sizing 업데이트 함수
    const updateBoxSizing = (value: string) => {
        setBoxSizing(value);
    };

    // child width 업데이트 함수
    const updateChildDetail = (detail: string, event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        let value:string = target.value;

        if(!(value.length > 0)) value = '0';

        switch(detail) {
            case 'width': setChildWidth(value); break;
            case 'border': setChildBorderWidth(value); break;
            case 'padding': setChildPadding(value); break;
        }
        
    }

    return (
        <>
            <div id='option-wrap' className='absolute top-10 left-6 transition-transform duration-500'>
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
                        <div className='text-center pt-2 font-bold text-lg'>Box Sizing</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll'>
                        {/* box-sizing */}
                        <div className='text-center p-0.5 text-xs'>
                            box-sizing: <input type="text" className='input input-xs border-gray-200 w-24 rounded focus:outline-none focus:border-gray-200 text-center px-2' value={`${boxSizing}-box`} readOnly />
                            {/* box-sizing 복사 */}
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2'
                                onClick={() => copyCss('box-sizing', `${boxSizing}-box`, false)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>
                        <div className='grid grid-cols-2 gap-2'>
                            <input type='radio' name='boxSizing' className="btn border-2 focus:border-gray-400" value='border-box' aria-label='border-box' onChange={() => updateBoxSizing('border')} defaultChecked />
                            <input type='radio' name='boxSizing' className="btn border-2 focus:border-gray-400" value='content-box' aria-label='content-box' onChange={() => updateBoxSizing('content')} />
                        </div>

                        {/* child 태그 세부 옵션 */}
                        <div className='divider font-bold text-lg'>Child Detail</div>
                        {/* width */}
                        <div className='grid grid-cols-3 gap-2 items-center text-center'>
                            <div className='font-bold text-xs'>width</div>
                            <input type='text' className="col-start-2 col-end-4 btn btn-sm border-2 focus:border-gray-400 focus:outline-none"
                                value={childWidth}
                                onClick={(event) => updateChildDetail('width', event)}
                                onChange={(event) => updateChildDetail('width', event)}
                            />
                        </div>
                        {/* border-width */}
                        <div className='grid grid-cols-3 gap-2 items-center text-center'>
                            <div className='font-bold text-xs'>border-width</div>
                            <input type='text' className="col-start-2 col-end-4 btn btn-sm border-2 focus:border-gray-400 focus:outline-none"
                                value={childBorderWidth}
                                onClick={(event) => updateChildDetail('border', event)}
                                onChange={(event) => updateChildDetail('border', event)}
                            />
                        </div>
                        {/* padding */}
                        <div className='grid grid-cols-3 gap-2 items-center text-center'>
                            <div className='font-bold text-xs'>padding</div>
                            <input type='text' className="col-start-2 col-end-4 btn btn-sm border-2 focus:border-gray-400 focus:outline-none"
                                value={childPadding}
                                onClick={(event) => updateChildDetail('padding', event)}
                                onChange={(event) => updateChildDetail('padding', event)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div id="view" className='w-full h-full flex flex-col items-center justify-start'>
                <div className='w-[400px] h-[400px] border-[20px] border-blue-400 text-center py-10'>
                    <div className='font-bold text-3xl pb-5'>parent</div>
                    <div className={`h-[50%] border-[20px] border-black box-${boxSizing} font-bold text-2xl transition-all duration-500`}
                        style={{
                            width: childWidth,
                            borderWidth: childBorderWidth,
                            padding: childPadding
                        }}
                    >
                        Child
                    </div>
                </div>
            </div>
        </>
    );
}

export default BoxSizing;