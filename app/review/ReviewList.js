"use client"
import Image from "next/image"
import Link from "next/link"
import styled from "styled-components"

const ReivewWrap = styled.section`
    padding: 30px 15px 65px;
`
const ReivewTitle = styled.div`
    display: flex;
    justify-content: space-between;
`

export default function ReviewList({ reviews }) {

    console.log(reviews[0])

    return(
        <ReivewWrap>
            <h2 className="sr-only">내가 쓴 리뷰 리스트</h2>
            <ReivewTitle>
                <p className="total-count text-s">총 4개</p>
                <Link href={'write'} className="go-wwite-btn">
                    <Image src={'/images/pen-fill.svg'}
                    alt={'dd'}
                    width={25}
                    height={25}
                    />
                </Link>
            </ReivewTitle>

            <div className="my-review-list">
                <div className="list-item empty"></div>
                <div className="list-item empty"></div>
                <div className="list-item empty"></div>
                <div className="list-item empty"></div>
            </div>
        </ReivewWrap>
    )
}