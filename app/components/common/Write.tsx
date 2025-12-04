"use client"
import Link from "next/link"
import Image from "next/image"
import styled from "styled-components"
import { RiAddLine } from "@remixicon/react"

const FloatingWirte = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -2px;
    right: 20px;
    width: 25px;
    height: 25px;
    color: var(--sub_color);
    border: none;
    border-radius: 50%;
    background: var(--sub_color);
    z-index: 20;
    color: #fff;
`

export default function FloatWrite() {
    return(
        <FloatingWirte href={'/write'} aria-label="글쓰기 버튼">
            <RiAddLine />
        </FloatingWirte>
    )
}