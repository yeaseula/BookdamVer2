"use client"

import styled from "styled-components"
import InterestLists from "@/app/components/form/interests/InterestList"
import { useForm, SubmitHandler, FormProvider, useWatch } from "react-hook-form"
import { useState } from "react"
import createClient from "@/utils/supabase/client"
import { useToastStore } from "@/app/lib/useToastStore"
import { useRouter } from "next/navigation"
import { useAuthStore, DataState, Profiles } from "@/app/lib/userfetch"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import { SubWrap } from "@/app/components/common/container.styled"
import SubmitButton from "@/app/components/common/SubmitButton"

const Tags = styled.span`
    display: inline-block;
    margin-left: 5px;
    border-radius: 50px;
    border: 1px solid var(--color_medium_gray);
    font-size: 1.2rem;
    padding: 2px 12px 0;
    margin-bottom: 1px;
`

interface InterestsValid {
    interests: []
}

export default function EditInterest() {
    const { session, profile } = useAuthStore()
    const [loading,setLoading] = useState<boolean>(false);
    const supabase = createClient()
    const setToast = useToastStore((state)=>state.setToast)
    const setProfile = useAuthStore((state)=>state.setProfile)
    const router = useRouter()
    let debounce:boolean = false

    const methods = useForm<InterestsValid>({
        mode: "onChange",
        defaultValues: {
            interests: [],
        },
    })

    const {
        control,
        formState: { isValid, isSubmitting },
        handleSubmit,
    } = methods

    const interests = useWatch({ control, name: "interests"})
    let interestsValid = interests?.length > 0

    const onSubmit: SubmitHandler<InterestsValid> = (data) => handleInterestSubmit(data)

    const handleInterestSubmit = async(interestdata:InterestsValid) => {
        if(debounce || loading || !session) return

        debounce = true
        setLoading(true)

        try {
            const { error } = await supabase
                .from("profiles")
                .update({ interests: interestdata.interests })
                .eq("id", session.user.id);

            if (error) throw new Error('관심사 변경에 실패했습니다.')
            const newProfile:DataState<Profiles> = {
                data: {
                    ...profile.data,
                    interests: interestdata.interests
                },
                error: error,
                ok: !error
            }

            router.push('/profileedit')

            // zustand 상태 업데이트
            setProfile(newProfile);
            setToast('관심사 수정이 완료되었습니다','success')

        } catch (err) {
            console.error(err);
            const errorMessage = err instanceof Error
                ? err.message
                : '관심사 수정 중 오류가 발생했습니다'
            setToast(errorMessage, "error")
            debounce = false
            setLoading(false)
        }
    }

    return(
        <SubWrap>
            {!profile &&
                <>
                <Skeleton width={150} height={22}/>
                <div className="mt-[10px]">
                    <Skeleton height={31}/>
                </div>
                <div className="mb-6">
                    <Skeleton height={31}/>
                </div>
                <div className="mb-6">
                    <Skeleton height={31}/>
                </div>
                <div className="mb-6">
                    <Skeleton height={31}/>
                </div>
                <div className="mb-6">
                    <Skeleton height={31}/>
                </div>
                <div className="mb-6">
                    <Skeleton height={31}/>
                </div>
                <div className="mb-6">
                    <Skeleton height={31}/>
                </div>
                <div className="mb-6">
                    <Skeleton height={31}/>
                </div>
                </>
            }
            {profile &&
            <>
            <form onSubmit={handleSubmit(onSubmit)}>
                {profile.data?.interests.length !== 0 &&
                <p className="text-2xl font-medium">현재 관심사는
                    {profile.data?.interests.map((inter)=>(
                    <Tags key={inter}>{inter}</Tags>
                    ))}
                </p>
                }
                <FormProvider {...methods}>
                    <InterestLists />
                </FormProvider>
                <div className="h-[40px] mt-[35px]">
                <SubmitButton disabled={!isValid || !interestsValid || isSubmitting} type="submit">관심사 수정</SubmitButton>
                </div>
            </form>
            </>
            }
        </SubWrap>
    )
}