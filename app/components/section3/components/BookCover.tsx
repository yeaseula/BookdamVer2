import styled from "styled-components"
import Image from "next/image"
import { useAuthStore } from "@/app/lib/userfetch"
import { useMemo, useState } from "react"

const BookThumb = styled.div`
    position: relative;
    width: 85px;
    aspect-ratio: 0.68;
    background-color: #bdbdbd;
    > img {
        position: absolute;
        top: 0;
        left: 0;
        max-width: 100%;
        width: 100%;
        height: 100%;
    }
`
const EmptyBox = styled.div`
    width: 85px;
    height: auto;
    aspect-ratio: 0.68;
    background-color: #bdbdbd;
`
const Wish = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 1.6rem;
    background: rgba(0,0,0,0.35);
    color: #fff;
    z-index:10;
`

export default function BookCover({book}) {
    const { wish } = useAuthStore()
    const [isWish,setIsWish] = useState(false)

    useMemo(()=>{
        const Res = wish.data.some((w)=>w.title === book.title)
        setIsWish(Res)
    },[isWish,wish])

    return (
        <BookThumb>
            {isWish && <Wish>찜했어요</Wish>}
            {book.thumbnail !== '' ? (
                <Image src={`${book.thumbnail}`}
                alt={book.title}
                priority
                width={'120'} height={'174'} />
            ) : (
                <EmptyBox />
            )}
        </BookThumb>
    )
}