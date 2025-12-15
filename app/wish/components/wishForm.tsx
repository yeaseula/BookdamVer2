"use client"
import styled from "styled-components"
import InputFields from "../../components/form/input"
import createClient from "@/utils/supabase/client"
import { DataState, Wish, useAuthStore } from "@/app/lib/userfetch"
import { useToastStore } from "@/app/lib/useToastStore"
import { useForm, SubmitHandler } from "react-hook-form"
import { WishFormType } from "@/app/lib/dataTypes"
import SubmitButton from "@/app/components/common/SubmitButton"

const FormWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
`

export default function WishForm({session}) {
    const supabase = createClient()
    const setToast = useToastStore((state)=>state.setToast)

    const {
        register,
        formState: { isValid, isSubmitting },
        reset,
        handleSubmit
    } = useForm<WishFormType>({
        mode: "onChange",
    })

    const onSubmit: SubmitHandler<WishFormType> = (data) => handleWishSubmit(data)

    const userId = session.user.id

    const handleWishSubmit = async (wishdate:WishFormType) => {
        try {

            if(!userId) throw new Error("세션이 없습니다.")
            else if(!wishdate.booktitle) throw new Error("제목을 입력해주세요.")
            else if(!wishdate.price) throw new Error("가격을 입력해주세요.")
            else if(!wishdate.author) throw new Error("작가명을 입력해주세요.")

            const { data, error } = await supabase.from("wish").insert([
                {
                    user_id: userId,
                    title: wishdate.booktitle,
                    author: wishdate.author,
                    price: wishdate.price,
                },
            ]).select();

            if (error) throw error;

            const newWish:DataState<Wish> = {
                data: data?.[0],
                error: error,
                ok: !error
            }
            if(!newWish) return;

            if(!newWish.ok || newWish.error) {
                throw new Error
            } else {
                useAuthStore.getState().addData('wish',newWish)
                setToast("읽고싶은 책 업로드 성공!","success")
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
                width="calc((100% - 47px) / 2)"
                placeholder="작가명"
                {...register("author",{
                    required: true,
                })}
                />
                <InputFields
                type="number"
                inputMode="numeric"
                width="calc((100% - 47px) / 2)"
                placeholder="가격(숫자만 입력)"
                {...register("price",{
                    required: true,
                })}
                />
                <div className="w-[37px] h-[37px]">
                    <SubmitButton disabled={!isValid || isSubmitting} type="submit">+</SubmitButton>
                </div>
            </FormWrap>
        </form>
    )
}
