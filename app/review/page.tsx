"use client"
import Link from "next/link"
import styled from "styled-components"
import FloatWrite from "../components/common/Write"
import { useAuthStore } from "../lib/userfetch"
import Skeleton,{SkeletonTheme} from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import Thumbnail from "./components/Thumbnail"
import { RiFileWarningFill } from "@remixicon/react"

const ReivewWrap = styled.section`
    padding: 80px 15px 65px;
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
const BookThumbnail = styled.div`
    width: 97px;
    height: 97px;
    border-radius: 10px;
    overflow: hidden;
    @media(max-width: 376px) {
        width: 85px;
        height: 85px;
    }
`
const ListHref = styled(Link)`
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    width: 100%;
    height: 100%;
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

export default function ReviewList() {
    const { reviews } = useAuthStore()

    return(
        <ReivewWrap>
            <h2 className="sr-only">내가 쓴 리뷰 리스트</h2>
            {!reviews && ( //로딩중 스켈레톤
                <>
                    <SkeletonTheme>
                        <Skeleton width={50} height={22} borderRadius={5} />
                    </SkeletonTheme>
                    <div className="mt-10">
                        <SkeletonTheme>
                            <Skeleton height={121} borderRadius={12} />
                        </SkeletonTheme>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <SkeletonTheme>
                            <Skeleton height={121} borderRadius={12}/>
                        </SkeletonTheme>
                    </div>
                </>
            )}
            {reviews && (
                <>
                {reviews.length > 0 && ( //리뷰가 있을 때
                    <>
                    <p className="total-count text-s">총 {reviews.length}개</p>
                    <div className="mt-10">
                        {reviews.map(cont=>(
                            <ListItem key={cont.id}>
                                <ListHref href={`review/${cont.id}`}></ListHref>
                                <BookThumbnail>
                                    <Thumbnail title={cont.title} author={cont.author}/>
                                </BookThumbnail>
                                <Content>
                                    <Title>{cont.title}</Title>
                                    <Summary>{cont.memo}</Summary>
                                    <Date>{cont.start_date}-{cont.end_date}</Date>
                                </Content>
                            </ListItem>
                        ))}
                    </div>
                    </>
                )}
                {reviews.length === 0 && (
                    <div className="text-center">
                        <RiFileWarningFill size={40} style={{ margin: '0 auto',color: 'var(--sub_color)' }} />
                        <p className="mt-5 text-2xl font-bold">등록된 리뷰가 없습니다.</p>
                    </div>
                )}
                <FloatWrite />
                </>
            )}
        </ReivewWrap>
    )
}