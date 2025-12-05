"use client"
import styled from "styled-components"
import { useAuthStore, useSettingStore } from "../lib/userfetch"
import Skeleton,{SkeletonTheme} from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import { RiFileWarningFill } from "@remixicon/react"
import GalleryList from "./components/Gallery"
import List from "./components/List"

const ReivewWrap = styled.section`
    padding: 80px 15px 65px;
`

export default function ReviewList() {
    const { reviews,isReviewLoaded } = useAuthStore()
    const { userSetting } = useSettingStore()
    return(
        <ReivewWrap>
            <h2 className="sr-only">내가 쓴 리뷰 리스트</h2>
            {!isReviewLoaded && ( //로딩중 스켈레톤
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
            )}
            {isReviewLoaded && (
                <>
                {reviews.length > 0 && ( //리뷰가 있을 때
                    <>
                    <p className="total-count text-s">총 {reviews.length}개</p>
                    <div className="mt-10">
                        {userSetting.reviewSet === 'gallery' && <GalleryList reviews={reviews} />}
                        {userSetting.reviewSet === 'list' && <List reviews={reviews} />}
                    </div>
                    </>
                )}
                {reviews.length === 0 && (
                    <div className="text-center">
                        <RiFileWarningFill size={40} style={{ margin: '0 auto',color: 'var(--sub_color)' }} />
                        <p className="mt-5 text-2xl font-bold">등록된 리뷰가 없습니다.</p>
                    </div>
                )}
                </>
            )}
        </ReivewWrap>
    )
}