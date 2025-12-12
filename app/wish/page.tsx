"use client"

import styled from "styled-components"
import { useState, useEffect, useRef } from "react"
import { useAuthStore, DataState, Wish } from "../lib/userfetch"
import { useToastStore } from "../lib/useToastStore"
import { ErrorBoundary } from "react-error-boundary"
import { CompoErrorFallBack } from "../error/CompoErrorFallBack"
import { AnimatePresence } from "framer-motion"
import Skeleton from "react-loading-skeleton"

import WishForm from "./components/wishForm"
import WishContent from "./components/WishContent"
import EditModal from "./components/modal/EditModal"

import SettingModal from "../components/modal/ModalSetting"
import ModalBottom from "../components/modal/ModalBottom"
import DeleteCheck from "../components/modal/DeleteCheck"
import { handleDeletUtil } from "../lib/delete"

import { useInitialToggle,
    AllModalClose, SelectModalClose, DeleteModalClose,
    handleEditClose, handleDelete } from "../hook/useModal"

const WishWrap = styled.section`
    padding: 80px 15px 65px;
`

export default function WishPage() {
    const { session, isWishLoaded, removeData } = useAuthStore()
    const { wish } = useAuthStore() as { wish: DataState<Wish[]>}
    const [currentWish,setCurrentWish] = useState<DataState<Wish[]>>(null)

    const [checkId,setCheckId] = useState<string | null>(null) //선택된요소의 id값

    const [modal,setModal] = useState(false)
    const [selectModal,setSelectModal] = useState(false) //첫번째모달
    const [deleteModal,setDeleteModal] = useState(false) //삭제여부
    const [EditPopup,setEditPopup] = useState(false) //수정모달

    const editObjRef = useRef<Wish | null>(null)

    let debounce:boolean = false;
    const [loading,setLoading] = useState(false)
    const setToast = useToastStore((s)=>s.setToast)

    useEffect(()=>{
        setCurrentWish(wish)
    },[wish])

    const handleEdit = async() => { //수정 버튼 클릭
        const CheckEdit = currentWish.data.find((m)=>m.id===checkId)
        editObjRef.current = CheckEdit //변경
        setEditPopup(true) // 수정 폼 팝업 오픈
        setSelectModal(false)
    }

    const handleItemDelete = async() => {
        if(debounce || loading) return
        debounce = true
        setLoading(true)

        try {
            const { error } = await handleDeletUtil(checkId,session.user.id,"wish")
            if (error) throw new Error('삭제 실패했습니다!')

            setToast('삭제가 완료됐습니다!','success')
            removeData("wish", checkId)

            setModal(false)
            setDeleteModal(false)

            useAuthStore.getState().removeData('wish',checkId)

            if(error) {
                throw new Error
            }
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

    useInitialToggle({
        checkId,
        setCheckId,
        modal,
        setModal,
        selectModal,
        setSelectModal
    })

    if(!isWishLoaded) {
        return (
            <WishWrap>
                <Skeleton height={37} borderRadius={5}/>
                <div className="mt-1.5">
                    <Skeleton height={90} borderRadius={5} />
                </div>
                <div className="mt-[35px]">
                    <Skeleton height={25} borderRadius={5}/>
                </div>
                <div className="mt-[10px] text-right">
                    <Skeleton width={100} height={25} borderRadius={5}/>
                </div>
                <div className="mt-[5px] text-right">
                    <Skeleton width={150} height={25} borderRadius={5}/>
                </div>
            </WishWrap>
        )
    }

    return (
        <>
            <WishWrap>
                    <h2 className="sr-only">위시리스트</h2>
                    {currentWish && (
                        <>
                        <WishForm session={session} />
                        <div className="mt-[35px]">
                            <ErrorBoundary FallbackComponent={CompoErrorFallBack}>
                                <WishContent
                                wish={currentWish}
                                setCheckId={setCheckId}
                                modal={modal}
                                setModal={setModal}
                                />
                            </ErrorBoundary>
                        </div>
                        <AnimatePresence>
                        {modal && (
                            <SettingModal
                            type="bottom"
                            deleteState={deleteModal}
                            onClose={()=>{
                                AllModalClose({
                                    setModal,
                                    setSelectModal,
                                    setEditPopup,
                                    setDeleteModal
                                })
                            }}
                            >
                                {selectModal &&
                                    <ModalBottom
                                    onClickEdit={handleEdit}
                                    onClickDelete={()=>{
                                        handleDelete({setDeleteModal,setSelectModal})
                                    }}
                                    onClickClose={()=>{
                                        SelectModalClose({setModal, setSelectModal})
                                    }}
                                    />
                                }
                                {deleteModal &&
                                    <DeleteCheck
                                    onItemDelete={handleItemDelete}
                                    loading={loading}
                                    onReject={()=>{
                                        DeleteModalClose({setDeleteModal, setModal})
                                    }}
                                    />
                                }
                                {EditPopup &&
                                    <EditModal
                                    setModal={setModal}
                                    setEditPopup={setEditPopup}
                                    editObj={editObjRef.current}
                                    onClick={()=>{
                                        handleEditClose({setEditPopup,setModal})
                                    }}
                                    />
                                }
                            </SettingModal>
                        )}
                        </AnimatePresence>
                        </>
                    )}
            </WishWrap>
        </>

    )
}