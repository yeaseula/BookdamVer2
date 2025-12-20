import styled from "styled-components"
import Button from "./Button"

const WriteButton = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
    height: 100%;
`

export default function BannerButton() {

    return (
        <WriteButton>
            <Button
            href={'/write'}
            title={'리뷰 먼저 써볼까요?'}
            buttonText={'리뷰 쓰러 가기'}
            />
            <Button
            href={'/reading'}
            title={'읽고있는 책이 있나요?'}
            buttonText={'등록 하러 가기'}
            />
        </WriteButton>
    )
}