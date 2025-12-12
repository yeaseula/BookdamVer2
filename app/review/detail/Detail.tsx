"use client"
import styled from "styled-components"
import StarRaiting from "./StarRating"
import { useAuthStore } from "@/app/lib/userfetch"
import { useEffect, useState } from "react"
import { Reviews, DataState } from "@/app/lib/userfetch"
import Thumbnail from "../components/Thumbnail"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import { ErrorBoundary } from "react-error-boundary"
import { CompoErrorFallBack } from "@/app/error/CompoErrorFallBack"
import { SubWrap } from "@/app/components/common/container.styled"


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
export default function ReviewDetail({postNumber}) {

    const [reviewArr,setReviewArr] = useState<DataState<Reviews[]> | null>(null)
    const { reviews } = useAuthStore()

    useEffect(()=>{

        if(!reviews.data) return
        const find:Reviews[] = reviews.data?.filter((review)=>review.id === postNumber)

        if(find.length === 0) {
            setReviewArr(null)
            return
        }

        const reviewdata = {
            data: find,
            error: reviews.error,
            ok: !reviews.error
        }
        if(reviews.error) {
            throw new Error
        } else {
            setReviewArr(reviewdata)
        }
    },[reviews])

    if(!reviewArr) {
        return (
            <SubWrap>
                <ReivewHead>
                    <BookThumbnail>
                        <Skeleton height={'100%'} borderRadius={5}/>
                    </BookThumbnail>
                    <BookContent>
                        <Skeleton width={78} height={20} borderRadius={5}></Skeleton>
                        <Skeleton width={150} height={20} borderRadius={5}></Skeleton>
                        <Skeleton height={20} borderRadius={5}></Skeleton>

                        <div className="text-[1.5rem] mt-5">
                            <Skeleton height={20} borderRadius={5}></Skeleton>
                            <Skeleton height={20} borderRadius={5}></Skeleton>
                        </div>

                        <div className="mt-3 text-[1.5rem]">
                            <Skeleton height={20} borderRadius={5}></Skeleton>
                        </div>
                        <Skeleton height={20} borderRadius={5}></Skeleton>
                    </BookContent>
                </ReivewHead>
                <ReviewBody>
                    <div className="mb-8">
                        <Skeleton width={300} height={20} borderRadius={5}></Skeleton>
                        <Skeleton height={20} borderRadius={5}></Skeleton>
                    </div>
                    <div>
                        <Skeleton width={300} height={20} borderRadius={5}></Skeleton>
                        <Skeleton height={20} borderRadius={5}></Skeleton>
                    </div>
                </ReviewBody>
            </SubWrap>
        )
    }

    if(reviewArr) {
        return(
            <SubWrap style={{ color: 'var(--color_black)' }}>
                <ReivewHead>
                    <h2 className="sr-only">책 정보</h2>
                    <BookThumbnail>
                        <ErrorBoundary FallbackComponent={CompoErrorFallBack}>
                        <Thumbnail title={reviewArr.data?.[0].title} author={reviewArr?.data[0].author}/>
                        </ErrorBoundary>
                    </BookThumbnail>
                    <BookContent>
                        <p className="text-[1.4rem] text-sx-[1.5rem]">{reviewArr?.data[0].category}</p>
                        <p className="text-[1.8rem] font-bold mt-1.5">{reviewArr?.data[0].title}</p>
                        <p className="text-[1.4rem]">{reviewArr?.data[0].author}</p>

                        <div className="text-[1.5rem] mt-5">
                            <Highlight>{reviewArr?.data[0].start_date}</Highlight> 부터<br />
                            <Highlight>{reviewArr?.data[0].end_date}</Highlight> 까지 읽었어요.
                        </div>

                        <div className="mt-3 text-[1.5rem]">
                            <p><span>유저</span>님의 평가는</p>
                        </div>
                        <StarRaiting rating={reviewArr?.data[0].rating} />
                    </BookContent>
                </ReivewHead>
                <ReviewBody>
                    <h2 className="sr-only">리뷰 내용</h2>
                    <div className="mb-8">
                        <p className="text-[1.8rem] font-bold mb-2">한줄평</p>
                        <p>{reviewArr?.data[0].memo}</p>
                    </div>

                    <div>
                        <p className="text-[1.8rem] font-bold mb-2">서평</p>
                        <p dangerouslySetInnerHTML={{ __html: reviewArr?.data[0].content }}></p>
                    </div>
                </ReviewBody>
            </SubWrap>
        )
    }

}