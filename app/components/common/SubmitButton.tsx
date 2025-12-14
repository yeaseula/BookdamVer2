"use client"
import React, { memo } from "react"
import styled from "styled-components"

const Button = styled.button<{disabled:boolean}>`
    width: 100%;
    height: 40px;
    margin-top: 35px;
    color: #fff;
    border-radius: 5px;
    background-color: var(--sub_color);
    cursor: ${(props)=>props.disabled ? 'initial' : 'pointer'};
    &:disabled {
        background-color: #bdbdbd;
        color: #e0e0e0;
    }
`

interface ButtonProps {
    type: 'submit' | 'button'
    children: React.ReactNode;
    active: boolean;
    loading: boolean;
    onClick: () => void
}

const SubmitButton = memo(({
    type,
    active, loading, onClick,
    children
}:ButtonProps)=>{
    const isActive = active && !loading
    return (
        <Button type={type} disabled={!isActive} onClick={onClick}>{children}</Button>
    )
})

export default SubmitButton

// export default function SubmitButton({active, loading, onClick, text}) {
//     const isActive = active && !loading
//     return (
//         <Button disabled={!isActive} onClick={onClick}>{text}</Button>
//     )
// }