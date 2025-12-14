import { useFormContext } from "react-hook-form"
import styled from "styled-components"
import { useWatch } from "react-hook-form"
import React from "react"
import { useRef } from "react"

const Check = styled.input`
    appearance: none;
`
const Label = styled.label<{$ischecking:boolean}>`
    font-size: 1.3rem;
    background: ${(props)=>props.$ischecking ? 'var(--sub_color)' : 'var(--background-color-light)'};
    color: ${(props)=>props.$ischecking ? '#fff' : 'initial'};
    display: inline-block;
    padding: 2px 16px 1px;
    border-radius: 100px;
    border: 1px solid var(--color_medium_gray);
    cursor: pointer;
`

interface IFormInput {
    email: string
    password: string
    passwordCheck: string
    nickname: string
    interest: string[]
    checkbox: boolean
    interests: string[]
}



const InterestCheckbox = ({value, id}) => {




    const { register, control } = useFormContext<IFormInput>()
    const interests = useWatch({
        control,
        name: 'interests',
    })
    return (
        <Label htmlFor={id} $ischecking={interests?.includes(value) ? true : false}>
            <Check type="checkbox"
            value={value}
            id={id}
            {...register("interests",{
                required: true,
                validate: (v) => v.length > 0 || '최소 하나 선택',
            })}
            />{value}
        </Label>
    )
}

export const MemoInterestsCheckbox = React.memo(InterestCheckbox)