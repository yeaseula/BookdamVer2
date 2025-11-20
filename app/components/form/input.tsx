"use client"
import React from "react";
import styled from "styled-components"

interface FiledType {
    type: string;
    placeholder?: string;
    name: string;
    width?: number | undefined;
    onChange?:(e:React.ChangeEvent<HTMLInputElement>)=>void;
}

const InputField = styled.input<{$width:number | undefined}>`
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

export default function InputFields({type, placeholder, name, width, onChange }:FiledType) {
    return(
        <InputField
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        $width={width} />
    )
}