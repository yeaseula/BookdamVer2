"use client"
import styled from "styled-components"
import AddButton from "./Add"
import InputFields from "../../components/form/input"
import TextArea from "../../components/form/textarea"
import { useEffect, useState } from "react"
import createClient from "@/utils/supabase/client"
import { Memo, useAuthStore } from "@/app/lib/userfetch"
import { useToastStore } from "@/app/lib/useToastStore"

const FormWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
`

export default function MemoForm({session}) {
    const supabase = createClient()
    const setToast = useToastStore((state)=>state.setToast)
    const [title, setTitle] = useState<string>("")
    const [page, setPage] = useState<number | null>(null)
    const [content, setContent] = useState<string>("")
    const [loading, setIsLoading] = useState<boolean>(false)
    let debounce:boolean = false;
    const userId = session.user.id

    const handleSubmit = async () => {
        if(loading) return //버튼 로딩
        setIsLoading(true)

        if(debounce) return
        debounce = true

        try {
            if(!userId) throw new Error("세션이 없습니다.")
            else if(!title) throw new Error("제목을 입력해주세요.")
            else if(!page) throw new Error("페이지를 입력해주세요.")
            else if(!content) throw new Error("내용을 입력해주세요.")

            const { data, error } = await supabase.from("memo").insert([
                {
                    user_id: userId,
                    title,
                    page,
                    content,
                },
            ]).select();

            if (error) {
                throw new Error('나만의 구절 추가에 실패했습니다.')
            }

            const newMemo: Memo = data?.[0]
            if(!newMemo) return;

            //zustand 전역 업로드
            useAuthStore.getState().addData<Memo>('memo',newMemo)

            setToast("나만의 구절 업로드 성공!","success")

            //필드 초기화
            setTitle("")
            setPage(null)
            setContent("")
        } catch (error) {
            const errorMessage = error instanceof Error
                ? error.message
                : '업로드 중 오류가 발생했습니다'
            setToast(errorMessage, "error")
        } finally {
            debounce = false
            setIsLoading(false)
        }
    }

    return (
        <FormWrap>
            <InputFields
                type="text"
                placeholder="책 제목"
                name="booktitle"
                width="calc((100% - 47px) / 2)"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTitle(e.target.value)
                }
            />
            <InputFields
                type="text"
                placeholder="페이지"
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
                        setToast("숫자만 입력 가능합니다!","warning")
                    }
                }}
            />
            <AddButton
                arialabel="기억에 남는 구절 추가 버튼"
                type="button"
                title={title}
                page={page}
                debounce={debounce}
                loading={loading}
                content={content}
                onClick={handleSubmit}
            />
            <TextArea
                name="memo-content"
                placeholder="100자 이내로 입력하세요."
                height={90}
                value={content}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setContent(e.target.value)
                }
            />
        </FormWrap>
    )
}
