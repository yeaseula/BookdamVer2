import React from "react"
import styled from "styled-components"
import { useFormContext, useWatch } from "react-hook-form"
import { SignFormValid } from "@/app/lib/Valid"

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

const InterestCheckbox = ({value, id}) => {
    const { register, control } = useFormContext<SignFormValid>()
    const interests = useWatch({
        control,
        name: 'interests',
    })
    return (
        <Label htmlFor={id} $ischecking={interests?.includes(value) ? true : false}>
            <Check type="checkbox"
            value={value}
            id={id}
            {...register("interests")}
            />{value}
        </Label>
    )
}

export const MemoInterestsCheckbox = React.memo(InterestCheckbox)