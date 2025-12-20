"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/app/lib/userfetch";
import { throwSupabaseError } from "@/app/error/errorLibrary";
import SkeletonBox from "../common/SkeletonBox";
import { BannerBook } from "@/app/lib/dataTypes";
import { useErrorUtil } from "@/app/error/useErrorUtil";
import { fetchEditorRecomand, fetchReviewRecomand } from "@/app/lib/fetchBookCover";
import styled from "styled-components";
import Link from "next/link";

const Wrapper = styled.div`
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
    position: relative;
    width: 150px;
    height: 215px;
    background-size: cover;
    background-position: center;
    overflow: hidden;
    border-radius: 13px;
`
const Description = styled.div`
    width: calc(100% - 165px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const BookContents = styled.p`
    display: -webkit-box;
    margin-top: 20px;
    height: 100px;
`
const Title = styled.p`
    font-size: 2rem;
    color: var(--color_black);
    margin-bottom: 15px;
`
const Button = styled(Link)`
    width: 100%;
    justify-content: center;
    display: flex;
    align-items: center;
    height: 30px;
    padding: 0 4px;
    border-radius: 150px;
    text-align: center;
    font-size: 1.4rem;
    border-radius: 500px;
    background-color: var(--sub_color);
    color: #fff
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

        const EditorRecomanded = async() => {
            try {
                const recomandItems = await fetchEditorRecomand()
                if(isCancelled) return

                setReviewThumb(recomandItems)
                setIsReady(true)
            } catch(err) {
                if(!isCancelled) throwError(err)
            }
        }

        if(reviews.data.length === 0) {
            EditorRecomanded()
        } else {
            MyReviewThumb()
        }

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
        <Wrapper>
            <SkeletonBox isLoading={isLoading} />
            <Card>
                <ImageBox>
                    <Image src={reviewThumb[0]?.bookThumb || '/images/noThumb.svg'}
                    fill
                    alt={`최신 리뷰데이터 기반으로 추천한 책 ${reviewThumb[0]?.booktitle || ''} 표지`}
                    priority
                    fetchPriority="high"
                    />
                </ImageBox>
                <Description>
                    <div>
                        <p className="text-3xl font-semibold">{reviewThumb[0]?.booktitle || 'Title'}</p>
                        <p className="text-2xl mt-1.5">{reviewThumb[0]?.bookauthor || 'author'}</p>
                        <BookContents className="text-2xl">{reviewThumb[0]?.bookContents.slice(0,60) + '...' || 'content'}</BookContents>
                    </div>
                    <Button
                    aria-label='예스24 판매페이지로 이동'
                    href={`https://www.yes24.com/product/search?domain=ALL&query=${encodeURIComponent(reviewThumb[0]?.booktitle)}`} target='_blank'>More View</Button>
                </Description>
            </Card>
        </Wrapper>
        </>
    )
}