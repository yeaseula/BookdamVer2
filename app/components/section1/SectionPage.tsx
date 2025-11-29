"use client"
import ReadingState from "./ReadingState"
import ReadingHistory from "./ReadingHistory"
import { Books } from "@/app/lib/userfetch"

interface Props {
    readingCount: number;
    books: Books[]
}

export default function SectionPageOne({readingCount,books}:Props) {
    return (
        <section className="pt-16 pr-5 pl-5">
            <h2 className="sr-only">현재 읽고있는 책 정보</h2>
            <ReadingState books={books}/>
            <ReadingHistory readingCount={readingCount}/>
        </section>
    )
}