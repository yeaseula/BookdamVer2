"use client"
import { useEffect, useState } from "react";
import { useAuthStore } from "@/app/lib/userfetch";
import MainSwiper from "./MainSwiper"
import UserName from "./UserName";
import BannerButton from "../../mainButton/bannerButton";
import { ErrorBoundary } from "react-error-boundary";
import { CompoErrorFallBack } from "@/app/error/CompoErrorFallBack";
import Skeleton from "react-loading-skeleton";


export default function BannerItems() {

    const { reviews, isReviewLoaded } = useAuthStore()
    const [isReview, setIsReview] = useState<boolean | null>(false)
    const [isContent,setIsContent] = useState<boolean | null>(null)

    useEffect(()=>{
        if(!reviews.data) setIsReview(false)
            else setIsReview(true)
    },[reviews.data])

    useEffect(()=>{
        if(isReviewLoaded) {
            reviews.data.length > 0 ? setIsContent(true) : setIsContent(false)
        }
    },[isReviewLoaded])

    return(
        <div className="relative z-5">
            <UserName />
            <div className='mt-[20px] relative flex justify-center items-center h-[174px]'>

                {!isReview && //초기 review 데이터 로드 실패할 때
                <>
                <Skeleton width={125} height={174} className="" />
                <BannerButton isContent={true}/>
                </>
                }

                {(isReview) &&
                    <>
                    {isContent &&
                        <div className="w-[125px] h-[100%]">
                            <ErrorBoundary
                            FallbackComponent={CompoErrorFallBack}
                            >
                                <MainSwiper />
                            </ErrorBoundary>
                        </div>
                    }
                    <BannerButton isContent={isContent}/>
                    </>
                }
            </div>
        </div>
    )
}