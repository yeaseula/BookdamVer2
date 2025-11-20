import { SelectHTMLAttributes } from "react";
import styled from "styled-components";

const Select = styled.select<{$width:number | undefined}>`
    width: ${(props)=>props.$width || '100%'};
    background-color: #fff !important;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    height: 37px;
    line-height: 35px !important;
    padding: 0 9px;
    font-size: 1.4rem;
    outline: 0;
    box-shadow: 0 3px 14px rgba(0, 0, 0, .15);

    &:focus {
        border: 2px solid var(--point-color);
    }
`

interface SelectProps {
    name: string;
    width?: number | undefined;
    options: string[];
    onChange?:(e:React.ChangeEvent<HTMLSelectElement>)=>void;
}

export default function SelectField({name,width,onChange,options}:SelectProps) {
    return (
        <Select $width={width} name={name} onChange={onChange}>
            <option value="">카테고리 선택</option>
            {options.map((option,index)=>(
                <option key={`${index}-${option}`} value={option}>{option}</option>
            ))}
        </Select>
    )
}