"use client"

import { NetworkError, throwHttpError } from "../error/errorLibrary";
import { BookAiType } from "./dataTypes";
import { randomInt, shuffle } from "./aiRecomand";
import { ALADIN_INTEREST_MAP } from "../data/categoryMap";
import { Reviews } from "./userfetch";

function pickMost(arr: (number)[]) {
    const count = new Map<any, number>();

    for (const v of arr) {
        count.set(v, (count.get(v) ?? 0) + 1);
    }

    let maxCount = 0;
    let result = arr[0];

    for (const v of arr) {
        const c = count.get(v)!;
        if (c > maxCount) {
        maxCount = c;
        result = v;
        }
    }

    return result;
}
const fetchAladinReview = async (query: string, size: string, options?:RequestInit) => {
    const res = await fetch(
        `/api/aladinThumb?query=${encodeURIComponent(query)}&size=${size}`
    );
    if(!res.ok) { throw new Error(`ALADIN_HTTP_${res.status}`) }
    return res.json();
};
const fetchAladin = async (categoryId: number, searchType: string, size: string, maxCount: number) => {
    const res = await fetch(`/api/aladin?categoryId=${categoryId}&searchType=${searchType}&size=${size}&maxCount=${maxCount}`);
    if(!res.ok) throwHttpError(res)
    return res.json();
};
const RecomandAladin = async(size: string, maxCount: number) => {
    const res = await fetch(`/api/editorRecomand?&size=${size}&maxCount=${maxCount}`);
    if(!res.ok) throwHttpError(res)
    return res.json();
}

export const fetchReviewRecomand = async ( reviews: Reviews[] ) => {

    try {
        const requests = reviews.map(val => {
            const query = `${val.title} ${val.author}`;
            return fetchAladinReview(query,"Small")
        })

        const results = await Promise.allSettled(requests);

        const categories = []

        for (const result of results) {
            if(result.status === 'fulfilled') { // result = 0번째, 1번째 ...
                const items = result.value?.item ?? []; //실제 검색 결과
                for(const cate of items) {
                    categories.push(cate.categoryId)
                }
            } else {
                console.warn('Aladin fetch failed for one category:', result.reason);
            }
        }

        const mostCategory = pickMost(categories)

        const number = Math.floor(Math.random() * 15)
        const index = number === 0 ? number : number - 1
        const resultRecomand = await fetchAladin(mostCategory, "Bestseller", "MidBig", number)

        return [{
            bookThumb: resultRecomand.item[index].cover || '',
            booktitle: resultRecomand.item[index].title,
            bookContents: resultRecomand.item[index].description,
            bookauthor: resultRecomand.item[index].author
        }]
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

export const fetchEditorRecomand = async () => {
    try {

        const number = Math.floor(Math.random() * 15)
        const index = number === 0 ? number : number - 1

        const request = await RecomandAladin("MidBig",number)
        return [{
            bookThumb: request.item[index].cover || '',
            booktitle: request.item[index].title,
            bookContents: request.item[index].description,
            bookauthor: request.item[index].author
        }]
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

export const fetchBookCover = async (title:string, signal?: AbortSignal) => {
    try {
        const query = `${title}`;
        const res = await fetchAladinReview(query,"MidBig", {signal})

        return {
            bookThumb: res?.item?.[0]?.cover ?? null
        }
    } catch(err) {
        if ((err as DOMException)?.name === 'AbortError') {
            return null
        }
        return null
    }
}

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
        const requests = categoryId.map(id => fetchAladin(id,"ItemNewSpecial","Mid",10))
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