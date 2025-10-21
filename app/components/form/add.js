"use client"
import styled from "styled-components"
import Image from "next/image"

const AddButtonstyle = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 37px;
    height: 37px;
    border-radius: 5px;
    border: 1px solid var(--sub_color);
    background-color: var(--sub_color);
    color: #fff;
    transition: all .2s;
    outline: 0;
    cursor: pointer;
`

export default function AddButton({arialabel}) {
    return(
        <AddButtonstyle aria-label={arialabel}>
            <Image src={'/images/add-line.svg'} width={24} height={24} alt="추가 버튼"></Image>
        </AddButtonstyle>
    )
}