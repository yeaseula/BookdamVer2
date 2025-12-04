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
    type: 'email' | 'pass' | 'nickname' | 'interest';
    vlaue: string;
    vlaueCheck?: string;
    loading: boolean;
    passCheck?: boolean;
    onClick: ()=>void;
}

interface InterestButtonProps {
    loading: boolean;
    value: string[];
    onClick: ()=>void;
}

export default function EditButton({type,vlaue,vlaueCheck,loading,passCheck,onClick}:ButtonProps) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    let isValid:boolean

    if(type == 'email') {
        isValid = emailRegex.test(vlaue) && !loading
    }
    if(type == 'pass') {
        isValid = passwordRegex.test(vlaue) &&
        passwordRegex.test(vlaueCheck) &&
        passCheck &&
        !loading
    }
    if(type== 'nickname') {
        isValid = !loading && vlaue.length >= 2
    }

    return (
        <Button disabled={!isValid} onClick={onClick}>수정</Button>
    )
}

export function EditButtonInterest({ value, loading, onClick}:InterestButtonProps) {

    const isValid = !loading && value.length > 0

    return (
        <Button disabled={!isValid} onClick={onClick}>수정</Button>
    )
}