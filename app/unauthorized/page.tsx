'use client';
import Image from 'next/image';
import styled from 'styled-components';
import { Button } from '../error/Error.styled';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 2rem;
    text-align: center;
`;

export default function Unauthorized() {
  return (
    <Container>
        <Image src={'/images/fox_error404.svg'}
        alt=""
        width={250}
        height={250}
        priority
        />
        <h1 className="text-4xl font-bold mb-4">접근 권한이 없습니다</h1>
        <p className="text-xl text-gray-600 mb-8">
        본인의 리뷰만 확인할 수 있어요
        </p>
        <Button onClick={() => window.location.href = '/review'}>
            내 서재로 가기
        </Button>
    </Container>
  );
}