"use client"
import InputFields from "@/app/components/form/input"
import { useState } from "react"
import { DataState, Profiles } from "@/app/lib/userfetch"
import createClient from "@/utils/supabase/client"
import { useToastStore } from "@/app/lib/useToastStore"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/app/lib/userfetch"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import { SubWrap } from "@/app/components/common/container.styled"
import { LabelStyle } from "@/app/components/form/Label"
import { useForm, SubmitHandler } from "react-hook-form"
import SubmitButton from "@/app/components/common/SubmitButton"

interface NicknameValid {
    nickname: string;
}

export default function EditNickname() {
    const [loading,setLoading] = useState<boolean>(false);
    const supabase = createClient()
    const setToast = useToastStore((state)=>state.setToast)
    const setProfile = useAuthStore((state)=>state.setProfile)
    const { session, profile } = useAuthStore()
    const router = useRouter()

    const {
        register,
        formState: { errors, isValid, isSubmitting },
        handleSubmit
    } = useForm<NicknameValid>({
        mode: "onChange",
    })

    const onSubmit: SubmitHandler<NicknameValid> = (data) => handleNicknameSubmit(data)


    const handleNicknameSubmit = async(nicknamedata:NicknameValid) => {
        if(loading || !session) return

        setLoading(true)

        try {
            const { data, error } = await supabase
                .from("profiles")
                .update({ username: nicknamedata.nickname })
                .eq("id", session.user.id)

            if(error) {
                throw new Error('닉네임 수정에 실패했습니다')
            }

            const newProfile:DataState<Profiles> = {
                data: {
                    ...profile.data,
                    username:nicknamedata.nickname
                },
                error: error,
                ok: !error
            }

            router.push('/profileedit')

            // zustand 상태 업데이트
            setProfile(newProfile);
            setToast('닉네임 변경이 완료되었습니다','success')

        } catch (err) {
            console.error(err);
            const errorMessage = err instanceof Error
                ? err.message
                : '닉네임 수정 중 오류가 발생했습니다'
            setToast(errorMessage, "error")
            setLoading(false)
        }
    }

    return(
        <SubWrap>
            {session && profile ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                <LabelStyle>
                    <InputFields
                    placeholder="닉네임을 입력해주세요 (2글자 이상)"
                    label="닉네임"
                    name="nickname"
                    required
                    error={errors.nickname?.message}
                    register={register}
                    rules={{
                        required: true,
                        minLength: {
                            value: 2,
                            message: '닉네임은 두 글자 이상 입력해주세요.'
                        },
                    }}
                    />
                    {errors.nickname &&
                    <p className="text-red-600 mt-3 text-xl">{errors.nickname.message}</p>
                    }
                </LabelStyle>
                <div className="h-[40px] mt-[35px]">
                <SubmitButton disabled={!isValid || isSubmitting} type="submit">닉네임 변경</SubmitButton>
                </div>
                </form>
            ) : (
                <>
                <Skeleton height={14} />
                <Skeleton height={37} />
                <Skeleton height={40} style={{ marginTop: '35px' }} />
                </>
            )}

        </SubWrap>
    )
}