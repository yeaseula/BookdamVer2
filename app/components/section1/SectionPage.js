"use client"
import ReadingState from "./ReadingState"
import ReadingHistory from "./ReadingHistory"

export default function SectionPage() {
    return (
        <section className="pt-18 pr-5 pl-5">
            <h2 className="sr-only">현재 읽고있는 책 정보</h2>
            <ReadingState />
            <ReadingHistory />
        </section>
    )
}