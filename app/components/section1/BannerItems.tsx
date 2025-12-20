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
import { ImageStyle } from "../common/ImageStyle";

const WRap = styled.div`
    padding: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    background-color: var(--main-color-light);
`
const Card = styled.div`
    position: relative;
    display: flex;
    gap: 15px;
    overflow: hidden;
    color: var(--color_black);
`
const ImageBox = styled.div`
    width: 150px;
    > img {
     width: 100%;
     height: 100%;
     }
`
const Description = styled.div`
    width: calc(100% - 175px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const BookContents = styled.p`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 7;
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
            <Card>
                <SkeletonBox isLoading={isLoading} />
                <ImageBox className="overflow-hidden rounded-2xl">
                    <Image src={reviewThumb[0]?.bookThumb || '/images/noThumb.svg'}
                    alt={`${reviewThumb[0]?.booktitle} 책 표지`}
                    width={150} height={217}
                    priority
                    />
                </ImageBox>
                <Description>
                    <div>
                        <p className="text-3xl font-semibold">{reviewThumb[0]?.booktitle}</p>
                        <p className="text-2xl mt-1.5">{reviewThumb[0]?.bookauthor}</p>
                    </div>
                    <BookContents className="text-2xl">{reviewThumb[0]?.bookContents}</BookContents>
                </Description>
            </Card>
        </WRap>
        </>
    )
}