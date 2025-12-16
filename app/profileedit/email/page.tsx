"use client"

import InputFields from "@/app/components/form/input"
import { SubWrap } from "@/app/components/common/container.styled"
import { useForm, SubmitHandler } from "react-hook-form"
import { LabelStyle } from "@/app/components/form/Label"
import SubmitButton from "@/app/components/common/SubmitButton"

interface EmailValid {
    email: string;
}

export default function EditEmail() {
    const {
        register,
        formState: { errors, isValid, isSubmitting },
        handleSubmit
    } = useForm<EmailValid>({
        mode: "onChange",
    })

    const onSubmit: SubmitHandler<EmailValid> = () => handleEmailChangeSubmit()

    const handleEmailChangeSubmit = async() => {
        alert('supabase 인증 강화로 인해 \n 실제 이메일 주소로 인증 메일이 전송됩니다. \n 포트폴리오용 서비스이기에 해당 기능은 작업하지 않습니다.')
    }

    return(
        <SubWrap>
            <form onSubmit={handleSubmit(onSubmit)}>
                <LabelStyle>
                    <InputFields
                    label="이메일"
                    name="email"
                    type="email"
                    required
                    error={errors.email?.message}
                    register={register}
                    placeholder={"이메일을 입력해주세요"}
                    rules={{
                        required: true,
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: '이메일 형식을 확인해주세요. ex)book@naver.com'
                        },
                    }}
                    />
                    {errors.email &&
                        <p className="text-red-600 mt-3 text-xl">{errors.email.message}</p>
                    }
                </LabelStyle>
                <div className="h-[40px] mt-[35px]">
                <SubmitButton disabled={!isValid || isSubmitting} type="submit">이메일 변경</SubmitButton>
                </div>
            </form>
        </SubWrap>
    )
}