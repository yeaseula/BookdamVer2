"use client"
import React from "react";
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
interface FiledType {
    type: string;
    placeholder?: string;
    name: string;
    value?: string | number;
    width?:  string | number | undefined;
    onChange?:(e:React.ChangeEvent<HTMLInputElement>)=>void;
}

export default function InputFields({type, placeholder, name, value, width, onChange }:FiledType) {
    return(
        <InputField
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        $width={width} />
    )
}