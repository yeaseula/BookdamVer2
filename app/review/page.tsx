"use client"
import styled from "styled-components"
import { useAuthStore, useSettingStore } from "../lib/userfetch"
import Skeleton,{SkeletonTheme} from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import { RiFileWarningFill } from "@remixicon/react"
import GalleryList from "./components/Gallery"
import List from "./components/List"
import PageError from "../error/PageError"
import Image from "next/image"


const ReviewWrap = styled.section`
    padding: 80px 15px 65px;
`

export default function ReviewList() {
    const { reviews,isReviewLoaded } = useAuthStore()
    const { userSetting } = useSettingStore()

    if(!isReviewLoaded) {
        return (
            <ReviewWrap>
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
            </ReviewWrap>
        )
    }
    if(!reviews.ok || reviews.error) throw new Error('리뷰 정보 로드에 실패했습니다.')

    if(reviews.data?.length === 0) {
        return (
            <ReviewWrap>
                <div className="text-center">
                    <Image src={'/images/fox_review.svg'}
                    alt=""
                    width={250}
                    height={250}
                    style={{ margin: 'auto' }}
                    />
                    <p className="text-2xl font-bold">등록된 리뷰가 없습니다.</p>
                </div>
            </ReviewWrap>
        )
    }

    return(
        <ReviewWrap>
            <h2 className="sr-only">내가 쓴 리뷰 리스트</h2>
            <p className="total-count text-s">총 {reviews.data.length}개</p>
            <div className="mt-[10px]">
                {userSetting.reviewSet === 'gallery' && <GalleryList reviews={reviews.data} />}
                {userSetting.reviewSet === 'list' && <List reviews={reviews.data} />}
            </div>
        </ReviewWrap>
    )
}