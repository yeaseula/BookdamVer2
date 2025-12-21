"use client"

import styled from "styled-components"
import { useEffect, useState, useRef } from "react"
import { useAuthStore, DataState, Books, Log } from "../lib/userfetch"
import { useToastStore } from "../lib/useToastStore"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import { AnimatePresence } from "framer-motion"
import { ErrorBoundary } from "react-error-boundary"
import { CompoErrorFallBack } from "../error/CompoErrorFallBack"

import ReadingForm from "./components/readingForm"
import ReadingContent from "./components/readingContent"
import EditModal from "./components/modal/EditModal"
import LogModal from "./components/log/LogModal"

import SettingModal from "../components/modal/ModalSetting"
import ModalBottom from "../components/modal/ModalBottom"
import DeleteCheck from "../components/modal/DeleteCheck"
import { handleDeletUtil } from "../lib/delete"
import { SubWrap } from "../components/common/container.styled"

import { useInitialToggle,
    AllModalClose, SelectModalClose, DeleteModalClose,
    handleEditClose, handleDelete } from "../hook/useModal"
import { FormSkeleton } from "../components/common/Skeleton/ReviewSkeleton"

export default function ReadingPage() {
    //data first access point
    const [currentBooks,setCurrentBooks] = useState<DataState<Books[]>>(null)
    const [currentLogs,setCurrentLogs] = useState<DataState<Log[]>>(null)
    const { books } = useAuthStore() as { books: DataState<Books[]>};
    const { log } = useAuthStore() as { log: DataState<Log[]> };
    const { session, isBooksLoaded, removeData } = useAuthStore()

    const [modal,setModal] = useState(false)
    const [selectModal,setSelectModal] = useState(false) //첫번째모달
    const [deleteModal,setDeleteModal] = useState(false) //삭제여부
    const [EditPopup,setEditPopup] = useState(false) //수정모달


    const [checkId,setCheckId] = useState<string | null>(null)
    const editObjRef = useRef<Books | null>(null)

    //log state
    const [logPopup,setLogPopup] = useState(false)
    const [logWatchNum,setLogWatchNum] = useState<string[]>([])
    const [logObj,setLogObj] = useState<Log[] | null>(null)

    let debounce:boolean = false;
    const [loading,setLoading] = useState(false)
    const setToast = useToastStore((s)=>s.setToast)

    const isLoading = !isBooksLoaded

    useEffect(()=>{
        if(logWatchNum.length === 0) {
            setLogObj(null)
            setLogPopup(false)
        }
        if(logWatchNum.length > 0) {
            const CheckLogObj = currentLogs.data.filter((m)=>m.book_id===logWatchNum[0])
            setLogObj(CheckLogObj)
            setLogPopup(true)
        }
    },[logWatchNum])

    useEffect(()=>{
        setCurrentBooks(books)
    },[books])

    useEffect(()=>{
        setCurrentLogs(log)
    },[log])

    const handleEdit = async() => {
        const CheckEdit = currentBooks.data.find((m)=>m.id===checkId)
        editObjRef.current = CheckEdit //변경
        setEditPopup(true) // 수정 폼 팝업 오픈
        setSelectModal(false)
    }

    const handleItemDelete = async() => {
        if(debounce || loading) return
        debounce = true
        setLoading(true)

        try {
            const { error } = await handleDeletUtil(checkId,session.user.id,"books")
            if (error) throw new Error('삭제 실패했습니다!')

            setToast('삭제가 완료됐습니다!','success')
            removeData("books", checkId)

            setModal(false)
            setDeleteModal(false)

            useAuthStore.getState().removeData('books',checkId)

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
            <h2 className="sr-only">읽고있는 책</h2>
            <FormSkeleton isLoading={isLoading} />
            <ReadingForm session={session}/>
            <div className="mt-[35px]">
                <ErrorBoundary FallbackComponent={CompoErrorFallBack}>
                    <ReadingContent
                    books={books}
                    setCheckId={setCheckId}
                    currentBooks={currentBooks}
                    logWatchNum={logWatchNum}
                    setLogWatchNum={setLogWatchNum}
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
            <AnimatePresence>
            {logPopup &&
            <SettingModal onClose={()=>{setLogPopup(false)}}>
                <LogModal
                logObj={logObj}
                setLogPopup={setLogPopup}
                setLogWatchNum={setLogWatchNum}
                />
            </SettingModal>
            }
            </AnimatePresence>
        </SubWrap>
    )
}