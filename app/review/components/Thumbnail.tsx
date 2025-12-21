"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components"
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { fetchBookCover } from "@/app/lib/fetchBookCover";
import { useErrorUtil } from "@/app/error/useErrorUtil";

const ThumbContainer = styled.div`
    position: relative;
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

    const throwError = useErrorUtil()
    const [thumbnail,setThumbnail] = useState<Promise<void> | string | null>(null)

    useEffect(()=>{
        const image = async (title:string,author:string) => {
            if(!title) return
            try {
                const Thumbnails = await fetchBookCover(title,author)
                if(Thumbnails.bookThumb == '') {
                    setThumbnail('/images/noThumb.svg')
                } else {
                    setThumbnail(Thumbnails.bookThumb)
                }
            } catch(err) {
                throwError(err)
            }
        }
        image(title,author)
    },[title])

    return(
        <>
            <ThumbContainer>
                <Image
                src={`${thumbnail || '/images/noThumb.svg'}`}
                fill
                alt={`${title} 책 표지`}
                fetchPriority="high"
                ></Image>
            </ThumbContainer>
        </>
    )
}