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
    email: string;
    password: string;
    onClick: ()=>void;
}

export default function LoginButton({email,password,onClick}:ButtonProps) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const isValid = emailRegex.test(email) &&
                    passwordRegex.test(password)

    return (
        <Button disabled={!isValid} onClick={onClick}>로그인</Button>
    )
}