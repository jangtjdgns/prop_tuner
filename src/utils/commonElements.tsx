// 공용으로 사용되는 요소 관리 유틸리티
import React from "react";
import { getRainbowColorsUpTo } from "./colorUtils";

// 테스트용 박스 생성 함수
export const addBoxes = (
    count: number
    , size: { width: number, height: number }
    , useRainbowBgColor: boolean = true
    , customStyle: React.CSSProperties = {}             // 별도의 스타일 추가 가능
) => {
    let elements = [];

    for (let i = 0; i < count; i++) {
        elements.push(
            <div key={i} className={`box box-${i}`}
                style={{
                    width: size.width,
                    height: size.height,
                    backgroundColor: useRainbowBgColor ? `rgb(${getRainbowColorsUpTo(i)})` : 'black',
                    ...customStyle,
                }}
            ></div>
        );
    }

    return (<>{elements}</>);
}