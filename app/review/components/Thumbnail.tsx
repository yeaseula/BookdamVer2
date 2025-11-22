"use client"
import { useEffect, useState } from "react";
import styled from "styled-components"
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";

const ThumbContainer = styled.div`
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

interface ThumbProps {
    title: string;
    author: string;
}

export default function Thumbnail({title, author}:ThumbProps) {

    const [thumbnail,setThumbnail] = useState<Promise<void> | null>(null)

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
            if(!Thumbnails) return;
            setThumbnail(Thumbnails)
        }
        image(title,author)
    },[])


    return(
        <>
            {!thumbnail && (
                <SkeletonTheme baseColor="#bdbdbd" highlightColor="#fff">
                    <Skeleton width={97} height={97} borderRadius={10} />
                </SkeletonTheme>
            )}
            {thumbnail &&
            <ThumbContainer style={{ backgroundImage: `url(${thumbnail})` }} />
            }
        </>
    )
}