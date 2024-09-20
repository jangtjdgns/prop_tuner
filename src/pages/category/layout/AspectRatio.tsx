// src/components/AspectRatio.tsx
// layout
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from '@fortawesome/free-solid-svg-icons'

const AspectRatio: React.FC = () => {
    const [aspectRatio, setAspectRatio] = useState('auto');
    const [imgWidth, setImgWidth] = useState('500');

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
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        const style: string = target.value;

        if (style.length != 0) {
            setImgWidth(style);
        }
    };

    // 복사, Clipboard API
    async function copyText() {
        try {
            await navigator.clipboard.writeText(`aspect-ratio: ${aspectRatio}`);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    }

    return (
        <>
            <div className='absolute top-10 left-6'>
                <div className='w-72 flex flex-col gap-2 shadow rounded-xl p-2 bg-white border border-gray-200 hover:shadow-2xl hover:border-gray-300 transition-all duration-500'>
                    {/* 옵션 내용 */}
                    <span className='text-center pt-2 font-bold text-lg'>aspect-ratio</span>
                    <div className='text-center p-0.5 text-xs'>
                        aspect-ratio: <input type="text" id="text-value" className='input input-xs border-gray-200 w-20 rounded focus:outline-none focus:border-gray-200 text-center px-2' value={aspectRatio} readOnly />
                        {/* 복사 버튼 */}
                        <button id="copy-btn" className='absolute btn btn-square btn-ghost btn-xs ml-2'
                            onClick={copyText}
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

                    <button className="btn border-2 focus:border-gray-400 p-0">
                        <input type="text"
                            className='input input-xs w-full h-full bg-transparent focus:outline-none focus:border-0 text-center'
                            onClick={customAspectRatioChange}
                            onChange={customAspectRatioChange}
                            placeholder='w/h'
                        />
                    </button>

                    <span className='text-center p-2 font-bold text-lg'>image width</span>
                    <button className="btn border-2 focus:border-gray-400 p-0">
                        <input type="text"
                            className='input input-xs w-full h-full bg-transparent focus:outline-none focus:border-0 text-center'
                            onClick={handleImageChange}
                            onChange={handleImageChange}
                            value={imgWidth}
                            placeholder='width'
                        />
                    </button>
                </div>
            </div>

            <div id="view" className='w-full h-full overflow-scroll'>
                <div className='flex items-start justify-center'>
                    <img
                        src='https://cdn.pixabay.com/photo/2023/05/05/11/01/grebe-7972183_1280.jpg'
                        width={imgWidth}
                        style={{ aspectRatio }}
                        className='transition-all duration-200'
                    />
                </div>
            </div>
        </>
    );
}

export default AspectRatio;