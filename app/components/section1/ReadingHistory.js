"use client"
import styled from "styled-components"

const HisBox = styled.div`
    text-align: center;
    padding: 15px;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    background-color: var(--main-color-light);
    margin-top: 20px;
    padding-top: 18px;
    min-height: 56px;
`

export default function ReadingHistory({readingCount}) {
    return (
        <HisBox>
            <p>지금까지 <span className="reading-book font-bold">{readingCount}권</span>의 책을 읽었어요!</p>
        </HisBox>
    )
}