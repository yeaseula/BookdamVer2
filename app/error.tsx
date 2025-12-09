"use client"
import { Button, Button2 } from "./error/Error.styled"
import { useAuthStore } from "./lib/userfetch"
import { useEffect } from "react"
import Image from "next/image"

export default function Error({
        error,
        reset,
    }: {
        error: Error & { digest?: string }
        reset: () => void
    }) {

    const setGlobalError = useAuthStore((s) => s.setGlobalError)
    useEffect(() => {
        setGlobalError(true)
        return () => setGlobalError(false)
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="text-center max-w-md">
            <Image src="/images/fox_error404.svg" alt="" width={230} height={230} />
            <h2 className="text-2xl font-bold mb-2">문제가 발생했습니다</h2>
            <p className="text-gray-600 mb-6">
                { '페이지를 불러올 수 없습니다'}
            </p>
            <div className="space-x-4">
                <Button onClick={reset}>
                다시 시도
                </Button>
                <Button2
                onClick={() => window.location.href = '/'}
                >
                홈으로
                </Button2>
            </div>
            </div>
        </div>
    )
}