"use client"
import styled from "styled-components"
import InputFields from "@/app/components/form/input"
import AddButton from "./Add"
import { useState } from "react"
import { useToastStore } from "@/app/lib/useToastStore"
import createClient from "@/utils/supabase/client"
import { Books } from "@/app/lib/userfetch"
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

            const newBooks: Books = data?.[0]
            if(!newBooks) return;

            //zustand 전역 업로드
            useAuthStore.getState().addData<Books>('books',newBooks)

            setToast("읽고있는 책 업로드 성공!","success")
            //필드 초기화
            setTitle("")
            setPage(null)
            setReadingPage(null)
        } catch (error) {
            setToast("업로드 실패했습니다.","error")
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
                placeholder="총 페이지"
                name="bookpage"
                width="calc((100% - 47px) / 2)"
                value={page ?? ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
                    const value = e.target.value;
                    if (value === '') {
                        setPage(null);
                        return;
                    }
                    if (/^\d+$/.test(value)) {
                        setPage(Number(value));
                    } else {
                        setToast("숫자만 입력 가능합니다!","info")
                    }
                }}
            />
            <InputFields
                type="text"
                placeholder="읽은 페이지"
                name="bookpage-read"
                width="calc((100% - 47px) / 2)"
                value={radingPage ?? ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
                    const value = e.target.value;
                    if (value === '') {
                        setReadingPage(null);
                        return;
                    }
                    if (/^\d+$/.test(value)) {
                        setReadingPage(Number(value));
                    } else {
                        setToast("숫자만 입력 가능합니다!","info")
                    }
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