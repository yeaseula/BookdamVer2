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
    index: string;
    checkId: string[];
    setCheckId: Dispatch<SetStateAction<string[]>>
}

export default function InputCheck({ type, name, index, checkId, setCheckId }:CheckProps) {

    const [ischecked,setisChecked] = useState(false)
    const [focused,setFocused] = useState(false)

    useEffect(()=>{
        //모달 팝업에서 수정했을 시 모든 checkId 배열이 초기화되며 버튼 check여부 초기화
        if(checkId.length === 0) {
            setisChecked(false)
        }
    },[checkId])

    useEffect(()=>{
        if(ischecked) {
            //check state
            setCheckId(prev=>[...prev,index])
        } else {
            //uncheck state
            const editResult = checkId.filter((val)=>val !== index)
            setCheckId(editResult)
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
            id={index}
            aria-label="목록 선택" />
            <Label htmlFor={index} checked={ischecked} $focused={focused}>
                <RiCheckLine
                    size={16}
                    color={ischecked ? '#ffffff' : '#bdbdbd'}
                    aria-hidden="true"
                ></RiCheckLine>
            </Label>
        </>
    )
}