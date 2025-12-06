"use client"

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
            throw new Error('api 호출 실패')
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
        return {
            bookThumb: '',
            booktitle: title,
            error: err
        }
    }
}

interface BookAiType {
    isbn: string;
    thumbnail: string;
    title: string;
    contents: string;
    price: number;
    sale_price: number;
    err?: unknown;
}

export const fetchBookAI = async(interest:string[]) => {

    const keywords = interest;
    if(!keywords) return;

    try {
        const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
        const res = await fetch(`https://dapi.kakao.com/v3/search/book?query=${randomKeyword}&size=15`, {
            headers: {
                Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_KEY}`
            }
        });

        if(!res.ok) {
            throw new Error('api 호출 실패')
        }
        const data = await res.json();

        const BookAiResult:BookAiType[] = []

        data?.documents.forEach((ele)=>{
            const test = {
                isbn : ele.isbn,
                thumbnail: ele.thumbnail,
                title: ele.title,
                contents: ele.contents,
                price: ele.price,
                sale_price: ele.sale_price,
            }
            BookAiResult.push(test)
        })

        return BookAiResult

    } catch(error) {
        console.log(error)
        const ErrorResult:BookAiType[] = [{
                isbn : '',
                thumbnail: '',
                title: '',
                contents: '',
                price: 0,
                sale_price: 0,
                err: error
            }]
        return ErrorResult
    }
}