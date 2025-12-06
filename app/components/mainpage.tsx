"use client"
import MainSlide from "./mainBanner/components/BannerItems"
import MainBanner from "./mainBanner/MainBanner"
import SectionPageThree from "./section3/SectionPage"
import { useAuthStore } from "../lib/userfetch"
import { useEffect, useState } from "react"
import { fetchBookAI } from "../lib/fetchBookCover"
import SectionPageOne from "./section1/SectionPage"
import Calendar from "./section2/Calendar"
import SpinnerArea from "./spinner/SpinnerArea"


export default function MainPage() {
    const { profile, isReviewLoaded } = useAuthStore()

    return(
        <>
        {(!profile || !isReviewLoaded) && <SpinnerArea text="로딩중 .."/>}
        {(profile || isReviewLoaded) && (
            <>
                <MainBanner />
                <SectionPageOne />
                <Calendar/>
                <SectionPageThree />
            </>
        )}
        </>
    )
}