import styled from 'styled-components'
import interest from '../../../data/category.json'
import InterestGroup from './InterestGroup'
import { useFormContext, useWatch } from "react-hook-form"
import { SignFormValid } from '@/app/lib/Valid'
import { useEffect } from 'react'

const Legend = styled.legend`
    width: 100%;
    display: block;
    > span { font-size: 12px; color: #616161 }
`

export default function InterestLists() {
    const {
        control,
        setError,
        clearErrors,
        formState: { errors },
    } = useFormContext<SignFormValid>()

    const interests = useWatch({
        control,
        name: 'interests',
    })

    useEffect(() => {
        if (!interests || interests.length === 0) {
            setError('interests', {
                type: 'validate',
                message: '최소 하나 이상의 관심사를 선택해주세요.',
            })
        } else {
            clearErrors('interests')
        }
    }, [interests, setError, clearErrors])

    return (
        <div className='mt-3'>
            <fieldset aria-describedby="interests-error">
                <Legend><span>관심 카테고리 <b className="text-red-800">*</b></span></Legend>
                {errors.interests &&
                    <p className="text-red-600 mt-3 text-xl"
                    id='interests-error'
                    role='alert'>
                        {errors.interests.message}
                    </p>
                }
                {interest.map((topic)=>(
                    <InterestGroup key={topic.value} topic={topic}/>
                ))}
            </fieldset>
        </div>
    )
}