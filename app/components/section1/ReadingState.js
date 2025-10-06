"use client"
import Image from "next/image"
import styled from "styled-components"

const ReadBox = styled.div`
    text-align: center;
    padding: 15px;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    background-color: var(--main-color);
    min-height: 135px;
`
const ReadBoxP = styled.p`
    margin-top: 5px;
    font-size: 1.6rem;
`

export default function ReadingState() {
    return (
        <ReadBox>
            <Image
                src={'/images/bulb-img.webp'}
                alt={''}
                width={50}
                height={50}
                style={{ display: 'inline-block' }}
            ></Image>
            <ReadBoxP>
                현재
                <span className="reading-name font-bold"> 책 이름</span>을 읽고 계시네요!<br />
                <span className="reading-page font-bold">000 페이지</span>까지 읽었어요.
            </ReadBoxP>
        </ReadBox>
    )
}