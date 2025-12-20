"use client"
import ReadingState from "./ReadingState"
import { ErrorBoundary } from "react-error-boundary"
import { CompoErrorFallBack } from "@/app/error/CompoErrorFallBack"
import { NetworkError } from "@/app/error/errorLibrary"
import BannerItems from "./BannerItems"

export default function SectionPageOne() {

    return (
        <section className="pt-14 pr-5 pl-5">
            <h2 className="sr-only">리뷰를 토대로 지금까지 읽은 책을 분석합니다.</h2>
            <div className="relative">
            <ErrorBoundary FallbackComponent={CompoErrorFallBack}>
                <BannerItems />
            </ErrorBoundary>
            </div>
            <div className="mt-[20px]">
            <ErrorBoundary FallbackComponent={CompoErrorFallBack}>
                <ReadingState/>
            </ErrorBoundary>
            </div>
        </section>
    )
}