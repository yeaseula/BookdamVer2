"use client"
import { useAuthStore } from "@/app/lib/userfetch"
import Image from "next/image"
import Skeleton from "react-loading-skeleton"
import styled from "styled-components"
import { throwSupabaseError } from "@/app/error/errorLibrary"

const ReadBox = styled.div`
    text-align: center;
    padding: 15px 15px 25px;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    background-color: var(--main-color);
    min-height: 135px;
`
const ReadBoxP = styled.p`
    margin-top: 5px;
    font-size: 1.6rem;
`

export default function ReadingState() {
    const { isBooksLoaded, books } = useAuthStore()

    if(!books.ok || books.error) {
        throwSupabaseError(books.error)
    }

    return (
        <ReadBox>
            <Image
                src={'/images/state_book.svg'}
                alt={''}
                width={80}
                height={80}
                priority
                style={{ display: 'inline-block' }}
            />
            {!isBooksLoaded && (
                <div>
                    <Skeleton width={180} height={20} />
                    <Skeleton width={250} height={20} />
                </div>
            )}
            {isBooksLoaded && (
                <>
                {books.data.length == 0 &&
                    <p className="mt-2 text-3xl font-bold">읽고있는 책이 없어요!</p>
                }
                {books.data.length > 0 && (
                    <ReadBoxP>
                        현재
                        <span className="reading-name font-bold"> {books.data[0].title}</span>을 읽고 계시네요!<br />
                        <span className="reading-page font-bold">{books.data[0].current_page} 페이지</span>까지 읽었어요.
                    </ReadBoxP>
                )}
                </>
            )}
        </ReadBox>
    )
}