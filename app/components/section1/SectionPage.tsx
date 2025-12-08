"use client"
import ReadingState from "./ReadingState"
import ReadingHistory from "./ReadingHistory"
import { ErrorBoundary } from "react-error-boundary"
import { CompoErrorFallBack } from "@/app/error/CompoErrorFallBack"

export default function SectionPageOne() {
    return (
        <section className="pt-16 pr-5 pl-5">
            <h2 className="sr-only">현재 읽고있는 책 정보</h2>
            <ErrorBoundary FallbackComponent={CompoErrorFallBack}>
                <ReadingState/>
            </ErrorBoundary>
            <div className="mt-[20px]">
                <ErrorBoundary FallbackComponent={CompoErrorFallBack}>
                    <ReadingHistory />
                </ErrorBoundary>
            </div>
        </section>
    )
}