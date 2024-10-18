// Background.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { handleOptionToggle } from '../../../../utils/handleOptionToggle';
import { copyCss } from '../../../../utils/clipboardUtils';
// import { useElementOverflowAdjustment } from '../../../../hooks/useElementOverflowAdjustment ';
// background-attachment 속성 떄문에 useElementOverflowAdjustment 사용할 수 없음

// = background 구성 속성 =
// - background-color
// - background-clip
// = background-image 관련 속성 =
// - background-size
// - background-origin
// - background-position
// - background-repeat
// - background-attachment

const Background: React.FC = () => {
    // 1. background-color
    const [backgroundColor, setBackgroundColor] = useState('#818CF8');
    // const [bgOpacity, setBgOpacity] = useState(1);
    // 2. background-clip
    const [backgroundClip, setBackgroundClip] = useState('border-box');
    const bgClipValues: string[] = ['border-box', 'padding-box', 'content-box', 'text'];
    const [showBorder, setShowBorder] = useState(true);             // border-숨김여부
    // 3. background-image
    const [backgroundImage, setBackgroundImage] = useState('https://img.icons8.com/?size=100&id=khlCdbEXD0Sp&format=png&color=000000');
    const [useBgImage, setUseImage] = useState(false);              // 이미지 사용여부
    // 4. background-size
    const [backgroundSize, setBackgroundSize] = useState('20%');    // contain || cover
    const [customBgSize, setCusomBgSize] = useState('20%');
    // 5. background-origin
    const [backgroundOrigin, setBackgroundOrigin] = useState('border-box');
    const bgOriginValues: string[] = ['border-box', 'padding-box', 'content-box'];
    // 6. background-position
    const [backgroundPosition, setBackgroundPosition] = useState('top');
    const bgPositionValues: string[] = ['top', 'bottom', 'left', 'right', 'center'];
    const [customBgPosition, setCustomBgPosition] = useState('50%');
    // 7. background-repeat
    const [backgroundRepeat, setBackgroundRepeat] = useState('repeat');
    const bgRepeatValues: string[] = ['repeat', 'no-repeat', 'repeat-x', 'repeat-y', 'space', 'round'];
    // 8. background-attachment
    const [backgroundAttachment, setBackgroundAttachment] = useState('scroll');
    const bgAttachmentValues: string[] = ['scroll', 'fixed', 'local'];

    // update background props
    const updateBgProps = (property: string, event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        const inputValue = target.value;

        switch (property) {
            case 'color': setBackgroundColor(inputValue); break;
            case 'clip': setBackgroundClip(inputValue); break;
            case 'image': setBackgroundImage(inputValue); break;
            case 'size':
                if (!(inputValue === 'contain' || inputValue === 'cover')) {
                    setCusomBgSize(inputValue);
                }
                setBackgroundSize(inputValue);
                break;
            case 'origin': setBackgroundOrigin(inputValue); break;
            case 'position':
                if (!bgPositionValues.includes(inputValue)) {
                    setCustomBgPosition(inputValue);
                }
                setBackgroundPosition(inputValue);
                break;
            case 'repeat': setBackgroundRepeat(inputValue); break;
            case 'attachment': setBackgroundAttachment(inputValue); break;
        }
    }

    // background-image 관련 wrap 표시
    const showBackgounrdImageWrap = (event: React.ChangeEvent<HTMLInputElement>) => {
        const useImageWrap = event.target.checked;
        const imageWrapElement = document.querySelector('#background-image-wrap') as Element;
        setUseImage(useImageWrap);
        useImageWrap ? imageWrapElement.classList.remove('hidden') : imageWrapElement.classList.add('hidden');
    }

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
                        <div className='text-center pt-2 font-bold text-lg'>Background</div>
                        {/* 아래 태그는 표시할 내용이 있는 경우 사용 */}
                        {/* <div className='px-4 text-xs text-right font-bold'><span className='text-red-700'>*</span> Basis: object-fit: none;</div> */}
                    </div>

                    {/* 옵션 내용 하단 */}
                    <div className='flex flex-col gap-2 max-h-[360px] overflow-y-scroll'>
                        {/* 1. background-color */}
                        <div className="divider font-bold text-lg">Color</div>
                        <div className='text-center p-0.5 text-xs'>
                            background-color:
                            <input type="text" className='input input-xs w-20 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={backgroundColor}
                                readOnly
                            />
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2'
                                onClick={() => copyCss('background-color', backgroundColor)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>
                        {/* background-color 값 */}
                        <div className='grid grid-cols-3 gap-2'>
                            <input type="color" className="col-start-1 col-end-2 btn p-0 w-full"
                                value={backgroundColor}
                                onChange={(e) => updateBgProps('color', e)}
                            />
                            <input type="text" className="col-start-2 col-end-4 btn focus:outline-none border-2 focus:border-gray-400"
                                value={backgroundColor}
                                onChange={(e) => updateBgProps('color', e)}
                                placeholder='bg-color'
                            />
                        </div>

                        {/* 2. background-clip */}
                        <div className="divider font-bold text-lg">Clip</div>
                        <div className='text-center p-0.5 text-xs'>
                            background-clip:
                            <input type="text" className='input input-xs w-20 border-gray-200 w-24 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                value={backgroundClip}
                                readOnly
                            />
                            <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2'
                                onClick={() => copyCss('background-clip', backgroundClip)}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>
                        {/* border 숨김 토글 버튼 */}
                        <div className='flex items-center justify-center font-bold gap-4 text-xs pb-1'>
                            <span>Show Border</span>
                            <input type="checkbox"
                                id="toggle-border"
                                className="toggle toggle-info toggle-xs"
                                checked={showBorder}
                                onChange={() => showBorder ? setShowBorder(false) : setShowBorder(true)}
                            />
                        </div>
                        {/* background-clip 값 */}
                        <div className='grid grid-cols-2 gap-2'>
                            {bgClipValues.map((value, index) => (
                                <input
                                    key={index}
                                    type='radio'
                                    name='bgClip'
                                    className="btn"
                                    aria-label={value}
                                    value={value}
                                    checked={backgroundClip === value}
                                    onChange={(e) => updateBgProps('clip', e)}
                                />
                            ))}
                        </div>

                        {/* background-image 관련 */}
                        {/* 관련 속성 활성화 버튼 */}
                        <div className='divider font-bold text-lg pb-1'>
                            <span>Image</span>
                            <input type="checkbox"
                                id="toggle-backgroundImage"
                                className="toggle toggle-info toggle-sm"
                                onChange={showBackgounrdImageWrap}
                            />
                        </div>
                        {/* image-wrap */}
                        <div id='background-image-wrap' className='hidden flex flex-col gap-2'>
                            {/* 3. background-image */}
                            <div className='text-center p-0.5 text-xs'>
                                background-image:
                                <input type="text" className='input input-xs w-20 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                    value={`url("${backgroundImage}")`}
                                    readOnly
                                />
                                <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2'
                                    onClick={() => copyCss('background-image', `url("${backgroundImage}")`)}
                                >
                                    <FontAwesomeIcon icon={faCopy} />
                                </button>
                            </div>
                            {/* background-image 값, 이미지 변경 */}
                            <button className="btn p-0">
                                <input type="text"
                                    className="input input-xs w-full h-full bg-transparent focus:outline-none border-2 focus:border-gray-400 text-center"
                                    value={backgroundImage}
                                    onChange={(e) => updateBgProps('image', e)}
                                    placeholder='Image URL'
                                />
                            </button>

                            {/* 4. background-size */}
                            <div className="divider font-bold text-lg">Size</div>
                            <div className='text-center pb-0.5 text-xs'>
                                background-size:
                                <input type="text" className='input input-xs w-20 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                    value={backgroundSize}
                                    readOnly
                                />
                                <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2'
                                    onClick={() => copyCss('background-size', backgroundSize)}
                                >
                                    <FontAwesomeIcon icon={faCopy} />
                                </button>
                            </div>
                            {/* background-size 값 */}
                            <div className='grid grid-cols-2 gap-2'>
                                <input type='radio' name='bgSize' className="btn" aria-label='contain' value='contain'
                                    checked={backgroundSize === 'contain'}
                                    onChange={(e) => updateBgProps('size', e)}
                                />
                                <input type='radio' name='bgSize' className="btn" aria-label='cover' value='cover'
                                    checked={backgroundSize === 'cover'}
                                    onChange={(e) => updateBgProps('size', e)}
                                />
                                {/* custom bg-size value */}
                                <button className="col-start-1 col-end-3 btn p-0">
                                    <input type="text"
                                        className="input input-xs w-full h-full bg-transparent focus:outline-none border-2 focus:border-gray-400 text-center"
                                        value={customBgSize}
                                        onClick={(e) => updateBgProps('size', e)}
                                        onChange={(e) => updateBgProps('size', e)}
                                        placeholder='50%    or    200px 300px'
                                    />
                                </button>
                            </div>

                            {/* 5. background-origin */}
                            <div className="divider font-bold text-lg">Origin</div>
                            <div className='text-center pb-0.5 text-xs'>
                                background-origin:
                                <input type="text" className='input input-xs w-20 border-gray-200 w-24 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                    value={backgroundOrigin}
                                    readOnly
                                />
                                <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2'
                                    onClick={() => copyCss('background-origin', backgroundOrigin)}
                                >
                                    <FontAwesomeIcon icon={faCopy} />
                                </button>
                            </div>
                            {/* background-origin 값 */}
                            <div className='grid grid-cols-2 gap-2'>
                                {bgOriginValues.map((value, index) => (
                                    <input
                                        key={index}
                                        type='radio'
                                        name='bgOrigin'
                                        className={index !== bgOriginValues.length - 1 ? 'btn' : 'col-start-1 col-end-3 btn'}
                                        aria-label={value}
                                        value={value}
                                        checked={backgroundOrigin === value}
                                        onChange={(e) => updateBgProps('origin', e)}
                                    />
                                ))}
                            </div>

                            {/* 6. background-position */}
                            <div className="divider font-bold text-lg">Position</div>
                            <div className='text-center pb-0.5 text-xs'>
                                background-position:
                                <input type="text" className='input input-xs w-20 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                    value={backgroundPosition}
                                    readOnly
                                />
                                <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2'
                                    onClick={() => copyCss('background-position', backgroundPosition)}
                                >
                                    <FontAwesomeIcon icon={faCopy} />
                                </button>
                            </div>
                            {/* background-position 값 */}
                            <div className='grid grid-cols-2 gap-2'>
                                {bgPositionValues.map((value, index) => (
                                    <input
                                        key={index}
                                        type='radio'
                                        name='bgPosition'
                                        className='btn'
                                        aria-label={value}
                                        value={value}
                                        checked={backgroundPosition === value}
                                        onChange={(e) => updateBgProps('position', e)}
                                    />
                                ))}
                                {/* custom bg-position value */}
                                <button className="btn p-0">
                                    <input type="text"
                                        className="input input-xs w-full h-full bg-transparent focus:outline-none border-2 focus:border-gray-400 text-center"
                                        value={customBgPosition}
                                        onClick={(e) => updateBgProps('position', e)}
                                        onChange={(e) => updateBgProps('position', e)}
                                        placeholder='50%  or  30% 20%'
                                    />
                                </button>
                            </div>

                            {/* 7. background-repeat */}
                            <div className="divider font-bold text-lg">Repeat</div>
                            <div className='text-center pb-0.5 text-xs'>
                                background-repeat:
                                <input type="text" className='input input-xs w-20 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                    value={backgroundRepeat}
                                    readOnly
                                />
                                <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2'
                                    onClick={() => copyCss('background-repeat', backgroundRepeat)}
                                >
                                    <FontAwesomeIcon icon={faCopy} />
                                </button>
                            </div>
                            {/* background-repeat 값 */}
                            <div className='grid grid-cols-2 gap-2'>
                                {bgRepeatValues.map((value, index) => (
                                    <input
                                        key={index}
                                        type='radio'
                                        name='bgRepeat'
                                        className='btn'
                                        aria-label={value}
                                        value={value}
                                        checked={backgroundRepeat === value}
                                        onChange={(e) => updateBgProps('repeat', e)}
                                    />
                                ))}
                            </div>

                            {/* 8. background-attachment */}
                            <div className="divider font-bold text-lg">Attachment</div>
                            <div className='text-center pb-0.5 text-xs'>
                                background-attachment:
                                <input type="text" className='input input-xs w-20 border-gray-200 w-16 rounded focus:outline-none focus:border-gray-200 text-center px-2'
                                    value={backgroundAttachment}
                                    readOnly
                                />
                                <button className='copy-css-btn btn btn-square btn-ghost btn-xs ml-2'
                                    onClick={() => copyCss('background-attachment', backgroundAttachment)}
                                >
                                    <FontAwesomeIcon icon={faCopy} />
                                </button>
                            </div>
                            {/* background-attachment 값 */}
                            <div className='grid grid-cols-2 gap-2'>
                                {bgAttachmentValues.map((value, index) => (
                                    <input
                                        key={index}
                                        type='radio'
                                        name='bgAttachment'
                                        className={index !== bgAttachmentValues.length - 1 ? 'btn' : 'col-start-1 col-end-3 btn'}
                                        aria-label={value}
                                        value={value}
                                        checked={backgroundAttachment === value}
                                        onChange={(e) => updateBgProps('attachment', e)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* view 파트 */}
            <div id="view" className='w-full h-full flex items-center justify-center overflow-scroll'>
                <div className='w-[500px] h-[500px] overflow-scroll'>
                    <div id='background' className='flex items-center justify-center font-mono font-bold p-6 text-2xl text-gray-50 text-center'
                        style={{
                            backgroundColor,
                            backgroundClip,
                            backgroundImage: useBgImage ? `url("${backgroundImage}")` : 'none',
                            backgroundSize,
                            backgroundOrigin,
                            backgroundPosition,
                            backgroundRepeat,
                            backgroundAttachment,
                            border: showBorder ? '10px dashed #000000' : 'none'
                        }}>
                        Aliquam elementum ultrices luctus. Vestibulum cursus eget velit iaculis aliquet.
                        Etiam elementum hendrerit leo, eget auctor quam faucibus luctus.
                        Duis lectus ipsum, condimentum sed porta nec, placerat luctus lorem. Maecenas gravida erat a bibendum congue.
                        Donec porttitor, tellus non suscipit condimentum, purus ante accumsan nisl, a consectetur sapien mauris eget arcu.
                        Vivamus hendrerit efficitur ex, id fermentum velit facilisis non.
                        Nam volutpat iaculis massa, non ultricies dolor porttitor sed. Proin pharetra iaculis lectus et tincidunt.
                        Ut risus metus, commodo nec ipsum at, pellentesque ultrices leo.
                        Suspendisse scelerisque magna sed nibh fringilla porta. Sed nec placerat nunc. Vivamus id ipsum eros.
                    </div>
                </div>
            </div>
        </>
    );
}

export default Background;