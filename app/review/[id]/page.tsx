import ReviewDetail from "../detail/Detail"

export default async function ReviewDetailServer({params}) {
    const {id} = await params;

    const urlInfo = decodeURIComponent(id)
    const urlArr = urlInfo.split('-')

    const bookTitle = urlArr[1]
    const bookauthor = urlArr[0]

    return(
        <>
            <ReviewDetail title={bookTitle} author={bookauthor}></ReviewDetail>
        </>
    )
}