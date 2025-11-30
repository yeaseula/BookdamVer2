import styled from "styled-components"
import Link from "next/link"
import { RiAddLargeLine } from "@remixicon/react"
import Button from "./Button"

const WriteButton = styled.div<{$isContent:boolean}>`
    display: flex;
    flex-direction: ${(p)=>p.$isContent ? 'column' : 'initial'};
    gap: 20px;
    width: ${(p)=>p.$isContent ? 'calc(100% - 160px)' : '100%'};
    height: ${(p)=>p.$isContent ? '100%' : '70%'};
`

export default function BannerButton({isContent}) {
    return (
        <WriteButton $isContent={isContent}>
            <Button
            type={'link'}
            href={'/write'}
            title={'리뷰 먼저 써볼까요?'}
            buttonText={'리뷰 쓰러 가기'}
            isContent={isContent}
            />
            <Button
            type={'button'}
            title={'읽고있는 책이 있나요?'}
            buttonText={'등록 하러 가기'}
            isContent={isContent}
            />
        </WriteButton>
    )
}