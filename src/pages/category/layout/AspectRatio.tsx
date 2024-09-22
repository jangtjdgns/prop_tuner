// src/components/AspectRatio.tsx
// AspectRatio 속성
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../utils/handleOptionToggle';
import { copyCss } from '../../../utils/clipboardUtils';

const AspectRatio: React.FC = () => {
    const [aspectRatio, setAspectRatio] = useState('auto');
    const [imgWidth, setImgWidth] = useState('500');
    const [image, setImage] = useState('https://cdn.pixabay.com/photo/2023/05/05/11/01/grebe-7972183_1280.jpg');

    // 스타일 업데이트 함수
    const handleAspectRatioChange = (style: string) => {
        setAspectRatio(style);
    }

    // 커스텀 스타일 업데이트 함수
    const customAspectRatioChange = (event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        const style: string = target.value;

        if (style.length != 0) {
            setAspectRatio(style);
        }
    };

    // 이미지 너비 설정
    const handleImageWidthChange = (event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        const style: string = target.value;
        
        if (style.length != 0) {
            setImgWidth(style);
        }
    };

    // 이미지 변경
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        const imageUrl: string = target.value;

        if(imageUrl.length != 0) {
            setImage(imageUrl);
        }
    }

    return (
        <>
            <div id='option-wrap' className='absolute top-10 left-6 transition-transform duration-500 max-h-[480px]'>
                <div className='relative w-72 flex flex-col gap-2 shadow rounded-xl p-2 bg-white border border-gray-200 hover:shadow-2xl hover:border-gray-300 transition-all duration-500'>
                    {/* 옵션 표시 토글 버튼 */}
                    <label id="option-toggle-btn"
                        className="swap absolute top-2 right-2 btn btn-xs btn-circle"
                    >
                        <input type="checkbox" onClick={(event) => handleOptionToggle(event)} />
                        <div className="swap-on"><FontAwesomeIcon icon={faPlus} /></div>
                        <div className="swap-off"><FontAwesomeIcon icon={faMinus} /></div>
                    </label>
                    
                    {/* 옵션 내용 상단 */}
                    <div className='flex flex-col gap-2'>
                        <span className='text-center pt-2 font-bold text-lg'>aspect-ratio</span>
                        <div className='px-4 text-xs text-right font-bold'><span className='text-red-700'>*</span> Unit: px</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll'>
                        {/* aspect-ratio */}
                        <div className='text-center p-0.5 text-xs'>
                            aspect-ratio: <input type="text" id="text-value" className='input input-xs border-gray-200 w-20 rounded focus:outline-none focus:border-gray-200 text-center px-2' value={aspectRatio} readOnly />
                            {/* 복사 버튼 */}
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2'
                                onClick={() => copyCss('aspect-ratio', aspectRatio, true)}
                            >
                                {/* alert 메시지 추가하면 좋을듯 */}
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>
                        <div className='grid grid-cols-2 gap-2'>
                            <button className="btn border-2 focus:border-gray-400" onClick={() => handleAspectRatioChange('auto')}>auto;</button>
                            <button className="btn border-2 focus:border-gray-400" onClick={() => handleAspectRatioChange('1 / 1')}>1 / 1;</button>
                            <button className="btn border-2 focus:border-gray-400" onClick={() => handleAspectRatioChange('16 / 9')}>16 / 9;</button>
                            <button className="btn border-2 focus:border-gray-400" onClick={() => handleAspectRatioChange('0.8')}>0.8;</button>
                        </div>

                        <button className="btn p-0">
                            <input type="text"
                                className='input input-xs w-full h-full bg-transparent focus:outline-none border-2 focus:border-gray-400 text-center'
                                onClick={customAspectRatioChange}
                                onChange={customAspectRatioChange}
                                placeholder='w/h'
                            />
                        </button>

                        <span className='text-center p-2 font-bold text-lg'>image</span>
                        <button className="btn p-0">
                            <input type="text"
                                className='input input-xs w-full h-full bg-transparent focus:outline-none border-2 focus:border-gray-400 text-center'
                                onClick={handleImageWidthChange}
                                onChange={handleImageWidthChange}
                                value={imgWidth}
                                placeholder='width'
                            />
                        </button>
                        <button className="btn p-0">
                            <input type="text"
                                className="input input-xs w-full h-full bg-transparent focus:outline-none border-2 focus:border-gray-400 text-center"
                                onClick={handleImageChange}
                                onChange={handleImageChange}
                                value={image}
                                placeholder='image url'
                            />
                        </button>
                    </div>
                </div>
            </div>
            <div id="view" className='w-full h-full flex items-start justify-center'>
                <div className=''>
                    <img
                        src={image}
                        alt='no image'
                        width={imgWidth}
                        style={{ aspectRatio }}
                        id = 'view-image'
                        className='transition-all duration-200 bg-black flex justify-center items-center text-xl text-white overflow-hidden'
                    />
                </div>
            </div>
        </>
    );
}

export default AspectRatio;