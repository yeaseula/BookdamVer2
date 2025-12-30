"use client"
import React, { InputHTMLAttributes } from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";
import styled from "styled-components"

const Wrap = styled.div<{$width:string | number | undefined}>`
    width: ${(props)=>props.$width || '100%'};
`
const InputField = styled.input`
    width: 100%;
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
const Label = styled.label`
    font-size: 12px; color: #616161
`

interface InputType extends Omit<InputHTMLAttributes<HTMLInputElement>, 'width'|'name'> {
    name: string;
    label: string;
    error?: string;
    required?: boolean;
    register: UseFormRegister<any>;
    rules?: RegisterOptions;
    width?: string | number;
    show?: boolean
}

export default function InputFields ({
    label, error ,register, rules, name, width, required, show, ...rest
}:InputType){
    const id = name
    return (
        <Wrap $width={width}>
            <Label htmlFor={id} className={`${show && 'sr-only'}`}>{label} {required && <b className="font-bold text-red-700"> *</b>}</Label>
            <InputField
            id={id}
            aria-required={required}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
            {...register(name, rules)}
            {...rest}
            />
        </Wrap>
    )
}
