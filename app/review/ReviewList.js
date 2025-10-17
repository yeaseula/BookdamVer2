"use client"
import Image from "next/image"
import Link from "next/link"
import styled from "styled-components"
import FloatWrite from "../components/common/Write"
import { useEffect, useState } from "react"

const ReivewWrap = styled.section`
    padding: 30px 15px 65px;
`
const ListItem = styled.div`
    padding: 12px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 8px var(--sub_color);
    display: flex;
    gap: 10px;
    position: relative;
    align-items: center;
    margin-bottom: 13px;
    background-color: rgb(70, 69, 118);
    transition: all 0.2s;
`
const ListHref = styled(Link)`
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    width: 100%;
    height: 100%;
`
const Thumbnail = styled.div`
    width: 97px;
    height: 97px;
    border-radius: 10px;
    overflow: hidden;
    background-color: #bdbdbd;
    background-size: cover;
    @media(max-width: 376px) {
        width: 85px;
        height: 85px;
    }
`
const Content = styled.div`
    width: calc(100% - 107px);
    @media(max-width: 376px) {
        width: calc(100% - 95px);
    }
`
const Title = styled.p`
    font-size: 1.7rem;
    font-weight: 700;
    color: var(--point-color);
    @media(max-width: 376px) {
        font-size: 1.5rem;
    }
`
const Summary = styled.p`
    margin-top: 5px;
    font-size: 1.5rem;
    color: #fff;
    @media(max-width: 376px) {
        font-size: 1.4rem;
    }
`
const Date = styled.p`
    margin-top: 2px;
    font-size: 1.4rem;
    color: #e0e0e0;
    @media(max-width: 376px) {
        font-size: 1.3rem;
    }
`

export default function ReviewList({ reviews }) {

    const [count,setCount] = useState('')

    useEffect(()=>{
        setCount(reviews.length)
    },[])

    return(
        <ReivewWrap>
            <h2 className="sr-only">내가 쓴 리뷰 리스트</h2>
            <p className="total-count text-s">총 {count}개</p>
            <div className="mt-10">
                {reviews.map(cont=>(
                    <ListItem key={cont.booktitle}>
                        <ListHref href={`review/${cont.bookauthor}-${cont.booktitle}`}></ListHref>
                        <Thumbnail style={{ backgroundImage: `url(${cont.bookthumbnail})` }}></Thumbnail>
                        <Content>
                            <Title>{cont.booktitle}</Title>
                            <Summary>{cont.bookoneline}</Summary>
                            <Date>{cont.bookdate}</Date>
                        </Content>
                    </ListItem>
                ))}
            <FloatWrite />
            </div>
        </ReivewWrap>
    )
}