"use client"
import { useEffect, useState } from "react";
import { useAuthStore } from "@/app/lib/userfetch";
import MainSwiper from "./MainSwiper"
import UserName from "./UserName";
import BannerButton from "../../mainButton/bannerButton";
import { ErrorBoundary } from "react-error-boundary";
import { CompoErrorFallBack } from "@/app/error/CompoErrorFallBack";
export default function BannerItems() {

    const { reviews, isReviewLoaded } = useAuthStore()
    const [isContent,setIsContent] = useState<boolean>(null)

    useEffect(()=>{
        if(isReviewLoaded) {
            reviews.length > 0 ? setIsContent(true) : setIsContent(false)
        }
    },[isReviewLoaded])

    return(
        <div className="relative z-5">
            <UserName />
            <div className='mt-[20px] flex justify-center' style={{ alignItems:'center',height: '174px' }}>
                {isReviewLoaded &&
                <>
                {isContent &&
                    <div style={{ width: '125px', height:'100%', marginLeft: 'auto', marginRight:'auto' }}>
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
                {(!isReviewLoaded) && (
                    <div className="relative w-8 h-8">
                        <div className="absolute inset-0 border-4 border-amber-300 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-blue-950 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
            </div>
        </div>
    )
}