"use client"
import MainSlide from "./mainBanner/components/BannerItems"
import MainBanner from "./mainBanner/MainBanner"
import SectionPageThree from "./section3/SectionPage"
import { useAuthStore } from "../lib/userfetch"
import SectionPageOne from "./section1/SectionPage"
import Calendar from "./section2/Calendar"
import SpinnerArea from "./spinner/SpinnerArea"
import { ErrorBoundary } from "react-error-boundary"
import { GlobalErrorFallback } from "../error/GlobalErrorFallBack"

export default function MainPage() {
    const { profile, isReviewLoaded } = useAuthStore()

    return(
        <>
        <ErrorBoundary FallbackComponent={GlobalErrorFallback}>
        {(!profile || !isReviewLoaded) && <SpinnerArea text="로딩중 .."/>}
        {(profile || isReviewLoaded) && (
            <>
                <MainBanner />
                <SectionPageOne />
                <Calendar/>
                <SectionPageThree />
            </>
        )}
        </ErrorBoundary>
        </>
    )
}