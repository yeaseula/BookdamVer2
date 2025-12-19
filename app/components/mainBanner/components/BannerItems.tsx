"use client"
import { useEffect, useMemo, useState } from "react";
import { useAuthStore } from "@/app/lib/userfetch";
import MainSwiper from "./MainSwiper"
import BannerButton from "../../mainButton/bannerButton";
import { ErrorBoundary } from "react-error-boundary";
import { CompoErrorFallBack } from "@/app/error/CompoErrorFallBack";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { throwSupabaseError } from "@/app/error/errorLibrary";

export default function BannerItems() {
    const { reviews, isReviewLoaded } = useAuthStore()

    const hasContent = useMemo(
        ()=> isReviewLoaded && (reviews.data?.length ?? 0) > 0,
        [isReviewLoaded, reviews.data?.length]
    )

    if(!isReviewLoaded) {
        return (
            <div className="w-[100%] rounded-3xl overflow-hidden">
                <Skeleton height={174} className="w-[100%]" style={{ lineHeight: '1.6' }}/>
            </div>
        )
    }

    if(!reviews.ok || reviews.error) {
        throwSupabaseError(reviews.error)
    }

    // if(!hasContent) {
    //     return (
    //         <BannerButton />
    //     )
    // }

    // if(hasContent) {
    //     return (
    //     <>
    //         <div className="w-[125px] h-[100%]">
    //             <ErrorBoundary
    //             FallbackComponent={CompoErrorFallBack}
    //             >
    //                 <MainSwiper />
    //             </ErrorBoundary>
    //         </div>
    //         <BannerButton/>
    //     </>
    //     )
    // }

    return(
        <>
            <BannerButton />
        </>
    )
}