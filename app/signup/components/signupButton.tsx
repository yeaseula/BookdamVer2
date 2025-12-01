"use client"
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
    button: boolean;
    loading: boolean;
    interest: string[];
    onClick: ()=>void;
}

export default function SignUpButton({button,loading,onClick}:ButtonProps) {
    const isValid = button && !loading

    return (
        <Button disabled={!isValid} onClick={onClick}>회원가입</Button>
    )
}