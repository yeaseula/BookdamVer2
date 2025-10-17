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
const FillStar = styled(Image)`
    vertical-align: middle;
    display:${(props)=>props.isfill == 'true'? 'inline-block' : 'none'};
`
function Score({score}) {
    const [isfill,setIsfill] = useState('false')
    return(
        <div className="icons-detail" data-score={score}>
            <Image src={'/images/star-gray.svg'}
            alt="별점"
            aria-hidden={'true'}
            width={20}
            height={20}
            ></Image>
            <FillStar src={'/images/star-fill.svg'}
            isfill={isfill}
            alt="별점"
            aria-hidden={true}
            width={20}
            height={20}
            ></FillStar>
        </div>
    )
}

export default function StarRaiting() {
    return(
        <MyStar>
        <IconWrap>
            <Score score={2}></Score>
            <Score score={4}></Score>
            <Score score={6}></Score>
            <Score score={8}></Score>
            <Score score={10}></Score>
        </IconWrap>
        <p className="font-bold text-[1.8rem]">8</p>
        </MyStar>
    )
}