import styled from "styled-components"
import Link from "next/link"
import { Reviews } from "@/app/lib/userfetch"
import Thumbnail from "./Thumbnail"

const GalleryContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
`
const GalleryItem = styled.div`
    position: relative;
    width: calc(33.333% - 8px);
`
const ListHref = styled(Link)`
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    width: 100%;
    height: 100%;
    z-index: 9;
`
const BookThumbnail = styled.div`
    width: 100%;
    aspect-ratio: 3 / 4;
    border-radius: 10px;
    overflow: hidden;
    @media(max-width: 376px) {
        width: 85px;
        height: 85px;
    }
`
export default function GalleryList({reviews}: {reviews: Reviews[]}) {
    return (
        <GalleryContainer>
        {reviews.map((ele)=> (
            <GalleryItem key={ele.id}>
                <ListHref href={`review/${ele.id}`} />
                <BookThumbnail>
                    <Thumbnail title={ele.title} author={ele.author}/>
                </BookThumbnail>
                    <p className="text-xl mt-3 font-medium">{ele.title}</p>
            </GalleryItem>
        ))}
        </GalleryContainer>
    )
}