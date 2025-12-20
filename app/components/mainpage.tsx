"use client"
import MainSlide from "./section1/BannerItems"
import MainBanner from "./mainBanner/MainBanner"
import SectionPageThree from "./section3/SectionPage"
import { useAuthStore } from "../lib/userfetch"
import SectionPageOne from "./section1/SectionPage"
import Calendar from "./section2/Calendar"
import SpinnerArea from "./spinner/SpinnerArea"
import { ErrorBoundary } from "react-error-boundary"
import { CompoErrorFallBack } from "../error/CompoErrorFallBack"

export default function MainPage() {
    const { session, profile, isReviewLoaded } = useAuthStore();

    const isLoading = !session || !profile.data || !isReviewLoaded

    return(
        <div className={`wrapper ${isLoading ?'loaded' : ''}`}>
            <SpinnerArea text="로딩중 .." announce={isLoading}/>
            <MainBanner />
            {/* <SectionPageOne /> */}
            <div className="mt-5 px-[15px] pt-[15px] pb-[10x]">
            <ErrorBoundary FallbackComponent={CompoErrorFallBack}>
                <Calendar/>
            </ErrorBoundary>
            </div>
            <SectionPageThree />
        </div>
    )
}