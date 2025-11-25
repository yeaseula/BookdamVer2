"use client"
import styled from "styled-components"
import DeleteButton from "@/app/memo/components/Delete"
import { useParams } from "next/navigation"
import { useAuthStore } from "@/app/lib/userfetch"
import { deleteReview } from "@/app/lib/delete"
import { useToastStore } from "@/app/lib/useToastStore"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Container = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 300;
    width: 300px;
    background: #fff;
    border-radius: 10px;
    text-align: center;
    padding: 35px 20px;
`
const ButtonStyle = styled.button`
    width: 80px;
    height: 34px;
    background-color: #fff;
    border-radius: 5px;
    color: var(--sub_color);
    font-size: 1.4rem;
    border: 1px solid var(--sub_color);
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
        box-shadow: 0 4px 10px rgba(0,0,0, 0.1)
    }
    &:disabled {
        background-color: #e0e0e0 !important;
        border : 1px solid #e0e0e0 !important;
        color: #bdbdbd !important;
        cursor: initial;
        &: hover {
            box-shadow: none;
        }
    }
`
const ButtonStyleDark = styled(ButtonStyle)`
    background-color: var(--sub_color);
    color: #fff;
`

export default function DeleteCheck({onClick}) {
    const [loading,setLoading] = useState<boolean>(false)
    const { session } = useAuthStore()
    const params = useParams()
    const postId = Array.isArray(params.id) ? params.id[0] : params.id;
    const setToast = useToastStore((state)=>state.setToast)
    const router = useRouter()

    if(!session) return
    const userId = session.user.id

    //console.log(postId + ':🚀' + userId + ':🤔🤔🤔')

    const handleReviewDelete = async() => {
        if(loading) return
        setLoading(true)
        const { error } = await deleteReview(postId, userId);
        useAuthStore.getState().removeData("reviews",postId)
        if (!error) {
            setToast("리뷰 삭제 성공했습니다!","success",()=>router.push('/review'))
        }
    }

    return (
        <Container>
            <h2 className="text-3xl font-bold">게시물을 삭제할까요?</h2>
            <div className="flex justify-center gap-3 mt-10">
                <ButtonStyle type="button" disabled={loading} onClick={handleReviewDelete}>예</ButtonStyle>
                <ButtonStyleDark type="button" disabled={loading} onClick={onClick}>아니오</ButtonStyleDark>
            </div>
        </Container>
    )
}