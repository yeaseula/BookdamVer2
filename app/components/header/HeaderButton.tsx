"use client"

import styled from "styled-components"
import { useState } from "react"
import { RiMore2Fill } from "@remixicon/react"
import SettingModal from "../modal/ModalSetting"
import { deleteReview } from "@/app/lib/delete"
import { handleDelete, DeleteModalClose } from "@/app/hook/useModal"
import ModalBottom from "../modal/ModalBottom"
import DeleteCheck from "../modal/DeleteCheck"
import { useToastStore } from "@/app/lib/useToastStore"
import { useAuthStore } from "@/app/lib/userfetch"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"

const Button = styled.button`
    position: absolute;
    top: 0;
    right: 15px;
    cursor: pointer;
    z-index: 99;
`

export default function HeaderButton() {

    const [modal,setModal] = useState(false)
    const [selectModal,setSelectModal] = useState(false) //첫번째모달
    const [deleteModal,setDeleteModal] = useState(false) //삭제여부
    let debounce:boolean = false;
    const [loading,setLoading] = useState(false)
    const setToast = useToastStore((s)=>s.setToast)
    const { session ,removeData } = useAuthStore()
    const router = useRouter()
    const params = useParams()
    const userId = session.user.id
    const postId = params.id

    const handleItemDelete = async() => {
        if(loading) return
        setLoading(true)

        try {
            const { error } = await deleteReview(postId, userId);
            useAuthStore.getState().removeData("reviews",postId)

            if(error) {
                throw new Error("리뷰 삭제에 실패했습니다.")
            }
            setToast("리뷰 삭제에 성공했습니다!","success")

            setModal(false)
            setDeleteModal(false)

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

    return (
        <>
            <Button onClick={()=>{ setModal(true); setSelectModal(true) }}>
                <RiMore2Fill size={24} />
            </Button>
            {modal && (
            <SettingModal onClose={()=>setModal(false)}>
                {selectModal && (
                    <ModalBottom
                        onClickDelete={()=>{
                            handleDelete({setDeleteModal,setSelectModal})
                        }}
                        onClickClose={()=>{
                            setModal(false)
                        }}
                    />
                )}
                {deleteModal &&
                    <DeleteCheck
                    onItemDelete={handleItemDelete}
                    loading={loading}
                    onReject={()=>{
                        DeleteModalClose({setDeleteModal, setModal})
                    }}
                    />
                }
            </SettingModal>
            )}
        </>
    )
}