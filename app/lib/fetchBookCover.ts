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
        const data = await res.json();

        const filtered = data.documents.find((book:any) =>
            book.title.includes(title) && book.authors.join(',').includes(author)
        );

        return {
            bookThumb: (filtered || data.documents[0])?.thumbnail || '',
            booktitle: title
        }

    } catch (err) {
        console.error('API 패치 오류:',err)
        throw new Error('API 패치 오류 : ' + err)
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
        //console.log(JSON.parse(JSON.stringify(books[0])) + ':😭')

        return books

    } catch(err) {
        console.error('API 패치 오류:',err)
        throw new Error('API 패치 오류 : ' + err)
    }
}