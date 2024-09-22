// category 페이지 내 옵션 버튼의 토글 기능, 표시 및 숨기기 기능
export const handleOptionToggle = (event: React.MouseEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const optionWrap = document.getElementById('option-wrap') as HTMLElement;

    if(target.checked) {
        optionWrap.classList.add('-translate-x-[95%]');
        setTimeout(() => {
            optionWrap.classList.add('hover:-translate-x-[90%]');
        }, 500)
    } else {
        optionWrap.classList.remove('-translate-x-[95%]', 'hover:-translate-x-[90%]');
    }
};