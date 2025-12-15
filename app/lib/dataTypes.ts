
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