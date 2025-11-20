"use client"
import styled from "styled-components"

const Button = styled.button<{disabled:boolean}>`
    width: 100%;
    height: 40px;
    margin-top: 30px;
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
    category: string;
    title: string;
    author: string;
    startDate: string;
    endDate: string;
    oneLine: string;
    review: string;
    point: number;
    onClick: ()=>void;
}

export default function WriteButton({...props}:ButtonProps) {
    const isValid = props.category && props.title && props.author &&
    props.startDate && props.endDate && props.oneLine && props.review

    return (
        <Button disabled={!isValid} onClick={props.onClick}>등록</Button>
    )
}