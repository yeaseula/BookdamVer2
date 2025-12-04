"use client"
import styled from "styled-components"
import DeleteButton from "@/app/memo/components/Delete"
import { useParams } from "next/navigation"
import { useAuthStore } from "@/app/lib/userfetch"
import { deleteReview } from "@/app/lib/delete"
import { useToastStore } from "@/app/lib/useToastStore"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { usePathname } from "next/navigation"
import createClient from "@/utils/supabase/client"

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

export default function DeleteCheck({onClick,checkIdRef,setDeleteModal}) {
    const [loading,setLoading] = useState<boolean>(false)
    const { session } = useAuthStore()
    const removeData = useAuthStore((state)=>state.removeData)
    const params = useParams()
    const postId = Array.isArray(params.id) ? params.id[0] : params.id;
    const setToast = useToastStore((state)=>state.setToast)
    const router = useRouter()
    const supabase = createClient()

    const pathname = usePathname()

    let debounce:boolean = false;

    if(!session) return
    const userId = session.user.id

    //console.log(postId + ':🚀' + userId + ':🤔🤔🤔')


    //삭제는 해당 컴포넌트에서 처리합니다
    const handleReviewDelete = async() => {
        if(loading) return
        setLoading(true)
        try {
            const { error } = await deleteReview(postId, userId);
            useAuthStore.getState().removeData("reviews",postId)

            if(error) {
                throw new Error("리뷰 삭제에 실패했습니다.")
            }
            setToast("리뷰 삭제 성공했습니다!","success")
            router.push('/review')

        } catch (err) {
            console.error('리뷰 삭제 오류:', err)
            const errorMessage = err instanceof Error
                ? err.message
                : '리뷰삭제 중 오류가 발생했습니다.'
            setToast(errorMessage,"error")
            setLoading(false)
        }
    }

    const handleDelete = async() => {
        if(debounce || loading) return

        debounce = true
        setLoading(true)

        try {
            const { error } = await supabase
                .from("memo")
                .delete()
                .in("id", checkIdRef.current);

            if (error) throw new Error('삭제 실패했습니다!')

            setToast('삭제가 완료됐습니다!','success')
            removeData("memo", checkIdRef.current[0])
            checkIdRef.current = []
            setDeleteModal(false)

            checkIdRef.current.map((number)=>(
                useAuthStore.getState().removeData('memo',number)
            ))

        } catch(err) {
            const errorMessage = err instanceof Error
                ? err.message
                : '삭제 중 오류가 발생했습니다'
            setToast(errorMessage, "error")

        } finally {
            debounce = false
            setLoading(false)
        }
    }

    const handleDeleteReading = async() => {

        if(debounce || loading) return

        debounce = true
        setLoading(true)

        try {
            const { error } = await supabase
                .from("books")
                .delete()
                .in("id", checkIdRef.current);

            if (error) throw new Error('삭제 실패했습니다!')

            setToast('삭제가 완료됐습니다!','success')
            removeData("books", checkIdRef.current[0])
            checkIdRef.current = []
            setDeleteModal(false)
            checkIdRef.current.map((number)=>(
                useAuthStore.getState().removeData('books',number)
            ))

        } catch(err) {
            const errorMessage = err instanceof Error
                ? err.message
                : '삭제 중 오류가 발생했습니다'
            setToast(errorMessage, "error")
        } finally {
            debounce = false
            setLoading(false)
        }
    }

    const handleDeleteWish = async() =>{
        if(debounce || loading) return
        debounce = true
        setLoading(true)

        try {
            const { error } = await supabase
                .from("wish")
                .delete()
                .in("id", checkIdRef.current)

                if (error) throw new Error('삭제 실패했습니다!')

                setToast('삭제가 완료됐습니다!','success')
                removeData("wish", checkIdRef.current[0])
                checkIdRef.current = []
                setDeleteModal(false);

                checkIdRef.current.map((number)=>(
                    useAuthStore.getState().removeData('wish',number)
                ))

        } catch (err) {
            const errorMessage = err instanceof Error
                ? err.message
                : '삭제 중 오류가 발생했습니다'
            setToast(errorMessage, "error")
        } finally {
            debounce = false
            setLoading(false)
        }
    }

    return (
        <>
        {!loading &&
        <Container>
            <h2 className="text-3xl font-bold">게시물을 삭제할까요?</h2>
            <div className="flex justify-center gap-3 mt-10">
                {pathname === '/memo' &&
                    <ButtonStyle
                    type="button"
                    disabled={loading}
                    onClick={handleDelete}>예</ButtonStyle>
                }
                {pathname === '/reading' &&
                    <ButtonStyle
                    type="button"
                    disabled={loading}
                    onClick={handleDeleteReading}>예</ButtonStyle>
                }
                {pathname === '/wish' &&
                    <ButtonStyle
                    type="button"
                    disabled={loading}
                    onClick={handleDeleteWish}>예</ButtonStyle>
                }
                {pathname.includes('review') &&
                    <ButtonStyle
                    type="button"
                    disabled={loading}
                    onClick={handleReviewDelete}>예</ButtonStyle>
                }
                <ButtonStyleDark
                type="button"
                disabled={loading}
                onClick={onClick}>아니오</ButtonStyleDark>
            </div>
        </Container>
        }
        </>
    )
}