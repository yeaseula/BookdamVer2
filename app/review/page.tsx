"use client"
import styled from "styled-components"
import { useAuthStore, useSettingStore } from "../lib/userfetch"
import Skeleton,{SkeletonTheme} from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import GalleryList from "./components/Gallery"
import List from "./components/List"
import { throwSupabaseError } from "../error/errorLibrary"
import Image from "next/image"
import { SubWrap } from "../components/common/container.styled"

export default function ReviewList() {
    const { reviews,isReviewLoaded } = useAuthStore()
    const { userSetting } = useSettingStore()

    if(!isReviewLoaded) {
        return (
            <SubWrap>
                <>
                    <SkeletonTheme>
                        <Skeleton width={50} height={22} borderRadius={5} />
                    </SkeletonTheme>
                    <div className="mt-10">
                        <SkeletonTheme>
                            <Skeleton height={121} borderRadius={12} />
                        </SkeletonTheme>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <SkeletonTheme>
                            <Skeleton height={121} borderRadius={12}/>
                        </SkeletonTheme>
                    </div>
                </>
            </SubWrap>
        )
    }

    if(!reviews.ok || reviews.error) {
        throwSupabaseError(reviews.error)
    }

    if(reviews.data?.length === 0) {
        return (
            <SubWrap>
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
            <h2 className="sr-only">내가 쓴 리뷰 리스트</h2>
            <p className="total-count text-s">총 {reviews.data.length}개</p>
            <div className="mt-[10px]">
                {userSetting.data.review_set === 'gallery' && <GalleryList reviews={reviews.data} />}
                {userSetting.data.review_set === 'list' && <List reviews={reviews.data} />}
            </div>
        </SubWrap>
    )
}