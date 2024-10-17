// WhiteSpace.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../../utils/handleOptionToggle';
import { copyCss } from '../../../../utils/clipboardUtils';
import { useElementOverflowAdjustment } from '../../../../hooks/useElementOverflowAdjustment ';

const WhiteSpace: React.FC = () => {
    const [whiteSpace, setWhiteSpace] = useState('normal');
    const whiteSpaceValues: string[] = ['normal', 'nowrap', 'pre', 'pre-wrap', 'pre-line', 'break-spaces'];
    const [paragraph1, setParagraph1] = useState('Nulla ac ullamcorper mi. Phasellus mattis ultrices ligula, non tempus erat fermentum dapibus. Morbi commodo volutpat eros, vel convallis mi congue in. Donec ut libero laoreet, ultricies velit quis, lacinia metus. Pellentesque auctor, purus vel sodales vestibulum, arcu odio dapibus risus, vel facilisis nulla enim in lorem. Integer pellentesque gravida massa at ultricies. Praesent eu risus sit amet elit ullamcorper iaculis.');
    const [paragraph2, setParagraph2] = useState('Aenean sit amet eros non justo rhoncus luctus. Nunc ut mattis dolor, at feugiat mi. Quisque iaculis nulla in nisl molestie, eu volutpat lorem eleifend. Fusce vitae vulputate nunc. Duis ultrices finibus porta. Nunc aliquet orci magna, eu consequat erat viverra a. Vivamus mollis dui ac risus egestas, sed faucibus felis dictum. Cras ac tempor diam, vitae porttitor urna. ');

    const [boxTranslateY, setBoxTranslateY] = useState(0);

    // update white-space
    const updateWhiteSpace = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setWhiteSpace(inputValue);
    }

    // update text
    const updateParagraph = (paragraphIndex: number, event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const inputValue = event.target.value;
        paragraphIndex === 0 ? setParagraph1(inputValue) : setParagraph2(inputValue);
    }


    const dependencies = [whiteSpace, paragraph1, paragraph2];
    useElementOverflowAdjustment(['#white-space'], () => 0, setBoxTranslateY, dependencies, { widthPadding: 0, heightPadding: 100 });


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
                        <div className='text-center pt-2 font-bold text-lg'>White Space</div>
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll'>
                        {/* white-space */}
                        <div className='text-center p-0.5 text-xs'>
                            white-space:
                            <input type="text" className='input input-xs mx-1 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={whiteSpace}
                                readOnly
                            />
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2 flip-horizontal-bottom'
                                onClick={() => copyCss('white-space', whiteSpace)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        <div className='grid grid-cols-3 gap-2'>
                            {whiteSpaceValues.map((value, index) => (
                                <input
                                    key={index}
                                    type='radio'
                                    name='whiteSpace'
                                    className="btn"
                                    aria-label={value}
                                    value={value}
                                    checked={whiteSpace === value}
                                    onChange={updateWhiteSpace}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* view 파트 */}
            <div id="view" className='w-full h-full flex items-center justify-center overflow-scroll'>
                <div id='white-space' className='flex gap-4 font-mono transition-transform duration-500'
                    style={{ transform: `translateY(${boxTranslateY}px)` }}
                >
                    <div className='relative w-[500px] h-[400px] grid grid-rows-2 gap-1 border border-gray-500'>
                        <div className='absolute w-full text-center -top-10 text-3xl font-bold'>Text Input</div>
                        <textarea
                            className='w-full resize-none bg-transparent'
                            placeholder='Please enter the text.'
                            value={paragraph1.trim()}
                            onChange={(e) => updateParagraph(0, e)}
                        />
                        <textarea
                            className='w-full resize-none bg-transparent'
                            placeholder='Please enter the text.'
                            value={paragraph2.trim()}
                            onChange={(e) => updateParagraph(1, e)}
                        />
                    </div>
                    <div className='relative w-[500px] h-[400px] bg-blue-50 shadow p-2'>
                        <div className='absolute w-full text-center -top-10 text-3xl font-bold'>Text Output</div>
                        <div className='w-full h-full overflow-scroll'>
                            <p style={{ whiteSpace }}>{paragraph1}</p>
                            <p style={{ whiteSpace }}>{paragraph2}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WhiteSpace;