"use client"
import styled from "styled-components"
import InputFields from "../../components/form/input"
import TextArea from "../../components/form/textarea"
import createClient from "@/utils/supabase/client"
import { DataState ,Memo, useAuthStore } from "@/app/lib/userfetch"
import { useToastStore } from "@/app/lib/useToastStore"
import { useForm, SubmitHandler } from "react-hook-form"
import { MeMoFormType } from "@/app/lib/dataTypes"
import SubmitButton from "@/app/components/common/SubmitButton"

const FormWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
`

export default function MemoForm({session}) {
    const supabase = createClient()
    const setToast = useToastStore((state)=>state.setToast)
    const userId = session.user.id

    const {
        register,
        formState: { isValid, isSubmitting },
        reset,
        handleSubmit
    } = useForm<MeMoFormType>({
        mode: "onChange",
    })

    const onSubmit: SubmitHandler<MeMoFormType> = (data) => handleMemoSubmit(data)

    const handleMemoSubmit = async (memodata:MeMoFormType) => {
        try {
            if(!userId) throw new Error("세션이 없습니다.")
            else if(!memodata.booktitle) throw new Error("제목을 입력해주세요.")
            else if(!memodata.page) throw new Error("페이지를 입력해주세요.")
            else if(!memodata.content) throw new Error("내용을 입력해주세요.")

            const { data, error } = await supabase.from("memo").insert([
                {
                    user_id: userId,
                    title: memodata.booktitle,
                    page: memodata.page,
                    content: memodata.content,
                },
            ]).select();


            const newMemo:DataState<Memo> = {
                data: data?.[0],
                error: error,
                ok: !error
            }

            if(!newMemo.data || !newMemo.ok) {
                //실패
                setToast("나만의 구절 업로드 실패!","error")
                throw new Error
            } else {
                useAuthStore.getState().addData('memo',newMemo)
                setToast("나만의 구절 업로드 성공!","success")
                reset()
            }

        } catch (error) {
            const errorMessage = error instanceof Error
                ? error.message
                : '업로드 중 오류가 발생했습니다'
            setToast(errorMessage, "error")
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <FormWrap>
            <InputFields
            width="calc((100% - 47px) / 2)"
            placeholder="책 제목"
            {...register("booktitle",{
                required: true,
            })}
            />
            <InputFields
            type="number"
            inputMode="numeric"
            width="calc((100% - 47px) / 2)"
            placeholder="페이지(숫자만 입력)"
            {...register("page",{
                required: true,
            })}
            />
            <div className="w-[37px] h-[37px]">
                <SubmitButton disabled={!isValid || isSubmitting} type="submit">+</SubmitButton>
            </div>
            <TextArea
                name="memo-content"
                placeholder="내용을 입력하세요."
                height={90}
                {...register("content",{
                    required: true,
                })}
            />
        </FormWrap>
        {!isValid && <p className="text-xl mt-3.5 text-cyan-600">모든 내용을 입력해주세요!</p>}
        </form>
    )
}
