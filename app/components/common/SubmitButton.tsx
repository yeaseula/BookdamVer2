"use client"
import React, { memo } from "react"
import styled from "styled-components"

const Button = styled.button<{disabled:boolean}>`
    width: 100%;
    height: 100%;
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
    disabled: boolean;
    active?: boolean;
    loading?: boolean;
    onClick?: () => void
}

const SubmitButton = memo(({
    type,
    active, loading, onClick,
    disabled,
    children
}:ButtonProps)=>{
    const isActive = active && !loading
    return (
        <Button type={type} disabled={disabled} onClick={onClick}>{children}</Button>
    )
})

export default SubmitButton