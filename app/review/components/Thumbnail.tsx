"use client"
import Image from "next/image";
import styled from "styled-components"

const ThumbContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #ebebeb;
    background-size: cover;
    background-position: center;
`

export default function Thumbnail({cover,title}:{cover:string | null, title: string}) {

    return(
        <>
            <ThumbContainer>
                <Image
                src={`${cover || '/images/noThumb.svg'}`}
                fill
                alt={`${title} 책 표지`}
                fetchPriority="high"
                ></Image>
            </ThumbContainer>
        </>
    )
}