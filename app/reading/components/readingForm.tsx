"use client"
import styled from "styled-components"
import InputFields from "@/app/components/form/input"
import AddButton from "./Add"
import { useState } from "react"
import { useToastStore } from "@/app/lib/useToastStore"
import createClient from "@/utils/supabase/client"
import { DataState, Books } from "@/app/lib/userfetch"
import { useAuthStore } from "@/app/lib/userfetch"
const FormWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
`

export default function ReadingForm({ session }) {

    const [title,setTitle] = useState<string>('')
    const [page, setPage] = useState<number | null>(null)
    const [radingPage, setReadingPage] = useState<number | null>(null)
    const supabase = createClient()
    const setToast = useToastStore((state)=>state.setToast)

    const userId = session.user.id

    const handleSubmit = async() => {
        try {
            const { data, error } = await supabase.from("books").insert([
                {
                    user_id: userId,
                    title:title,
                    total_pages: page,
                    current_page:radingPage,
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
                setTitle("")
                setPage(null)
                setReadingPage(null)
            }

        } catch (error) {
            const errorMessage = error instanceof Error
                ? error.message
                : '업로드 중 오류가 발생했습니다'
            setToast(errorMessage, "error")
        }
    }

    const handlePageNumeric = () => {
        if(!page || !radingPage) return

        if(page < radingPage) {
            setToast('총 페이지보다 많이 읽을 수 없습니다.','info')
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
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="총 페이지(숫자만 입력)"
                name="bookpage"
                width="calc((100% - 47px) / 2)"
                value={page ?? ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value.replace(/\D/g, '');
                    setPage(value ? Number(value) : null);
                    handlePageNumeric()
                }}
            />
            <InputFields
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="읽은 페이지(숫자만 입력)"
                name="bookpage-read"
                width="calc((100% - 47px) / 2)"
                value={radingPage ?? ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value.replace(/\D/g, '');
                    setReadingPage(value ? Number(value) : null);
                    handlePageNumeric()
                }}
            />
            <AddButton
            arialabel="읽고있는 책 추가 버튼"
            type="button"
            title={title}
            page={page}
            readPage={radingPage}
            onClick={handleSubmit} />
        </FormWrap>
    )
}