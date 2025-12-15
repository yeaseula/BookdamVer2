
//main slide
export interface BannerBook {
    bookThumb: string;
    booktitle: string;
    error?: any;
}

//main AI 추천
export interface BookAiType {
    isbn: string;
    authors: string[]
    thumbnail: string;
    title: string;
    contents: string;
    price: number;
    sale_price: number;
    error?: unknown;
}

//글쓰기
export interface WriteType {
    category: string;
    title: string;
    author: string;
    startDate: string;
    endDate: string;
    oneLine: string;
    review: string;
}

//memo
export interface MeMoFormType {
    booktitle: string;
    page: number;
    content: string;
}

//wish
export interface WishFormType {
    booktitle: string;
    author: string;
    price: number;
}

//reading
export interface ReadingFormType {
    booktitle: string;
    totalpage: number;
    readedpage: number;
}