import React, { SelectHTMLAttributes } from "react";
import styled from "styled-components";
import { UseFormRegister, RegisterOptions } from "react-hook-form";

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
const Label = styled.label`
    font-size: 12px; color: #616161
`

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>,'width'>{
    width?: number | undefined;
    options: string[];
    name: string;
    label: string;
    error?: string;
    required?: boolean;
    register: UseFormRegister<any>;
    rules?: RegisterOptions;
}

const SelectFields = ({
    width, options, name, label, error, required, register, rules, ...rest
}: SelectProps)=>{
    const id = name

    return (
        <div>
            <Label htmlFor={id}>{label} {required && <b className="font-bold text-red-700"> *</b>}</Label>
            <Select
                id={id}
                aria-required={required}
                aria-invalid={!!error}
                $width={width}
                aria-describedby={error ? `${name}-error` : undefined}
                {...register(name, rules)}
                {...rest}
            >
            <option value="">카테고리 선택</option>
                {options.map((option,index)=>(
                    <option key={`${index}-${option}`} value={option}>{option}</option>
                ))}
            </Select>
        </div>
    )
}

export default SelectFields