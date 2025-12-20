"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/app/lib/userfetch";
import { throwSupabaseError } from "@/app/error/errorLibrary";
import SkeletonBox from "../common/SkeletonBox";
import { BannerBook } from "@/app/lib/dataTypes";
import { useErrorUtil } from "@/app/error/useErrorUtil";
import { fetchReviewRecomand } from "@/app/lib/fetchBookCover";
import styled from "styled-components";


const WRap = styled.div`
    position: relative;
    padding: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    background-color: var(--main-color-light);
`
const Card = styled.div`
    display: flex;
    gap: 15px;
    overflow: hidden;
    color: var(--color_black);
`
const ImageBox = styled.div`
    width: 150px;
    height: 215px;
    background-size: cover;
    background-position: center;
`
const Description = styled.div`
    width: calc(100% - 165px);
`
const BookContents = styled.p`
    display: -webkit-box;
    margin-top: 20px;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 5;
    height: 100px;
`
const Title = styled.p`
    font-size: 2rem;
    color: var(--color_black);
    margin-bottom: 15px;
`

export default function BannerItems() {
    const { reviews, isReviewLoaded } = useAuthStore()
    const [isReady,setIsReady] = useState(false)
    const [reviewThumb,setReviewThumb] = useState<BannerBook[]>([])
    const throwError = useErrorUtil()

    useEffect(()=>{
        if(!isReviewLoaded) return
        if(reviewThumb.length > 0) return

        let isCancelled = false

        const MyReviewThumb = async() => {
            try {

                const recomandItems = await fetchReviewRecomand(reviews.data)
                if(isCancelled) return

                setReviewThumb(recomandItems)
                setIsReady(true)

            } catch(err) {
                if(!isCancelled) throwError(err)
            }
        }

        MyReviewThumb()

        return () => {
            isCancelled = true
        }
    },[isReviewLoaded, reviews.data])

    const isLoading = !isReviewLoaded || !isReady

    if(!reviews.ok || reviews.error) {
        throwSupabaseError(reviews.error)
    }

    return (
        <>
        <Title>
            이런 책은 어때요?<br />
            최근 읽은 책을 기반으로 추천해드려요!
        </Title>
        <WRap>
            <SkeletonBox isLoading={isLoading} />
            <Card>
                <ImageBox
                className="overflow-hidden rounded-2xl"
                role="img"
                aria-label={`최신 리뷰데이터 기반으로 추천한 책 ${reviewThumb[0]?.booktitle || ''} 표지`}
                style={{ backgroundImage: `url(${reviewThumb[0]?.bookThumb || '/images/noThumb.svg'})` }}
                >
                </ImageBox>
                <Description>
                    <div>
                        <p className="text-3xl font-semibold">{reviewThumb[0]?.booktitle || 'Title'}</p>
                        <p className="text-2xl mt-1.5">{reviewThumb[0]?.bookauthor || 'author'}</p>
                    </div>
                    <BookContents className="text-2xl">{reviewThumb[0]?.bookContents || 'content'}</BookContents>
                </Description>
            </Card>
        </WRap>
        </>
    )
}