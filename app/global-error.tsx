"use client"
import Image from "next/image"
import { Container } from "./error/Error.styled"

export default function GlobalError({
        error,
        reset,
    }: {
        error: Error & { digest?: string }
        reset: () => void
    }) {
    return (
        <html>
        <body>
            <Container>
            <div className="text-center max-w-md">
                <Image src="/images/fox_error404.svg" alt="" width={230} height={230} />
                <h2 className="text-2xl font-bold mb-2">앱에 문제가 발생했습니다</h2>
                <p className="text-gray-600 mb-6">
                {error.message || '알 수 없는 오류가 발생했습니다'}
                </p>
                <button
                onClick={()=>reset()}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                다시 시작
                </button>
            </div>
            </Container>
        </body>
        </html>
    )
}