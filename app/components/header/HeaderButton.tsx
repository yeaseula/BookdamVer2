"use client"

import styled from "styled-components"
import { useState } from "react"
import { RiMore2Fill } from "@remixicon/react"
import Modal from "../modal/Modal"

const Button = styled.button`
    position: absolute;
    top: 0;
    right: 15px;
    cursor: pointer;
    z-index: 99;
`

export default function HeaderButton() {

    const [modal,setModal] = useState(false)

    const handleButton = () => {
        setModal(!modal)
    }

    return (
        <>
            <Button onClick={handleButton}>
                <RiMore2Fill size={24}></RiMore2Fill>
            </Button>
                <Modal onClick={handleButton} state={modal}/>

        </>
    )
}