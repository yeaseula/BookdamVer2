import Image from "next/image"
import styled from "styled-components"
import PageError from "@/app/error/PageError"

const Highlight = styled.span`
    position: relative;
    font-size: 2.3rem;
    display: inline-block;
    background: linear-gradient(to top, var(--main-color) 50%, transparent 50%);
`
const Img = styled(Image)`
    max-width: 100px;
    position: absolute;
    bottom: 0;
    right: 0;
    opacity: .9;
`

export default function ReadingState({ reviews }) {

    if(!reviews.ok || reviews.error) {
        return (
            <PageError />
        )
    }

    return(
        <>
            <h3 className="sr-only">나의 독서 history</h3>
            <p className="font-bold text-3xl" style={{ lineHeight: '1.6' }}>
                올 해 <Highlight className="font-extrabold">{reviews.data.length} 권</Highlight>,<br />
                이번 달 <Highlight className="font-extrabold">0 권</Highlight> 읽었어요!
            </p>
            <Img src="/images/reading-img.png" alt="img" width={100} height={100} />
        </>
    )
}