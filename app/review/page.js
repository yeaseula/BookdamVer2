import ReviewList from "./ReviewList";
import myReview from "../lib/getreview";

export default async function ReviewPage() {
    const reviews = await myReview();

    return (
        <>
            <ReviewList reviews={reviews}></ReviewList>
        </>
    )
}