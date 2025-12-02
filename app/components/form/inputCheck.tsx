"use client"
import styled from "styled-components"
import { RiMore2Fill  } from "@remixicon/react";
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
    color: #424242;
`

interface CheckProps {
    type: string;
    name: string;
    index: string;
    checkId: React.RefObject<string[]>;
    modal: boolean;
    setModal: Dispatch<SetStateAction<boolean>>
}

export default function InputCheck({ type, name, index, checkId, modal, setModal }:CheckProps) {

    const [ischecked,setisChecked] = useState(false)
    const [focused,setFocused] = useState(false)
    //수정,삭제 버튼 모달

    useEffect(()=>{
        //모달 팝업에서 수정했을 시 모든 checkId 배열이 초기화되며 버튼 check여부 초기화
        if(checkId.current.length === 0) {
            setisChecked(false)
        }
    },[checkId])

    useEffect(()=>{
        if(ischecked) {
            //check state
            checkId.current = [...checkId.current, index]
        } else {
            //uncheck state
            const editResult = checkId.current.filter((val)=>val !== index)
            checkId.current = editResult
        }
    },[ischecked])

    return(
        <>
            <CheckStyle
            type={type}
            onChange={()=>{
                checkId.current = [...checkId.current, index]
                setModal(!modal)
            }}
            onFocus={()=>setFocused(true)}
            onBlur={()=>setFocused(false)}
            name={name}
            id={index}
            aria-label="목록 선택" />
            <Label htmlFor={index} checked={ischecked} $focused={focused}>
                <RiMore2Fill size={14}
                color="#757575"
                />
            </Label>
        </>
    )
}