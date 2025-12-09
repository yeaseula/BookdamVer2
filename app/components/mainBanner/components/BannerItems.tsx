"use client"
import { useEffect, useState } from "react";
import { useAuthStore } from "@/app/lib/userfetch";
import MainSwiper from "./MainSwiper"
import BannerButton from "../../mainButton/bannerButton";
import { ErrorBoundary } from "react-error-boundary";
import { CompoErrorFallBack } from "@/app/error/CompoErrorFallBack";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'


export default function BannerItems() {

    const { reviews, isReviewLoaded } = useAuthStore()
    const [isContent,setIsContent] = useState<boolean | null>(null)

    useEffect(()=>{
        if(isReviewLoaded) {
            reviews.data.length > 0 ? setIsContent(true) : setIsContent(false)
        }
    },[isReviewLoaded])
    useEffect(()=>{console.log(isContent)},[isContent])

    if(!isReviewLoaded) {
        return (
            <div className="w-[100%] rounded-3xl overflow-hidden">
                <Skeleton height={174} className="w-[100%]" style={{ lineHeight: '1.6' }}/>
            </div>
        )
    }

    if(isContent === null) {
        return (
            <div className="w-[100%] rounded-3xl overflow-hidden">
                <Skeleton height={174} className="w-[100%]" style={{ lineHeight: '1.6' }}/>
            </div>
        )
    }

    if(isContent) {
        return (
        <>
            <div className="w-[125px] h-[100%]">
                <ErrorBoundary
                FallbackComponent={CompoErrorFallBack}
                >
                    <MainSwiper />
                </ErrorBoundary>
            </div>
            <BannerButton/>
        </>
        )
    }

    return(
        <>
            <BannerButton />
        </>
    )
}