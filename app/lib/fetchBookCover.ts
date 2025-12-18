"use client"

import Error from "../error";
import { NetworkError, throwHttpError } from "../error/errorLibrary";
import { BookAiType } from "./dataTypes";
import { randomInt, shuffle } from "./aiRecomand";
import { ALADIN_INTEREST_MAP } from "../data/categoryMap";

export const fetchBookCover = async (title:string,author:string) => {

    try {
        const query = `${title} ${author}`;
        const apiUrl = `https://dapi.kakao.com/v3/search/book?target=all&query=${encodeURIComponent(query)}`;

        const res = await fetch(apiUrl, {
            headers: {
                Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_KEY}`
            }
        });

        if(!res.ok) {
            throwHttpError(res)
        }
        const data = await res.json();

        const filtered = data.documents.find((book:any) =>
            book.title.includes(title) && book.authors.join(',').includes(author)
        );

        return {
            bookThumb: (filtered || data.documents[0])?.thumbnail || '',
            booktitle: title
        }
    } catch(err) {
        console.log(err)
        if (err instanceof TypeError && err.message.includes('fetch')) {
            throw new NetworkError()
        }
        if(err instanceof Error) {
            throw err
        }
        throw err
    }
}

const fetchAladin = async (categoryId: number) => {
    const res = await fetch(`/api/aladin?categoryId=${categoryId}`);
    if(!res.ok) throwHttpError(res)
    return res.json();
};

export const fetchBookAI = async(interest:string[]) => {

    if(!interest.length) { //관심배열이 없을 경우 랜덤으로 선택
        const allKeys = Object.keys(ALADIN_INTEREST_MAP);
        const shuffledKeys = shuffle(allKeys)
        interest = shuffledKeys.slice(0,4)
    }

    const randomIndex = randomInt(0,interest.length - 1)
    const selectInterest = interest[randomIndex]

    const categoryId = ALADIN_INTEREST_MAP[selectInterest] ?? []
    if(!categoryId.length) return []

    try {
        const requests = categoryId.map(id => fetchAladin(id))
        const results = await Promise.allSettled(requests);

        const books: BookAiType[] = [];

        for (const result of results) {
            if (result.status === 'fulfilled') {
                const items = result.value?.item ?? [];
                for(const book of items) {
                    if (!book.isbn || !book.title) continue;
                    books.push({
                        isbn: book.isbn,
                        authors: book.author ?? 'unknown',
                        thumbnail: book.cover ?? '',
                        title: book.title,
                        contents: book.description ?? '',
                        price: Number(book.priceStandard ?? 0),
                        sale_price: Number(book.priceSales ?? 0),
                    })
                }
            } else {
                console.warn('Aladin fetch failed for one category:', result.reason);
            }
        }

        return books

    } catch(error) {
        console.log(error)

        if (error instanceof TypeError && error.message.includes('fetch')) {
            throw new NetworkError()
        }
        if(error instanceof Error) {
            throw error
        }
        throw error
    }
}