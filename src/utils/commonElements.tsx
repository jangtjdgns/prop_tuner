// 공용으로 사용되는 요소 관리 유틸리티
import React from "react";
import { getRainbowColorsUpTo } from "./colorUtils";

// 테스트용 박스 생성 함수
/**
 * @param count                 : 박스 개수
 * @param size                  : 박스 사이즈 {width, height}
 * @param useRainbowBgColor     : 무지개 배경 색상 사용여부 -> 뺄 수도 있음
 * @param customStyles          : 커스텀 스타일 추가 가능, {} = 모든 박스에 대한 스타일 지정, [] = 개별 박스에 대한 스타일 지정
 * @returns                     : 추가된 박스 요소들 반환
 */
export const addBoxes = (
    count: number
    , size: { width: number, height: number }
    , useRainbowBgColor: boolean = true
    , customStyles: React.CSSProperties[] = []
) => {
    let elements = [];

    for (let i = 0; i < count; i++) {
        elements.push(
            <div key={i} className={`box box-${i}`}
                style={{
                    width: size.width,
                    height: size.height,
                    backgroundColor: useRainbowBgColor ? `rgb(${getRainbowColorsUpTo(i)})` : 'black',
                    ...customStyles[i],
                }}
            ></div>
        );
    }

    return (<>{elements}</>);
}