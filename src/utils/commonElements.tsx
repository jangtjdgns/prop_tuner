// 공용으로 사용되는 요소 관리 유틸리티
import React from "react";
import { getRainbowColorsUpTo } from "./colorUtils";

// 테스트용 박스 생성 함수
/**
 * @param count                 : 박스 개수
 * @param size                  : 박스 사이즈 {width, height}
 * --- @param useRainbowBgColor : 제거함, 무지개 배경 색상 사용여부
 * @param customClassName       : 커스텀 클래스 추가 가능
 * @param customStyles          : 커스텀 스타일 추가 가능, {} = 모든 박스에 대한 스타일 지정, [] = 개별 박스에 대한 스타일 지정
 * @param showBoxNumber         : 박스 번호 표시 여부
 * @returns                     : 추가된 박스 요소들 반환
 */
export const addBoxes = (
    count: number
    , size: { width: number | string, height: number | string }
    // , useRainbowBgColor: boolean = true
    , customClassName: string = ''
    , customStyles: React.CSSProperties[] = []
    , showBoxNumber: boolean = false
) => {
    let elements = [];

    for (let i = 0; i < count; i++) {
        elements.push(
            <div key={i} className={`box box-${i} ` + customClassName}
                style={{
                    width: size.width,
                    height: size.height,
                    backgroundColor: `rgb(${getRainbowColorsUpTo(i)})`,
                    ...customStyles[i],
                }}
            >
                {
                    showBoxNumber ?
                        (
                            <div className="w-full h-full flex items-center justify-center font-bold select-none text-gray-100" > BOX {i + 1}</div >
                        ) : null
                }
            </div >
        );
    }

    return (<>{elements}</>);
}