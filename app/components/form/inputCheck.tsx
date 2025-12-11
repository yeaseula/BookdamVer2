"use client"
import styled from "styled-components"
import { RiMore2Fill  } from "@remixicon/react";
import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";


const CheckStyle = styled.button`
    appearance: none;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
`
const Label = styled.label<{checked:boolean, $focused: boolean}>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border:${(props)=>props.$focused ? '2px solid var(--sub_color)' : 'none'};
    color: #424242;
`

interface CheckProps {
    type?: string;
    name: string;
    index: string;
    setCheckId: Dispatch<SetStateAction<string | null>>;
    modal: boolean;
    setModal: Dispatch<SetStateAction<boolean>>
}

export default function InputCheck({ type, name, index, setCheckId, modal, setModal }:CheckProps) {

    const [ischecked,setisChecked] = useState(false)
    const [focused,setFocused] = useState(false)

    return(
        <>
            <CheckStyle
            onClick={()=>{
                setCheckId(index)
            }}
            onFocus={()=>setFocused(true)}
            onBlur={()=>setFocused(false)}
            name={name}
            id={index}
            aria-label="목록 선택" >
                <RiMore2Fill size={14}
                color="#757575"
                />
            </CheckStyle>
        </>
    )
}