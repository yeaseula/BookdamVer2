"use client"
import Image from 'next/image';
import { Button } from "./error/Error.styled"
import { useAuthStore } from './lib/userfetch';
import { useEffect } from 'react';

export default function NotFound() {
    const setGlobalError = useAuthStore((s) => s.setGlobalError)
    useEffect(() => {
        setGlobalError(true)
        return () => setGlobalError(false)
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
        <Image src={'/images/fox_error404.svg'}
        alt=""
        width={250}
        height={250}
        priority
        />
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl mb-8">페이지를 찾을 수 없습니다</h2>
        <p className="text-gray-600 mb-8">
            요청하신 페이지가 존재하지 않거나 삭제되었습니다.
        </p>
        <Button onClick={() => window.location.href = '/'}>
            홈으로 돌아가기
        </Button>
        </div>
    );
}