import { useState } from "react";
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
}

export default function Checkbox({name,id,value,checked}:CheckboxProps) {
    const [isChecked,setIsChecked] = useState(false)

    return (
        <li>
            <Label htmlFor={id} $ischecking={isChecked}>{value}</Label>
            <Check type="checkbox" value={value} name={name} id={id}
            onClick={()=>setIsChecked(!isChecked)}
            />
        </li>
    )
}