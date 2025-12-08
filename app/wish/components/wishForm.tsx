"use client"
import styled from "styled-components"
import AddButton from "./Add"
import InputFields from "../../components/form/input"
import { useState } from "react"
import createClient from "@/utils/supabase/client"
import { DataState, Wish, useAuthStore } from "@/app/lib/userfetch"
import { useToastStore } from "@/app/lib/useToastStore"

const FormWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
`

export default function WishForm({session}) {
    const supabase = createClient()
    const setToast = useToastStore((state)=>state.setToast)
    const [title, setTitle] = useState<string>("")
    const [author, setAuthor] = useState<string>("")
    const [price, setPrice] = useState<number | null>(null)
    const [isWorking,setIsWorking] = useState<boolean>(false)

    const userId = session.user.id

    const handleSubmit = async () => {

        if(isWorking) return
        setIsWorking(true)

        if (!title || !author|| price == null) {
            alert("모든 필드를 채워주세요.")
            return
        }
        try {
            const { data, error } = await supabase.from("wish").insert([
                {
                    user_id: userId,
                    title,
                    author,
                    price,
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
                //필드 초기화
                setTitle("")
                setAuthor("")
                setPrice(null)
            }
        } catch (error) {
            const errorMessage = error instanceof Error
                ? error.message
                : '업로드 중 오류가 발생했습니다'
            setToast(errorMessage, "error")
        } finally {
            setIsWorking(false)
        }
    }

    return (
        <FormWrap>
            <InputFields
                type="text"
                placeholder="책 제목"
                name="booktitle"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTitle(e.target.value)
                }
            />
            <InputFields
                type="text"
                placeholder="작가명"
                name="author"
                width="calc((100% - 47px) / 2)"
                value={author}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAuthor(e.target.value)
                }
            />
            <InputFields
                type="text"
                placeholder="가격"
                name="price"
                width="calc((100% - 47px) / 2)"
                value={price ?? ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
                    const value = e.target.value;
                    if (value === '') {
                        setPrice(null);
                        return;
                    }
                    if (/^\d+$/.test(value)) {
                        setPrice(Number(value));
                    } else {
                        setToast("숫자만 입력 가능합니다!","info")
                    }
                }}
            />
            <AddButton
                arialabel="읽고싶은 책 추가 버튼"
                type="button"
                title={title}
                author={author}
                price={price}
                onClick={handleSubmit}
            />
        </FormWrap>
    )
}
