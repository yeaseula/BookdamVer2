"use client"

import styled from "styled-components"
import { RiMore2Fill } from "@remixicon/react"

const Button = styled.button`
    position: absolute;
    top: 0;
    right: 15px;
    cursor: pointer;
`

export default function HeaderButton() {
    return (
        <Button><RiMore2Fill size={24}></RiMore2Fill></Button>
    )
}