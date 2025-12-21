"use client"
import { useAuthStore, useSettingStore } from "../lib/userfetch"
import GalleryList from "./components/Gallery"
import List from "./components/List"
import Image from "next/image"
import { throwSupabaseError } from "../error/errorLibrary"
import { SubWrap } from "../components/common/container.styled"
import { ListSkeleton } from "../components/common/Skeleton/ReviewSkeleton"

export default function ReviewList() {
    const { reviews,isReviewLoaded } = useAuthStore()
    const { userSetting } = useSettingStore()
    const isLoading = !isReviewLoaded

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
                {userSetting.data?.review_set === 'gallery' && <GalleryList reviews={reviews.data} />}
                {userSetting.data?.review_set === 'list' && <List reviews={reviews.data} />}
            </div>
        </SubWrap>
    )
}