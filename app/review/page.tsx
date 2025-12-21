"use client"
import { Reviews, useAuthStore, useSettingStore } from "../lib/userfetch"
import GalleryList from "./components/Gallery"
import List from "./components/List"
import Image from "next/image"
import { throwSupabaseError } from "../error/errorLibrary"
import { SubWrap } from "../components/common/container.styled"
import { ListSkeleton } from "../components/common/Skeleton/ReviewSkeleton"
import { useEffect, useState } from "react"
import { fetchBookCover } from "@/app/lib/fetchBookCover"

type RenderReviews = Reviews & {
    coverImage: {
        bookThumb: string | null
    } | null
}

export default function ReviewList() {
    const { reviews,isReviewLoaded } = useAuthStore()
    const { userSetting } = useSettingStore()
    const [reviewsWithThumb, setReviewsWithThumb] = useState<RenderReviews[] | null>(null)

    const isLoading = !isReviewLoaded || !reviewsWithThumb

    const renderReviews = reviewsWithThumb ?? reviews.data

    const fetchThumb = async(signal:AbortSignal) => {
        if(!reviews.data || reviews.data?.length === 0) return;

        try {
            const requests = reviews.data?.map((ele)=>fetchBookCover(ele.title, signal))
            const results = await Promise.allSettled(requests)

            const newReview:RenderReviews[] = reviews.data.map((review,idx)=>{
                const result = results[idx]

                if(result.status === 'fulfilled') {
                    return {
                        ...review,
                        coverImage: result.value
                    }
                }

                return {
                    ...review,
                    coverImage: null
                }
            })
            return newReview
        } catch {
            //에러처리
        }
    }

    useEffect(()=>{
        const controller = new AbortController()

        const thumbfetchrun = async() => {
            const res = await fetchThumb(controller.signal);
            if(res) {
                setReviewsWithThumb(res)
            }
        }
        thumbfetchrun()

        return ()=> controller.abort()
    },[reviews.data])



    if(!reviews.ok || reviews.error) {
        throwSupabaseError(reviews.error)
    }

    if(reviews.data?.length === 0) {
        return (
            <SubWrap>
                <ListSkeleton isLoading={isLoading} />
                <div className="text-center">
                    <Image src={'/images/fox_review.svg'}
                    alt=""
                    width={250}
                    height={250}
                    style={{ margin: 'auto' }}
                    />
                    <p className="text-2xl font-bold">등록된 리뷰가 없습니다.</p>
                </div>
            </SubWrap>
        )
    }

    return(
        <SubWrap>
            <ListSkeleton isLoading={isLoading} />
            <h2 className="sr-only">내가 쓴 리뷰 리스트</h2>
            <p className="total-count text-s">총 {reviews.data?.length}개</p>
            <div className="mt-[10px]">
                {userSetting.data?.review_set === 'gallery' && <GalleryList reviews={reviewsWithThumb} />}
                {userSetting.data?.review_set === 'list' && <List reviews={reviewsWithThumb} />}
            </div>
        </SubWrap>
    )
}