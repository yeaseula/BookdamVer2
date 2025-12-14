"use client"
import React, { memo, forwardRef, InputHTMLAttributes, RefObject } from "react";
import styled from "styled-components"

const InputField = styled.input<{$width:string | number | undefined}>`
    width: ${(props)=>props.$width || '100%'};
    border-radius: 5px;
    box-shadow: none;
    background-color: #fff !important;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    height: 37px;
    line-height: 35px !important;
    padding: 0 9px;
    font-size: 1.4rem;
    outline: 0;

    &::placeholder {
        font-size: 1.4rem;
        color: #bdbdbd;
    }

    &:focus {
        border: 2px solid var(--point-color);
    }
`

interface InputType extends Omit<InputHTMLAttributes<HTMLInputElement>, 'width'> {
    type?: string;
    placeholder?: string;
    name: string;
    width?: string | number;
}

const InputFields = memo(
    forwardRef<HTMLInputElement, InputType>(
        ({ type, placeholder, name, value, width, onBlur, onChange, ...rest },ref)=>{
            return (
                <InputField
                ref={ref}
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                $width={width}
                {...rest}
                />
            )
        }
    )
)

export default InputFields

// export default function InputFields({type, placeholder, name, value, width, onBlur, onChange }:FiledType) {
//     return(
//         <InputField
//         type={type}
//         placeholder={placeholder}
//         name={name}
//         value={value}
//         onBlur={onBlur}
//         onChange={onChange}
//         $width={width} />
//     )
// }