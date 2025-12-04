"use client"
import { useEffect, useState } from "react";
import styled from "styled-components"
import Skeleton from "react-loading-skeleton";
import { fetchBookCover } from "@/app/lib/fetchBookCover";

const ThumbContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: #bdbdbd;
    background-size: cover;
    background-position: center;
`

interface ThumbProps {
    title: string;
    author: string;
}

export default function Thumbnail({title, author}:ThumbProps) {

    const [thumbnail,setThumbnail] = useState<Promise<void> | string | null>(null)

    useEffect(()=>{
        console.log(thumbnail)

    },[thumbnail])

    useEffect(()=>{
        const image = async (title:string,author:string) => {
            const Thumbnails = await fetchBookCover(title,author)
            if(!Thumbnails) { setThumbnail('/images/noThumb.svg') } else {
                setThumbnail(Thumbnails)
            }
        }
        image(title,author)
    },[])


    return(
        <>
            {!thumbnail &&
                <Skeleton height={100} width={100} style={{ lineHeight: '1.6' }}/>
            }
            {thumbnail &&
                <ThumbContainer
                style={{ backgroundImage: `url(${thumbnail})` }} />
            }
        </>
    )
}