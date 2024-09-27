// ObjectFit.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../utils/handleOptionToggle';
import { copyCss } from '../../../utils/clipboardUtils';

const ObjectFit: React.FC = () => {
    type ObjectFitValue =  'fill' | 'contain' | 'cover' | 'none' | 'scale-down'; 

    const [objectFit, setObjectFit] = useState<ObjectFitValue>('fill');
    const objectFitValues: string[] = ['fill', 'contain', 'cover', 'none', 'scale-down'];
    const [image, setImage] = useState('https://cdn.pixabay.com/photo/2023/05/05/11/01/grebe-7972183_1280.jpg');

    // object-fit 스타일 업데이트
    const updateObjectFit = (style: ObjectFitValue) => {
        setObjectFit(style as ObjectFitValue);
    }

    // 이미지 변경
    const changeImage = (event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        const imageUrl: string = target.value;

        if(imageUrl.length != 0) {
            setImage(imageUrl);
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
                        <div className='text-center pt-2 font-bold text-lg'>Object Fit</div>
                    </div>
                    
                    {/* 옵션 내용 하단 */}
                    <div className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll'>
                        {/* objectFit */}
                        <div className='text-center p-0.5 text-xs'>
                            object-fit: <input type="text" className='input input-xs border-gray-200 w-24 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                            value={objectFit}
                            readOnly
                        />
                            {/* object-fit 복사 */}
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('object-fit', objectFit, false)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>
                        <div className='grid grid-cols-2 gap-2'>
                            {objectFitValues.map((value, index) => (
                                <input
                                    type='radio'
                                    name='objectFit'
                                    className="btn border-2 focus:border-gray-400"
                                    aria-label={value}
                                    checked= {objectFit === value}
                                    onClick={() => updateObjectFit(value as ObjectFitValue)}
                                />
                            ))}
                        </div>
                        
                        {/* 이미지 */}
                        <div className="divider font-bold text-lg">Image</div>
                        <button className="btn p-0">
                            <input type="text"
                                className="input input-xs w-full h-full bg-transparent focus:outline-none border-2 focus:border-gray-400 text-center"
                                onClick={changeImage}
                                onChange={changeImage}
                                value={image}
                                placeholder='image url'
                            />
                        </button>
                    </div>
                </div>
            </div>

            <div id="view" className='w-full h-full flex flex-col items-center justify-start'>
                <div className='border-2 border-[black] w-[500px] h-[500px] overflow-hidden'>
                    <img
                        src={image}
                        alt='no image'
                        style={{ objectFit }}
                        id = 'view-image'
                        className='w-full h-full transition-all duration-200 bg-black flex justify-center items-center text-xl text-white'
                    />
                </div>
            </div>
        </>
    );
}

export default ObjectFit;