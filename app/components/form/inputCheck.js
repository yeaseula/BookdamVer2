"use client"
import styled from "styled-components"
import { RiCheckLine } from "@remixicon/react";
import { useEffect, useRef, useState } from "react";

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
    border:${(props)=>props.$focused ? '2px solid var(--sub_color)' : 'none'};
    background-color: ${(props)=>props.checked ? `var(--point-color)` : `rgba(106, 200, 216, .5)`};
    color: #424242;
    opacity: ${(props)=>props.checked || props.$focused ? 1 : 0.5};
`

export default function InputCheck({ type, name }) {
    const CheckRef = useRef(null)
    const [checkState,setCheckState] = useState(false)
    const [focusState,setFocusState] = useState(false)
    const handleCheck = () => {
        setCheckState(!checkState)
    }
    const handleFocus = () => {
        setFocusState(!focusState)
    }

    return(
        <>
            <CheckStyle
            type={type}
            onChange={()=>{handleCheck()}}
            onFocus={()=>handleFocus()}
            name={name}
            id="list0"
            aria-label="목록 선택" />
            <Label htmlFor={'list0'} checked={checkState} $focused={focusState}>
                <RiCheckLine
                    size={16}
                    color={checkState ? '#ffffff' : '#bdbdbd'}
                    aria-hidden="true"
                ></RiCheckLine>
            </Label>
        </>
    )
}