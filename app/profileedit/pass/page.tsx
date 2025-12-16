"use client"

import InputFields from "@/app/components/form/input"
import { useState } from "react"
import createClient from "@/utils/supabase/client"
import { useToastStore } from "@/app/lib/useToastStore"
import { useRouter } from "next/navigation"
import SpinnerArea from "@/app/components/spinner/SpinnerArea"
import { SubWrap } from "@/app/components/common/container.styled"
import { LabelStyle } from "@/app/components/form/Label"
import { useForm, SubmitHandler } from "react-hook-form"
import { PASS_REGEX } from "@/app/lib/Valid"
import SubmitButton from "@/app/components/common/SubmitButton"
import { useAuthStore } from "@/app/lib/userfetch"

interface PassValid {
    password: string;
    passwordCheck: string;
}

export default function EditPass() {

    const [loading,setLoading] = useState<boolean>(false);
    const { session } = useAuthStore()
    const supabase = createClient()
    const setToast = useToastStore((state)=>state.setToast)
    const router = useRouter()

    const {
        register, trigger, getValues,
        formState: { errors, isValid, isSubmitting },
        handleSubmit
    } = useForm<PassValid>({
        mode: "onChange",
    })

    const onSubmit: SubmitHandler<PassValid> = (data) => handlePassSubmit(data)

    const handlePassSubmit = async(passdata:PassValid) => {
        if(loading || !session) false
        setLoading(true)

        try {
            const { data, error } = await supabase.auth.updateUser({
                password: passdata.password,
            });

            if (error) {
                if(error.code === 'weak_password') {
                    setToast('비밀번호는 8자 이상, 문자+숫자 조합으로 설정해주세요.', 'error')
                    throw new Error('비밀번호는 8자 이상, 문자+숫자 조합으로 설정해주세요.')
                }
            }

            setToast('비밀번호가 변경되었습니다. 잠시 후 로그인 페이지로 이동합니다.','success')

            await new Promise(resolve => setTimeout(resolve, 3000))

            const { error:logoutError } = await supabase.auth.signOut()

            if(logoutError) throw new Error('비밀번호 변경은 완료됐지만 자동 로그아웃에 실패했습니다.')

            router.push('/login')

            return
        }
        catch (err) {
            console.error(err);
            const errorMessage = err instanceof Error
                ? err.message
                : '비밀번호 수정 중 오류가 발생했습니다'
            setToast(errorMessage, "error")
            setLoading(false)
        }
    }

    return(
        <SubWrap>
            {loading && <SpinnerArea text="비밀번호 변경 처리중..." />}
            <form onSubmit={handleSubmit(onSubmit)}>
            <LabelStyle>
                <InputFields
                label="비밀번호"
                type={"password"}
                name={"password"}
                required
                error={errors.password?.message}
                placeholder={"비밀번호를 입력해주세요"}
                register={register}
                rules={{
                    required: true,
                    pattern: {
                        value: PASS_REGEX,
                        message: '비밀번호는 문자+숫자 8자리 이상입니다.'
                    },
                    onChange:() => {
                        trigger('passwordCheck')
                    }
                }}
                />
                {errors.password &&
                <p className="text-red-600 mt-3 text-xl">{errors.password.message}</p>
                }
            </LabelStyle>
            <LabelStyle style={{ marginTop: '10px' }}>
                <InputFields
                    type="password"
                    placeholder={"비밀번호를 한번 더 입력해주세요"}
                    label="비밀번호 확인"
                    name="passwordCheck"
                    required
                    error={errors.passwordCheck?.message}
                    register={register}
                    rules={{
                        required: true,
                        validate: (value) => value === getValues('password') || '비밀번호가 일치하지 않습니다.'
                    }}
                />
                {errors.passwordCheck &&
                <p className="text-red-600 mt-3 text-xl">{errors.passwordCheck.message}</p>
                }
            </LabelStyle>
            <div className="h-[40px] mt-[35px]">
            <SubmitButton disabled={!isValid || isSubmitting} type="submit">비밀번호 변경</SubmitButton>
            </div>
            </form>
        </SubWrap>
    )
}