"use client"
import styled from "styled-components"

const TextareaStyle = styled.textarea`
    width: 100%;
    max-width: 100%;
    height: ${(props)=>props.$height || '90px'};
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    padding: 10px 9px;
    font-size: 1.6rem;
    outline: 0;
    box-shadow: 0 3px 14px rgba(0, 0, 0, .15);

    &::placeholder {
        font-size: 1.6rem;
        color: #bdbdbd;
    }

    &:focus, &focus-visible {
        border: 2px solid var(--point-color);
    }
`

export default function TextArea({name, placeholder, $height}) {
    return(
        <TextareaStyle name={name} placeholder={placeholder} $height={$height} />
    )
}