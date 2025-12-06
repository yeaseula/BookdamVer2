"use client"
import { useEffect, useState } from "react";
import { useAuthStore } from "@/app/lib/userfetch";
import MainSwiper from "./MainSwiper"
import UserName from "./UserName";
import BannerButton from "../../mainButton/bannerButton";

export default function BannerItems() {

    const { reviews, isReviewLoaded } = useAuthStore()
    const [isContent,setIsContent] = useState<boolean>(null)
    const [ready,setReady] = useState<boolean>(false)

    useEffect(()=>{
        if(reviews.length > 0) {
            setIsContent(true)
            setTimeout(()=>{
                setReady(true)
            },700)
        } else {
            setIsContent(false)
            setTimeout(()=>{
                setReady(true)
            },700)
        }
    },[reviews])

    return(
        <div className="relative z-5">
            <UserName />
            <div className='mt-[20px] flex justify-center' style={{ alignItems:'center',height: '174px' }}>
                {(isReviewLoaded && ready) &&
                <>
                <MainSwiper />
                <BannerButton isContent={isContent}/>
                </>
                }
                {(!isReviewLoaded || !ready) && (
                    <div className="relative w-8 h-8">
                        <div className="absolute inset-0 border-4 border-amber-300 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-blue-950 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
            </div>
        </div>
    )
}