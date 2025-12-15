import React from "react";
import styled from "styled-components";
import { RiArrowDownSLine } from "@remixicon/react";

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
    appearance: none;
    background: 97% url('/images/arrow-down.svg') no-repeat;
    background-size: 20px;
    &:focus {
        border: 2px solid var(--point-color);
    }
`

interface SelectProps {
    width?: number | undefined;
    options: string[];
}

const SelectFields = React.forwardRef<HTMLSelectElement,SelectProps>(({
    width,options,...rest
},ref)=>{
    return(
        <Select
        ref={ref}
        $width={width}
        {...rest}
        >
        <option value="">카테고리 선택</option>
            {options.map((option,index)=>(
                <option key={`${index}-${option}`} value={option}>{option}</option>
            ))}
        </Select>
    )
})

export default SelectFields