import ReviewDetail from "../detail/Detail"
import { ReviewHeader } from "../detail/ReviewHeader";

export default async function ReviewDetailServer({params}) {

    const {id} = await params;

    return(
        <>
            <ReviewHeader postNumber={id} />
            <ReviewDetail postNumber={id}/>
        </>
    )
}