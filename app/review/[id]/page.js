import ReviewDetail from "../detail/Detail"
import { loadReviewDetail } from "@/app/lib/getreview";


export default async function ReviewDetailServer({params}) {
    const {id} = await params;

    const urlInfo = decodeURIComponent(id)
    const urlArr = urlInfo.split('-')

    const bookTitle = urlArr[1]
    const bookauthor = urlArr[0]

    const detail = await loadReviewDetail(bookTitle, bookauthor)

    return(
        <>
            <ReviewDetail detail={detail}></ReviewDetail>
        </>
    )
}