"use client"
import { useEffect, useState } from "react";
import styled from "styled-components"

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

    const fetchBookCover = async (title:string,author:string) => {
        try {
            const query = `${title} ${author}`;
            const apiUrl = `https://dapi.kakao.com/v3/search/book?target=all&query=${encodeURIComponent(query)}`;

            const res = await fetch(apiUrl, {
                headers: {
                    Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_KEY}`
                }
            });
            const data = await res.json();

            const filtered = data.documents.find((book:any) =>
                book.title.includes(title) && book.authors.join(',').includes(author)
            );

            return (filtered || data.documents[0])?.thumbnail || '';

            } catch (e) {
                console.error('카카오 API 오류:', e);
                return '';
            }
        }

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
            <ThumbContainer style={{ backgroundImage: `url(${thumbnail})` }} />
        </>
    )
}