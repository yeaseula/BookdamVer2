"use client"
import styled from "styled-components"
import { RiCheckLine } from "@remixicon/react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

const CheckStyle = styled.input`
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
    background-color: ${(props)=>props.checked ? `var(--point-color)` : `rgba(106, 200, 216, .5)`};
    color: #424242;
    opacity: ${(props)=>props.checked || props.$focused ? 1 : 0.5};
`

interface CheckProps {
    type: string;
    name: string;
    index: number;
    edit: number[];
    setEdit: Dispatch<SetStateAction<number[]>>
}

export default function InputCheck({ type, name, index, edit, setEdit }:CheckProps) {

    const [ischecked,setisChecked] = useState(false)
    const [focused,setFocused] = useState(false)

    useEffect(()=>{
        if(ischecked) {
            //check state
            setEdit(prev=>[...prev,index])
        } else {
            //uncheck state
            const editResult = edit.filter((val)=>val !== index)
            setEdit(editResult)
        }
    },[ischecked])

    return(
        <>
            <CheckStyle
            type={type}
            onChange={()=>setisChecked(!ischecked)}
            onFocus={()=>setFocused(true)}
            onBlur={()=>setFocused(false)}
            name={name}
            id={String(index)}
            aria-label="목록 선택" />
            <Label htmlFor={String(index)} checked={ischecked} $focused={focused}>
                <RiCheckLine
                    size={16}
                    color={ischecked ? '#ffffff' : '#bdbdbd'}
                    aria-hidden="true"
                ></RiCheckLine>
            </Label>
        </>
    )
}