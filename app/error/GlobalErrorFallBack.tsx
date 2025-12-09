"use client"
import { NetworkError, ServerError, UnauthorizedError} from "./errorLibrary"
import { useRouter } from 'next/navigation';
import { Container, Title, Button, Button2 } from "./Error.styled";
import Image from "next/image";

export function GlobalErrorFallback({ error,resetErrorBoundary}:any) {
    const router = useRouter()

    if (error instanceof UnauthorizedError) {
        return (
        <Container>
            <Image src={'/images/fox_guard_need_login.svg'}
            alt=""
            width={230}
            height={230}
            />
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
            <Image src={'/images/fox_error404.svg'}
            alt=""
            width={230}
            height={230}
            />
            <Title>네트워크 연결 끊김</Title>
            <p className="text-3xl mb-7">error : {error.message}</p>
            <Button onClick={resetErrorBoundary}>다시 시도</Button>
        </Container>
        );
    }

    // 서버 에러
    if (error instanceof ServerError) {
        return (
            <Container>
                <Image src={'/images/fox_error404.svg'}
                alt=""
                width={230}
                height={230}
                />
                <Title>서버 오류</Title>
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
            <Image src={'/images/fox_error404.svg'}
            alt=""
            width={230}
            height={230}
            />
            <Title>예상치 못한 오류 발생</Title>
            <p className="text-3xl mb-7">{error.message}</p>
            <Button onClick={resetErrorBoundary}>다시 시도</Button>
        </Container>
    );
}