"use client"
import styled from "styled-components"
import { useAuthStore } from "@/app/lib/userfetch"
import Skeleton from "react-loading-skeleton"
import { UserReviewInitial } from "@/app/lib/readingInfo"
import { useEffect, useState } from "react"

const HisBox = styled.div`
    text-align: center;
    padding: 15px;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    background-color: var(--main-color-light);
    padding-top: 18px;
    min-height: 56px;
`

export default function ReadingHistory() {

    const { reviews, isReviewLoaded } = useAuthStore()
    const [reading,setReading] = useState<number | null>(null)

    useEffect(()=>{
        reviews.data ? setReading(reviews.data.length) : setReading(null)
    },[reviews.data])

    if(!reviews.ok || reviews.error) {
        throw new Error('리뷰 정보 로드에 실패했습니다.')
    }

    return (
        <HisBox>
            {!isReviewLoaded &&
                <Skeleton width={120}></Skeleton>
            }
            {isReviewLoaded &&
            <p>지금까지 <span className="reading-book font-bold">{reading}권</span>의 책을 읽었어요!</p>
            }
        </HisBox>
    )
}