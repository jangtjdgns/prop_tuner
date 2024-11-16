// ListStyle.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../utils/handleOptionToggle';
import { copyCss } from '../../../utils/clipboardUtils';
import { useElementOverflowAdjustment } from '../../../hooks/useElementOverflowAdjustment ';

const ListStyle: React.FC = () => {
    // 1. list style type
    const [listStyleType, setListStyleType] = useState('disc');
    const listStyleTypeValues: string[] = ['none', 'disc', 'circle', 'square', 'decimal', 'georgian', 'trad-chinese-informal', 'kannada'];
    const [customLiType, setCustomLiType] = useState('😊');
    const [isCustom, setIsCumstom] = useState(false);
    // 2. list style position
    const [listStylePosition, setListStylePosition] = useState<'inside' | 'outside'>('outside');
    // 3. list style image
    const [useImage, setUseImage] = useState(false);
    const [listStyleImage, setListStyleImage] = useState('none');
    const [customImage, setCustomImage] = useState('https://img.icons8.com/?size=20&id=50497&format=png&color=000000');

    const [boxTranslateY, setBoxTranslateY] = useState(0);

    // update list-style-type
    const updateListStyleType = (event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>, isCustom: boolean = false) => {
        const target = event.target as HTMLInputElement;
        const inputValue = target.value;
        setIsCumstom(isCustom);

        if (isCustom) setCustomLiType(inputValue);
        setListStyleType(inputValue);
    }

    // update custom image
    const updateCustomImage = (event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        const inputValue = target.value;
        setCustomImage(inputValue);
    }

    const dependencies = [listStyleType, customLiType, isCustom, listStylePosition, useImage, listStyleImage, customImage];
    useElementOverflowAdjustment(['#list-style'], () => 0, setBoxTranslateY, dependencies);


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
                        <div className='text-center pt-2 font-bold text-lg'>List Style</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div id='option-wrap-bottom' className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll px-2'>
                        {/* list style type */}
                        <div className="divider font-bold text-lg">List Style Type</div>
                        <div className='text-center p-0.5 text-xs'>
                            list-style-type:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={!isCustom ? listStyleType : `"${customLiType}"`}
                                readOnly
                            />
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('list-style-type', !isCustom ? listStyleType : `"${customLiType}"`)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        <div className='grid grid-cols-2 gap-2'>
                            {listStyleTypeValues.map((value, index) => (
                                <input
                                    key={index}
                                    type='radio'
                                    name='listStyleType'
                                    className="btn"
                                    aria-label={value}
                                    value={value}
                                    checked={listStyleType === value}
                                    onChange={(e) => updateListStyleType(e)}
                                />
                            ))}
                            <button className="col-start-1 col-end-3 btn p-0">
                                <input
                                    type='text'
                                    className='input w-full h-full bg-transparent focus:outline-none border-2 focus:border-gray-400 text-center'
                                    onClick={(e) => updateListStyleType(e, true)}
                                    onChange={(e) => updateListStyleType(e, true)}
                                    value={customLiType}
                                    placeholder='Value'
                                />
                            </button>
                        </div>
                        {/* list style position */}
                        <div className="divider font-bold text-lg">List Style Position</div>
                        <div className='text-center p-0.5 text-xs'>
                            list-style-position:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={listStylePosition}
                                readOnly
                            />
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('list-style-position', listStylePosition)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        <div className='grid grid-cols-2 gap-2'>
                            <input type='radio' name='listStylePosition' className="btn" aria-label='inside' value='inside'
                                checked={listStylePosition === 'inside'}
                                onChange={() => setListStylePosition('inside')}
                            />
                            <input type='radio' name='listStylePosition' className="btn" aria-label='outside' value='outside'
                                checked={listStylePosition === 'outside'}
                                onChange={() => setListStylePosition('outside')}
                            />
                        </div>

                        {/* list style image */}
                        <div className='divider flex items-center justify-center font-bold text-lg'>
                            <span>List Style Image</span>
                            <input type="checkbox"
                                id="toggle-image"
                                className="toggle toggle-info toggle-sm"
                                onChange={() => setUseImage(!useImage)}
                            />
                        </div>

                        <div id='list-style-image-wrap' className='flex flex-col gap-2'
                            style={{
                                display: !useImage ? 'none' : 'flex'
                            }}
                        >
                            <div className='text-center p-0.5 text-xs'>
                                list-style-image:
                                <input type="text" className='input input-xs mx-1 border-gray-200 w-32 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                    value={listStyleImage === 'url' ? `url("${customImage}")` : listStyleImage}
                                    readOnly
                                />
                                <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                    onClick={() => copyCss('list-style-image', listStyleImage === 'url' ? `url("${customImage}")` : listStyleImage)}
                                >
                                    <FontAwesomeIcon icon={faCopy} />
                                </button>
                            </div>

                            <div className='grid grid-cols-2 gap-2'>
                                <input type='radio' name='listStyleImage' className="btn" aria-label='none' value='none'
                                    checked={listStyleImage === 'none'}
                                    onChange={(e) => setListStyleImage('none')}
                                />
                                <input type='radio' name='listStyleImage' className="btn" aria-label='url' value='url'
                                    checked={listStyleImage === 'url'}
                                    onChange={(e) => setListStyleImage('url')}
                                />
                                <button className="col-start-1 col-end-3 btn p-0"
                                    style={{
                                        display: listStyleImage === 'url' ? 'block' : 'none'
                                    }}
                                >
                                    <input
                                        type='text'
                                        className='input w-full h-full bg-transparent focus:outline-none border-2 focus:border-gray-400 text-center'
                                        value={customImage}
                                        onClick={(e) => updateCustomImage(e)}
                                        onChange={(e) => updateCustomImage(e)}
                                        placeholder='URL'
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* view 파트 */}
            <div id="view" className='w-full h-full flex items-center justify-center overflow-scroll'>
                <div id='list-style' className='w-[300px] min-h-[400px] bg-blue-50 shadow font-mono text-2xl transition-transform duration-500'
                    style={{ transform: `translateY(${boxTranslateY}px)` }}
                >
                    <ul style={{
                        listStyleType: !isCustom ? listStyleType : `"${customLiType}"`,
                        listStylePosition,
                        listStyleImage: useImage ? (listStyleImage === 'url' ? `url("${customImage}")` : listStyleImage) : 'none'
                    }}>
                        <li>Line 1</li>
                        <li>Line 2</li>
                        <li>Line 3</li>
                        <li>Line 4</li>
                        <li>Line 5</li>
                        <li>Line 6</li>
                        <li>Line 7</li>
                        <li>Line 8</li>
                        <li>Line 9</li>
                        <li>Line 10</li>
                        <li>Line 11</li>
                        <li>Line 12</li>
                        <li>Line 13</li>
                        <li>Line 14</li>
                        <li>Line 15</li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default ListStyle;