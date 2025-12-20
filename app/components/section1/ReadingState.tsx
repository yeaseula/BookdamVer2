"use client"
import { useAuthStore } from "@/app/lib/userfetch"
import Image from "next/image"
import Skeleton from "react-loading-skeleton"
import styled from "styled-components"
import { throwSupabaseError } from "@/app/error/errorLibrary"
import SkeletonBox from "../common/SkeletonBox"

const ReadBox = styled.div`
    position: relative;
    text-align: center;
    padding: 0;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    background-color: var(--main-color);
    height: 150px;
`
const ReadBoxP = styled.p`
    margin-top: 5px;
    font-size: 1.6rem;
`

export default function ReadingState() {
    const { isBooksLoaded, books } = useAuthStore()

    const isLoading = !isBooksLoaded

    if(!books.ok || books.error) {
        throwSupabaseError(books.error)
    }

    return (
        <ReadBox>
            <SkeletonBox isLoading={isLoading} />
            <Image
                src={'/images/state_book.svg'}
                alt={''}
                width={80}
                height={80}
                priority
                style={{ display: 'inline-block' }}
            />
            {books.data?.length == 0 &&
                <p className="mt-3 text-3xl font-bold">읽고있는 책이 없어요!</p>
            }
            {books.data?.length > 0 && (
                <ReadBoxP>
                    현재 읽고있는 책은
                    <span className="reading-name font-bold"> {books.data[0].title}</span>!<br />
                    <span className="reading-page font-bold">{books.data[0].current_page} 페이지</span>까지 읽었어요.
                </ReadBoxP>
            )}
        </ReadBox>
    )
}