"use client"
import { useAuthStore } from "./userfetch";


interface ThumbProps {
    title?: string;
    author?: string;
    interest?: string[];
}


export const fetchBookCover = async ({title,author}:ThumbProps) => {
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

export const fetchBookAI = async(interest:string[]) => {

    const keywords = interest;
    if(!keywords) return;

    try {
        const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
        const response = await fetch(`https://dapi.kakao.com/v3/search/book?query=${randomKeyword}&size=15`, {
            headers: {
                Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_KEY}`
            }
        });
        const data = await response.json();

        const books:string[] = data?.documents || [];

        return books

    } catch(err) {
        console.error('kakao api 로드 실패:',err)
    }
}