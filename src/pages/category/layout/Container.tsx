// src/components/AspectRatio.tsx
// layout
import React, { useState } from 'react';

const Container: React.FC = () => {
    // const [aspectRatio, setAspectRatio] = useState('auto');

    // // 스타일을 업데이트하는 함수
    // const handleAspectRatioChange = (style: string) => {
    //     setAspectRatio(style);
    // }

    return (
        <>
            <div className='flex flex-col gap-2 shadow rounded-xl p-2 border border-gray-200 hover:shadow-xl hover:border-gray-300 transition-all duration-500'>
                {/* 옵션 내용 */}
                {/* <button onClick={() => handleAspectRatioChange('auto')}>Auto</button>
                <button onClick={() => handleAspectRatioChange('1 / 1')}>1 / 1</button>
                <button onClick={() => handleAspectRatioChange('16 / 9')}>16 / 9</button>
                <button onClick={() => handleAspectRatioChange('0.5')}>0.5</button> */}
            </div>

            <div className='flex items-center justify-center'>
                {/* <div style={{ aspectRatio }}>
                    <img
                        src='https://cdn.pixabay.com/photo/2023/05/05/11/01/grebe-7972183_1280.jpg'
                        width={500}
                    />
                </div> */}
            </div>
        </>
    );
}

export default Container;