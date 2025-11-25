"use client"
import styled from "styled-components"
import { ButtonStyle } from "@/app/components/form/Button.styled";


interface ButtonProps {
    type: "button" | "submit" | "reset";
    category: string;
    title: string;
    author: string;
    startDate: string;
    endDate: string;
    oneLine: string;
    review: string;
    point: number;
    loading: boolean;
    onClick: ()=>void;
}

export default function WriteButton({...props}:ButtonProps) {
    const isValid = props.category && props.title && props.author &&
    props.startDate && props.endDate && props.oneLine && props.review && !props.loading

    return (
        <ButtonStyle
        type={props.type}
        disabled={!isValid}
        $height={40}
        onClick={props.onClick}>등록</ButtonStyle>
    )
}