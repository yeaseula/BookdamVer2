"use client"
import styled from "styled-components"
import StarRaiting from "./StarRating"
import { useAuthStore } from "@/app/lib/userfetch"
import { useEffect, useState } from "react"
import { Reviews, DataState } from "@/app/lib/userfetch"
import Thumbnail from "../components/Thumbnail"
import { ErrorBoundary } from "react-error-boundary"
import { CompoErrorFallBack } from "@/app/error/CompoErrorFallBack"
import {  DetailWrap } from "@/app/components/common/container.styled"
import { ReviewDetailSkeleton } from "@/app/components/common/Skeleton/ReviewSkeleton"
import { fetchBookCover } from "@/app/lib/fetchBookCover"

const ReivewHead = styled.section`
    display: flex;
    gap: 15px;
    align-items: start;
`
const BookThumbnail = styled.div`
    width: 150px;
    height: auto;
    aspect-ratio: 3/4;
    border-radius: 8px;
    overflow: hidden;
`
const BookContent = styled.div`
    width: calc(100% - 165px);
`
const Highlight = styled.span`
    background: linear-gradient(to top, var(--main-color) 50%, transparent 50%);
    font-size: 1.5rem;
`
const ReviewBody = styled.section`
    width: calc(100% + 30px);
    margin-top: 35px;
    margin-left: -15px;
    padding: 40px 15px 60px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    background: var(--background-color-light);
`

type RenderReviews = Reviews & {
    coverImage: {
        bookThumb: string | null
    } | null
}

export default function ReviewDetail({postNumber}) {

    const [reviewArr,setReviewArr] = useState<RenderReviews[]| null>(null)
    const { reviews, isReviewLoaded } = useAuthStore()

    const isLoading = !isReviewLoaded || !reviewArr

    const fetchThumb = async(find:Reviews[], signal:AbortSignal) => {
        try {
            const results = await fetchBookCover(find?.[0].title, signal)
                return {
                    coverImage: results.bookThumb
                }
        } catch {
            return {
                coverImage: null
            }
        }
    }

    useEffect(()=>{
        if(!reviews.data) return
        const controller = new AbortController()

        const find = reviews.data?.filter((review)=>review.id === postNumber) || []

        if(find.length === 0) {
            setReviewArr(null)
            return
        }

        const thumbfetchrun = async() => {
            const res = await fetchThumb(find, controller.signal);

            if(res) {
                //setReviewArr()
                setReviewArr([{
                    ...find[0],
                    coverImage: {bookThumb: res.coverImage}
                }])
            }
        }
        thumbfetchrun()

        return ()=> controller.abort()

    },[isReviewLoaded])

    return(
        <DetailWrap>
            <ReviewDetailSkeleton isLoading={isLoading}/>
            <ReivewHead>
                <h2 className="sr-only">{reviewArr?.[0].title} 독서리뷰 내용</h2>
                <BookThumbnail>
                    <ErrorBoundary FallbackComponent={CompoErrorFallBack}>
                    <Thumbnail cover={reviewArr?.[0].coverImage.bookThumb} title={reviewArr?.[0].title}/>
                    </ErrorBoundary>
                </BookThumbnail>
                <BookContent>
                    <p className="text-[1.4rem] text-sx-[1.5rem]">{reviewArr?.[0].category}</p>
                    <p className="text-[1.8rem] font-bold mt-1.5">{reviewArr?.[0].title}</p>
                    <p className="text-[1.4rem]">{reviewArr?.[0].author}</p>

                    <div className="text-[1.5rem] mt-5">
                        <Highlight>{reviewArr?.[0].start_date}</Highlight> 부터<br />
                        <Highlight>{reviewArr?.[0].end_date}</Highlight> 까지 읽었어요.
                    </div>

                    <div className="mt-3 text-[1.5rem]">
                        <p><span>유저</span>님의 평가는</p>
                    </div>
                    <StarRaiting rating={reviewArr?.[0].rating} />
                </BookContent>
            </ReivewHead>
            <ReviewBody>
                <h2 className="sr-only">리뷰 내용</h2>
                <div className="mb-8">
                    <p className="text-[1.8rem] font-bold mb-2">한줄평</p>
                    <p>{reviewArr?.[0].memo}</p>
                </div>

                <div>
                    <p className="text-[1.8rem] font-bold mb-2">서평</p>
                    <p dangerouslySetInnerHTML={{ __html: reviewArr?.[0].content }}></p>
                </div>
            </ReviewBody>
        </DetailWrap>
    )
}