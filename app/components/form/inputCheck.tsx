"use client"
import styled from "styled-components"
import { RiMore2Fill  } from "@remixicon/react";
import { Dispatch, SetStateAction, useState } from "react";


const CheckStyle = styled.button`
    appearance: none;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
`

interface CheckProps {
    type?: string;
    name: string;
    index: string;
    setCheckId: Dispatch<SetStateAction<string | null>>;
}

export default function InputCheck({ name, index, setCheckId }:CheckProps) {

    return(
        <>
            <CheckStyle
            onClick={()=>{
                setCheckId(index)
            }}
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