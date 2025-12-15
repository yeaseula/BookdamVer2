"use client"
import styled from "styled-components"
import InputFields from "@/app/components/form/input"
import { useToastStore } from "@/app/lib/useToastStore"
import createClient from "@/utils/supabase/client"
import { DataState, Books } from "@/app/lib/userfetch"
import { useAuthStore } from "@/app/lib/userfetch"
import { useForm, SubmitHandler } from "react-hook-form"
import { ReadingFormType } from "@/app/lib/dataTypes"
import SubmitButton from "@/app/components/common/SubmitButton"

const FormWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
`

export default function ReadingForm({ session }) {
    const supabase = createClient()
    const setToast = useToastStore((state)=>state.setToast)

    const {
        register,
        formState: { errors, isValid, isSubmitting },
        reset,
        getValues,trigger,
        handleSubmit
    } = useForm<ReadingFormType>({
        mode: "onChange",
    })

    const onSubmit: SubmitHandler<ReadingFormType> = (data) => handleReadSubmit(data)

    const userId = session.user.id

    const handleReadSubmit = async(readdata:ReadingFormType) => {

        try {
            if(!userId) throw new Error("세션이 없습니다.")
            else if(!readdata.booktitle) throw new Error("제목을 입력해주세요.")
            else if(!readdata.totalpage) throw new Error("총 페이지를 입력해주세요.")
            else if(!readdata.readedpage) throw new Error("읽은 페이지를 입력해주세요.")

            const { data, error } = await supabase.from("books").insert([
                {
                    user_id: userId,
                    title: readdata.booktitle,
                    total_pages: readdata.totalpage,
                    current_page: readdata.readedpage,
                },
            ]).select();

            if (error) throw error;

            const newBooks: DataState<Books> = {
                data: data?.[0],
                error: error,
                ok: !error
            }

            if(!newBooks.ok || newBooks.error) {
                throw new Error
            } else {
                //zustand 전역 업로드
                useAuthStore.getState().addData('books',newBooks)
                setToast("읽고있는 책 업로드 성공!","success")
                //필드 초기화
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
                placeholder="책 제목"
                {...register("booktitle",{
                    required: true,
                })}
                />
                <InputFields
                type="number"
                inputMode="numeric"
                width="calc((100% - 47px) / 2)"
                placeholder="총 페이지(숫자만 입력)"
                {...register("totalpage",{
                    required: true,
                    onChange:() => {
                        trigger('readedpage')
                    }
                })}
                />
                <InputFields
                type="number"
                inputMode="numeric"
                width="calc((100% - 47px) / 2)"
                placeholder="읽은 페이지(숫자만 입력)"
                {...register("readedpage",{
                    required: true,
                    validate: (value) => {
                        return value < getValues('totalpage') ? true : '총 페이지보다 읽은 페이지 수가 많아요!'
                    }
                })}
                />
                <div className="w-[37px] h-[37px]">
                    <SubmitButton disabled={!isValid || isSubmitting} type="submit">+</SubmitButton>
                </div>
            </FormWrap>
            {errors.readedpage && <p className="text-xl mt-3.5 text-cyan-600">{errors.readedpage.message}</p>}
            {!isValid && <p className="text-xl mt-3.5 text-cyan-600">모든 내용을 입력해주세요!</p>}
        </form>
    )
}