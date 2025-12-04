"use client"
import styled from "styled-components"
import { RiSearchLine } from "@remixicon/react"

const FloatingWirte = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -2px;
    right: 50px;
    width: 25px;
    height: 25px;
    color: var(--sub_color);
    border: none;
    border-radius: 50%;
    background: var(--sub_color);
    z-index: 20;
    color: #fff;
    cursor: pointer;
`
export default function Search() {
    return(
        <FloatingWirte aria-label="검색 버튼">
            <RiSearchLine size={14} />
        </FloatingWirte>
    )
}