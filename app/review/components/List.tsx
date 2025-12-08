import styled from "styled-components"
import Link from "next/link"
import { Reviews } from "@/app/lib/userfetch"
import Thumbnail from "./Thumbnail"
import { ErrorBoundary } from "react-error-boundary"
import { CompoErrorFallBack } from "@/app/error/CompoErrorFallBack"

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
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    @media(max-width: 376px) {
        font-size: 1.5rem;
    }
`
const Summary = styled.p`
    margin-top: 5px;
    font-size: 1.5rem;
    color: #fff;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
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

export default function List({reviews}: {reviews:Reviews[]}) {
    return (
        <>
        {reviews.map(cont=>(
            <ListItem key={cont.id}>
                <ListHref href={`review/${cont.id}`}></ListHref>
                <BookThumbnail>
                    <ErrorBoundary FallbackComponent={CompoErrorFallBack}>
                        <Thumbnail title={cont.title} author={cont.author}/>
                    </ErrorBoundary>
                </BookThumbnail>
                <Content>
                    <Title>{cont.title}</Title>
                    <Summary>{cont.memo}</Summary>
                    <Date>{cont.start_date} ~ {cont.end_date}</Date>
                </Content>
            </ListItem>
        ))}
        </>
    )
}