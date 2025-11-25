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
    setInterest: Dispatch<SetStateAction<string[]>>
}

export default function Checkbox({name,id,value,checked,interest,setInterest}:CheckboxProps) {
    const [isChecked,setIsChecked] = useState(false)

    useEffect(()=>{

        if(isChecked === false) {

            const interestList:string[] = interest.filter((m)=>m !== value )
            setInterest(interestList)
        } else {
            setInterest((prev)=>[...prev,value])
        }
    },[isChecked])

    return (
        <li>
            <Label htmlFor={id} $ischecking={isChecked}>{value}</Label>
            <Check type="checkbox" value={value} name={name} id={id}
            onChange={()=>setIsChecked(!isChecked)}
            />
        </li>
    )
}