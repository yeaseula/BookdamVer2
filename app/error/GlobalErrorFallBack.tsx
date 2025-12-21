"use client"
import { NetworkError, ServerError, UnauthorizedError} from "./errorLibrary"
import { useRouter } from 'next/navigation';
import { useAuthStore } from "../lib/userfetch";
import { useEffect } from "react";
import { Container, Title, Button } from "./Error.styled";
import Image from "next/image";

export function GlobalErrorFallback({ error,resetErrorBoundary}:any) {
    const router = useRouter()

    const setGlobalError = useAuthStore((s) => s.setGlobalError)

    useEffect(() => {
        setGlobalError(true)
        return () => setGlobalError(false)
    }, [])

    if (error instanceof UnauthorizedError) {
        return (
        <Container>
            <Image src={'/images/fox_guard_need_login.svg'} alt="" width={230} height={230} />
            <Title>로그인이 필요합니다</Title>
            <Button onClick={() => router.push('/login')}>
            로그인하기
            </Button>
        </Container>
        );
    }

    // 네트워크 에러
    if (error instanceof NetworkError) {
        return (
        <Container>
            <svg
                width="90"
                height="90"
                viewBox="0 0 24 24"
                fill="none"
                style={{ marginBottom: '25px' }}
            >
                <path
                d="M1 9l2-2c5.523-5.523 14.477-5.523 20 0l2 2M5 13l2-2c3.314-3.314 8.686-3.314 12 0l2 2M12 18h.01"
                stroke="#ff6b6b"
                strokeWidth="2"
                strokeLinecap="round"
                />
                <line
                x1="2"
                y1="2"
                x2="22"
                y2="22"
                stroke="#ff6b6b"
                strokeWidth="2.5"
                strokeLinecap="round"
                />
            </svg>
            <Title>네트워크 연결이 끊겼습니다.</Title>
            <p className="text-3xl mb-7">error : {error.message}</p>
            <Button onClick={resetErrorBoundary}>다시 시도</Button>
        </Container>
        );
    }

    // 서버 에러
    if (error instanceof ServerError) {
        return (
            <Container>
                <Image src={'/images/fox_error404.svg'} alt="" width={230} height={230} />
                <Title>서버 오류가 발생했습니다.</Title>
                <p className="text-3xl mb-7">error : {error.message}</p>
                <div className="flex gap-4 justify-center">
                <Button onClick={resetErrorBoundary}>다시 시도</Button>
                {/* <Button2 onClick={() => router.push('/')}>홈으로</Button2> */}
                </div>
            </Container>
        );
    }

    // 알 수 없는 에러
    return (
        <Container>
            <Image src={'/images/fox_error404.svg'} alt="" width={230} height={230} />
            <Title>예상치 못한 오류 발생</Title>
            <p className="text-3xl mb-7">{error.message}</p>
            <Button onClick={resetErrorBoundary}>다시 시도</Button>
        </Container>
    );
}