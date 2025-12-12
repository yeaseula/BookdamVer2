import styled from "styled-components"
import Link from "next/link"
import { useAuthStore } from "@/app/lib/userfetch"
import { useState, useMemo } from "react"

const BookContainer = styled.div`
    position: relative;
    width: calc(100% - 110px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const BookTitle = styled.p`
    font-size: 1.6rem;
    font-weight: 700;
    margin-bottom: 5px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 1;
`
const BookIntro = styled.p`
    font-size: 1.4rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 3;
`
const ButtonWrap = styled.div`
    display: flex;
    gap: 5px;
    align-items: center;
`
const DefaultBtnStyle = styled.button<{disabled:boolean}>`
    min-width: 76px;
    justify-content: center;
    display: flex;
    align-items: center;
    min-height: 24px;
    padding: 1px 6px;
    border-radius: 150px;
    text-align: center;
    font-size: 1.1rem;
    border-radius: 500px;
    background-color: ${(p)=>p.disabled ? '#bdbdbd' : 'var(--point-color)'};
    color: #000 ;
    cursor: ${(p)=>p.disabled ? 'initial' : 'pointer'};
`
const Button = styled(Link)`
    min-width: 76px;
    justify-content: center;
    display: flex;
    align-items: center;
    min-height: 24px;
    padding: 0 4px;
    border-radius: 150px;
    text-align: center;
    font-size: 1.1rem;
    border-radius: 500px;
    background-color: var(--sub_color);
    color: #fff
`
interface BookAiType {
    isbn: string;
    authors: string[]
    thumbnail: string;
    title: string;
    contents: string;
    price: number;
    sale_price: number;
    error?: unknown;
}
interface BookProps {
    book: BookAiType;
    onClick: ()=>void
}

export default function BookDesc({book, onClick}:BookProps) {
    const { wish } = useAuthStore()
    const [isWish,setIsWish] = useState(false)

    useMemo(()=>{
        const Res = wish.data.some((w)=>w.title === book.title)
        setIsWish(Res)
    },[isWish,wish])

    return (
        <BookContainer>
            <div>
                <BookTitle>{book.title}</BookTitle>
                <BookIntro>{book.contents ? book.contents.substring(0, 200) + '...' : '설명이 없습니다.'}</BookIntro>
            </div>
            <ButtonWrap>
                <DefaultBtnStyle
                aria-label='읽고싶은 책 목록에 추가'
                disabled={isWish}
                onClick={onClick}
                >Wish</DefaultBtnStyle>
                <Button
                aria-label='예스24 판매페이지로 이동'
                href={`https://www.yes24.com/product/search?domain=ALL&query=${encodeURIComponent(book.title)}`} target='_blank'>More View</Button>
            </ButtonWrap>
        </BookContainer>
    )
}