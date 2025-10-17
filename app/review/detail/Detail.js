"use client"
import styled from "styled-components"
import StarRaiting from "./StarRating"

const ReivewWrap = styled.div`
    padding: 30px 15px 0;
    overflow: hidden;
`
const ReivewHead = styled.section`
    display: flex;
    gap: 15px;
    align-items: start;
`
const BookThumbnail = styled.div`
    width: 150px;
    height: auto;
    background-size: cover;
    aspect-ratio: 3/4;
    background-color: #bdbdbd;
`
const BookContent = styled.div`
    width: calc(100% - 165px);
`
const Highlight = styled.span`
    background: linear-gradient(to top, var(--main-color) 50%, transparent 50%);
    font-size: 1.5rem;
`
const ReviewBody = styled.section`
    width: calc(100% + 30px);
    margin-top: 35px;
    margin-left: -15px;
    padding: 40px 15px 60px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    background-color: var(--background-color);
`
export default function ReviewDetail() {
    return(
        <ReivewWrap>
            <ReivewHead>
                <h2 className="sr-only">책 정보</h2>
                <BookThumbnail></BookThumbnail>
                <BookContent>
                    <p className="text-[1.4rem] text-sx-[1.5rem]">카테고리</p>
                    <p className="text-[1.8rem] font-bold mt-1.5">문어의 영혼</p>
                    <p className="text-[1.4rem]">사이 몽고메리 저</p>

                    <div className="text-[1.5rem] mt-5">
                        <Highlight>2025-04-12</Highlight> 부터<br />
                        <Highlight>2025-07-16</Highlight> 까지 읽었어요.
                    </div>

                    <div className="mt-3 text-[1.5rem]">
                        <p><span>유저</span>님의 평가는</p>
                    </div>
                    <StarRaiting></StarRaiting>
                </BookContent>
            </ReivewHead>
            <ReviewBody>
                <h2 className="sr-only">리뷰 내용</h2>
                <div className="mb-8">
                    <p className="text-[1.8rem] font-bold mb-2">한줄평</p>
                    <p> 한줄평 .. </p>
                </div>

                <div>
                    <p className="text-[1.8rem] font-bold mb-2">서평</p>
                    <p> 한줄평 .. </p>
                </div>
            </ReviewBody>
        </ReivewWrap>
    )
}