"use client"
import { useEffect, useState, useRef } from "react"
import { useAuthStore,DataState,Memo } from "../lib/userfetch"
import { useToastStore } from "../lib/useToastStore"
import { ErrorBoundary } from "react-error-boundary"
import { CompoErrorFallBack } from "../error/CompoErrorFallBack"
import { AnimatePresence } from "framer-motion"

import MemoForm from "./components/memoForm"
import MemoContent from "./components/memoContent"
import EditModal from "./components/modal/EditModal"

import SettingModal from "../components/modal/ModalSetting"
import ModalBottom from "../components/modal/ModalBottom"
import DeleteCheck from "../components/modal/DeleteCheck"
import { handleDeletUtil } from "../lib/delete"
import { SubWrap } from "../components/common/container.styled"

import { useInitialToggle,
    AllModalClose, SelectModalClose, DeleteModalClose,
    handleEditClose, handleDelete } from "../hook/useModal"
import { FormSkeleton } from "../components/common/Skeleton/ReviewSkeleton"

export default function MemoPage() {
    const { session, isMemoRoaded, removeData } = useAuthStore()
    const { memo } = useAuthStore() as { memo: DataState<Memo[]>}
    const [currentMemo,setCurrentMemo] = useState<DataState<Memo[]>>(null)

    const [checkId,setCheckId] = useState<string | null>(null)

    const [modal,setModal] = useState(false)
    const [selectModal,setSelectModal] = useState(false) //첫번째모달
    const [deleteModal,setDeleteModal] = useState(false) //삭제여부
    const [EditPopup,setEditPopup] = useState(false) //수정모달

    const editObjRef = useRef<Memo | null>(null)
    let debounce:boolean = false;
    const [loading,setLoading] = useState(false)
    const setToast = useToastStore((s)=>s.setToast)

    const isLoading = !isMemoRoaded

    useEffect(()=>{
        setCurrentMemo(memo)
    },[memo])

    const handleEdit = async() => {
        const CheckEdit = currentMemo.data.find((m)=>m.id===checkId)
        editObjRef.current = CheckEdit //변경
        setEditPopup(true) // 수정 폼 팝업 오픈
        setSelectModal(false)
    }

    const handleItemDelete = async() => {
        if(debounce || loading) return
        debounce = true
        setLoading(true)

        try {
            const { error } = await handleDeletUtil(checkId,session.user.id,"memo")
            if (error) throw new Error('삭제 실패했습니다!')

            setToast('삭제가 완료됐습니다!','success')
            removeData("memo", checkId)

            setModal(false)
            setDeleteModal(false)

            useAuthStore.getState().removeData('memo',checkId)

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

    return(
        <SubWrap>
            <h2 className="sr-only">기억에 남는 구절</h2>
            <FormSkeleton isLoading={isLoading} />
            {currentMemo && (
                <>
                    <MemoForm session={session}/>
                    <div className="mt-[35px]">
                        <ErrorBoundary FallbackComponent={CompoErrorFallBack}>
                            <MemoContent
                            memo={currentMemo}
                            setCheckId={setCheckId}
                            />
                        </ErrorBoundary>
                    </div>
                    <AnimatePresence>
                    {modal && (
                        <SettingModal
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
        </SubWrap>
    )
}