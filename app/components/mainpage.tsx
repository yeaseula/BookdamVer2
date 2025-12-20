"use client"
import MainBanner from "./mainBanner/MainBanner"
import SectionPageThree from "./section3/SectionPage"
import { useAuthStore } from "../lib/userfetch"
import Calendar from "./section2/Calendar"
import SpinnerArea from "./spinner/SpinnerArea"
import { ErrorBoundary } from "react-error-boundary"
import { CompoErrorFallBack } from "../error/CompoErrorFallBack"
import EditorRecomand from "./section1/EditorRecomand"
import ReadingState from "./section1/ReadingState"

export default function MainPage() {
    const { session, profile, isReviewLoaded } = useAuthStore();

    const isLoading = !session || !profile.data || !isReviewLoaded

    return(
        <div className={`wrapper ${isLoading ?'loaded' : ''}`}>
            {/* <SpinnerArea text="로딩중 .." announce={isLoading}/> */}
            <MainBanner />
            <ErrorBoundary FallbackComponent={CompoErrorFallBack}>
                <EditorRecomand />
            </ErrorBoundary>
            <ErrorBoundary FallbackComponent={CompoErrorFallBack}>
                <ReadingState />
            </ErrorBoundary>
            <div className="mt-5 px-[15px] pt-[15px] pb-[10x]">
            <ErrorBoundary FallbackComponent={CompoErrorFallBack}>
                <Calendar/>
            </ErrorBoundary>
            </div>
            <SectionPageThree />
        </div>
    )
}