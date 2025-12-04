import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components"

const Check = styled.input`
    appearance: none;
`
const Label = styled.label<{$ischecking:boolean}>`
    font-size: 1.3rem;
    background: ${(props)=>props.$ischecking ? 'var(--sub_color)' : '#fff'};
    color: ${(props)=>props.$ischecking ? '#fff' : 'initial'};
    border: 1px solid var(--sub_color);
    display: inline-block;
    padding: 2px 16px 1px;
    border-radius: 100px;
`

interface CheckboxProps {
    name: string;
    id: string;
    value: string;
    checked: boolean;
    interest: string[];
    originList?: React.RefObject<string[]>;
    setInterest: Dispatch<SetStateAction<string[]>>
    setIsOriginFecth: Dispatch<SetStateAction<boolean>>
}

export default function Checkbox({name,id,value,checked,interest,originList,setInterest,setIsOriginFecth}:CheckboxProps) {
    const [isChecked,setIsChecked] = useState(checked)

    useEffect(()=>{
        setIsChecked(checked)
    },[checked])

    useEffect(()=>{
        interest.forEach((ele)=> {
            if(ele === value) setIsChecked(true)
        })
    },[])

    const handleInterest = () => {
        if(isChecked) {
            setIsChecked(false)
            const interestList:string[] = interest.filter((m)=>m !== value )
            const interestListSet:string[] = [...new Set(interestList)]
            setInterest(interestListSet)

            if(!originList) return //sign up에서 확인
            const test = originList.current.some((e)=> e === value)
            if(test) {
                setIsOriginFecth(false)
                const newOriginList = originList.current.filter((e)=> e !== value)
                console.log(newOriginList)
                originList.current = newOriginList
            }
        } else {
            setIsChecked(true)
            setInterest((prev)=>[...prev,value])
        }
    }

    return (
        <li>
            <Label htmlFor={id} $ischecking={isChecked}>{value}</Label>
            <Check type="checkbox" value={value} name={name} id={id}
            onChange={handleInterest}
            />
        </li>
    )
}