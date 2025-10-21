"use client"
import styled from "styled-components"
import { RiCheckLine } from "@remixicon/react";

const CheckStyle = styled.input`
    appearance: none;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
`

const Label = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: rgba(106, 200, 216, .5);
    color: #424242;
    opacity: .5;
`

export default function InputCheck({ type, name }) {
    return(
        <>
            <CheckStyle type={type} name={name} id="list0" aria-label="목록 선택" />
            <Label for={'list0'}>
                <RiCheckLine
                    size={16}
                    color="bdbdbd"
                    aria-hidden="true"
                ></RiCheckLine>
            </Label>
        </>
    )
}