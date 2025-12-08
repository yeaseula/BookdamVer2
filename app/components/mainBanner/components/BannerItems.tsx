"use client"
import { useEffect, useState } from "react";
import { useAuthStore } from "@/app/lib/userfetch";
import MainSwiper from "./MainSwiper"
import UserName from "./UserName";
import BannerButton from "../../mainButton/bannerButton";
import { ErrorBoundary } from "react-error-boundary";
import { CompoErrorFallBack } from "@/app/error/CompoErrorFallBack";
import Skeleton from "react-loading-skeleton";
import PageError from "@/app/error/PageError";

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

    if(!isReviewLoaded) {
        return (
            <>
                <Skeleton width={125} height={174} className="" />
                <BannerButton isContent={true}/>
            </>
        )
    }

    if(!reviews.ok || reviews.error) {
        return (
            <>
            <div className="bg-amber-100
            w-[125px] h-[174px] flex justify-center items-center px-5">
                <PageError />
            </div>
            <BannerButton isContent={true}/>
            </>
        )
    }

    return(
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
    )
}