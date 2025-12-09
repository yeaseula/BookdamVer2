"use client"
import Image from "next/image"
import RecomandSwiper from "./RecomandSwiper"
import styled from "styled-components"
import { useAuthStore } from "@/app/lib/userfetch"
import { ErrorBoundary } from "react-error-boundary"
import { CompoErrorFallBack } from "@/app/error/CompoErrorFallBack"

const TitleSection = styled.div`
    position: relative;
    display: flex;
    gap: 10px;
`
const TitleImage = styled(Image)`
    position: relative;
    top: -10px;
    transform: rotate(-15deg);
    width: 68px;
    height: 70px
`
const Title = styled.p`
    font-size: 2rem;
`

export default function SectionPageThree() {
    const { profile } = useAuthStore()
    const username = profile.data?.username

    return(
        <section className="pt-20 pb-20 pr-5 pl-5">
            <h2 className="sr-only">AI가 추천하는 책 리스트</h2>
                <TitleSection>
                    <TitleImage src={'/images/heart-chat.webp'}
                    alt={'chatBubble'}
                    width={68}
                    height={70}
                    ></TitleImage>
                    <Title>
                        <span className="font-extrabold">{username}</span>님을 위해<br/>
                        AI가 추천해드려요!
                    </Title>
                </TitleSection>
                <ErrorBoundary FallbackComponent={CompoErrorFallBack}>
                    <RecomandSwiper />
                </ErrorBoundary>
        </section>
    )
}