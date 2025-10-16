"use client"
import Link from "next/link"
import Image from "next/image"
import styled from "styled-components"

const FloatingWirte = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 100px;
    right: calc((100vw - 450px) / 2 + 15px);
    width: 50px;
    height: 50px;
    color: #fff;
    font-size: 32px;
    border: none;
    border-radius: 50%;
    box-shadow: 0 4px 12px #9ADBC5;
    z-index: 20;
    background: #fff;
    @media (max-width: 450px) {
        right: 15px;
    }
`
const PenImage=styled(Image)`
    position: relative;
    top: 0px;
    max-width: 28px;
    width: 100%;
`

export default function FloatWrite() {
    return(
        <FloatingWirte href={'/write'} className="go-wwite-btn">
            <PenImage src={'/images/pen-fill.svg'}
            alt={'dd'}
            width={25}
            height={25}
            />
        </FloatingWirte>
    )
}