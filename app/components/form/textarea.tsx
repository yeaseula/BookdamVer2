"use client"
import styled from "styled-components"
import { UseFormRegister, RegisterOptions } from "react-hook-form";
import { TextareaHTMLAttributes } from "react";

const Wrap = styled.div<{$width:string | number | undefined}>`
    flex: 1;
    width: ${(props)=>props.$width || '100%'};
`
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
const Label = styled.label`
    font-size: 12px; color: #616161
`

interface textareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>,'height'> {
    height: number;
    name: string;
    label: string;
    error?: string;
    required?: boolean;
    register: UseFormRegister<any>;
    rules?: RegisterOptions;
    width?: string | number;
    show?: boolean;
}

const Textarea = ({
    width,height,name,label,error,required,register,rules,placeholder,show,...rest
}:textareaProps
)=>{
    const id = name
    return (
        <Wrap $width={width}>
            <Label htmlFor={id} className={`${show && 'sr-only'}`}>{label} {required && <b className="font-bold text-red-700"> *</b>}</Label>
            <TextareaStyle
            id={id}
            aria-required={required}
            aria-invalid={!!error}
            placeholder={placeholder}
            $height={height}
            aria-describedby={error ? `${name}-error` : undefined}
            {...register(name, rules)}
            {...rest} />
        </Wrap>
    )
}

export default Textarea