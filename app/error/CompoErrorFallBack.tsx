"use client"

import { isCriticalError } from "./errorLibrary";
import { Button } from "./Error.styled";

export function CompoErrorFallBack({ error, resetErrorBoundary }: any) {

    if(isCriticalError(error)) {
        throw error
    }

    // 기본 로컬 에러 (국소적인 컴포넌트 단위에서 실행)
    return (
        <div className="bg-amber-100 text-center py-6 px-4 rounded-2xl h-[100%] flex flex-col justify-center items-center">
            <p className="text-4xl mb-4">⚠️</p>
            <p className="text-xl mb-2">{error.message || '데이터 로드에 실패했습니다.'}</p>
            <Button onClick={resetErrorBoundary}>재시도</Button>
        </div>
    );
}