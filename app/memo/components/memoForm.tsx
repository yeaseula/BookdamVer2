"use client"
import styled from "styled-components"
import AddButton from "./Add"
import InputFields from "../../components/form/input"
import TextArea from "../../components/form/textarea"
import { useState } from "react"
import { useAuthStore } from "../../lib/userfetch"
import createClient from "@/utils/supabase/client"

const FormWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
`

export default function MemoForm({session}) {
    const supabase = createClient()

    const [title, setTitle] = useState<string>("")
    const [page, setPage] = useState<number | null>(null)
    const [content, setContent] = useState<string>("")

    const userId = session.user.id

    const handleSubmit = async () => {
        if (!title || page === null || !content) {
            alert("모든 필드를 채워주세요.")
            return
        }
        try {
            const { data, error } = await supabase.from("memo").insert([
                {
                    user_id: userId,
                    title,
                    page,
                    content,
                },
            ])
            if (error) {
                console.error("등록 실패 :", error)
            } else {
                alert("성공")
                setTitle("")
                setPage(null)
                setContent("")
            }
        } catch (err) {
            console.error("등록 실패 :", err)
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
                type="number"
                placeholder="페이지"
                name="bookpage"
                width="calc((100% - 47px) / 2)"
                value={page ?? ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPage(Number(e.target.value))
                }
            />
            <AddButton
                arialabel="기억에 남는 구절 추가 버튼"
                type="button"
                title={title}
                page={page}
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
