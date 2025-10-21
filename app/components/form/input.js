"use client"
import styled from "styled-components"

const InputField = styled.input`
    width: ${(props)=>props.$width || '100%'}
    border-radius: 5px;
    box-shadow: none;
    background-color: #fff !important;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    height: 37px;
    line-height: 35px !important;
    padding: 0 9px;
    font-size: 1.6rem;
    outline: 0;

    &::placeholder {
        font-size: 1.6rem;
        color: #bdbdbd;
    }

    &:focus {
        border: 2px solid var(--point-color);
    }
`

export default function InputFields({type, placeholder, name, $width }) {
    return(
        <InputField type={type} name={name} placeholder={placeholder} $width={$width}></InputField>
    )
}