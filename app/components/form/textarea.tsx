"use client"
import styled from "styled-components"
import { memo,forwardRef,TextareaHTMLAttributes } from "react";

const TextareaStyle = styled.textarea<{$height: number}>`
    width: 100%;
    max-width: 100%;
    min-height: 90px;
    height: ${(props)=>props.$height || 90}px;
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    padding: 10px 9px;
    font-size: 1.4rem;
    outline: 0;
    box-shadow: 0 3px 14px rgba(0, 0, 0, .15);

    &::placeholder {
        font-size: 1.4rem;
        color: #bdbdbd;
    }

    &:focus, &focus-visible {
        border: 2px solid var(--point-color);
    }
`
interface textareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>,'height'> {
    name?:string;
    placeholder: string;
    height: number;
    value?: string;
    onChange:(e:React.ChangeEvent<HTMLTextAreaElement>)=>void;
}

const Textarea = memo(
    forwardRef<HTMLTextAreaElement,textareaProps>((
        {name,placeholder,height,value,onChange,...rest},ref
    )=>{
        return (
            <TextareaStyle
            ref={ref}
            name={name}
            placeholder={placeholder}
            value={value}
            $height={height}
            onChange={onChange}
            {...rest} />
        )
    })
)

export default Textarea