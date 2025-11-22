"use client"
import Image from "next/image"
import { useState } from "react"
import styled from "styled-components"

const MyStar = styled.div`
    display: flex;
    gap: 5px;
`
const IconWrap = styled.div`
    display: flex;
    align-items: center;
`
interface ScoreProps {
    score: string;
}

function Score({score}:ScoreProps) {
    const [isfill,setIsfill] = useState(score)

    return(
        <div className="icons-detail" data-score={score}>
            {isfill === 'false' && (
                <Image src={'/images/star-gray.svg'}
                alt="별점"
                aria-hidden={'true'}
                width={20}
                height={20}
                style={{ verticalAlign: 'middle' }}
                />
            )}
            {isfill === 'true' && (
                <Image src={'/images/star-fill.svg'}
                alt="별점"
                aria-hidden={true}
                width={20}
                height={20}
                />
            )}
        </div>
    )
}

interface StarRatingProps {
    rating: number
}

export default function StarRaiting({rating}:StarRatingProps) {
    return(
        <MyStar>
        <IconWrap>
            <Score score={`${rating >= 2 ? true : false}`}></Score>
            <Score score={`${rating >= 4 ? true : false}`}></Score>
            <Score score={`${rating >= 6 ? true : false}`}></Score>
            <Score score={`${rating >= 8 ? true : false}`}></Score>
            <Score score={`${rating >= 10 ? true : false}`}></Score>
        </IconWrap>
        <p className="font-bold text-[1.8rem] relative top-1">{rating}</p>
        </MyStar>
    )
}