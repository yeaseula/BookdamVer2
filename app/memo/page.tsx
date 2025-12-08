"use client"
import styled from "styled-components"
import MemoForm from "./components/memoForm"
import MemoContent from "./components/memoContent"
import EditModal from "./components/modal/EditModal"
import { useAuthStore } from "../lib/userfetch"
import { DataState,Memo } from "../lib/userfetch"
import { useEffect, useState, useRef } from "react"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import Modal from "../components/modal/Modal"
import { ErrorBoundary } from "react-error-boundary"
import { CompoErrorFallBack } from "../error/CompoErrorFallBack"

const MemoWrap = styled.section`
    padding: 80px 15px 65px;
`

export default function MemoPage() {
    const [EditPopup,setEditPopup] = useState(false)

    const checkIdRef = useRef<string[]>([])
    const editObjRef = useRef<Memo | null>(null)

    const [modal,setModal] = useState(false)
    const [deleteModal,setDeleteModal] = useState(false)

    //data first access point
    const [currentMemo,setCurrentMemo] = useState<DataState<Memo[]>>(null)
    const { memo } = useAuthStore() as { memo: DataState<Memo[]>}
    const { session, isMemoRoaded } = useAuthStore()

    useEffect(()=>{
        setCurrentMemo(memo)
    },[memo])

    const handleEdit = async() => {
        const CheckEdit = currentMemo.data.find((m)=>m.id===checkIdRef.current[0])
        editObjRef.current = CheckEdit //변경
        setEditPopup(true) // 수정 폼 팝업 오픈
        setModal(false) // 수정/삭제버튼 딜리트
    }

    if(!isMemoRoaded) {
        return (
            <MemoWrap>
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
            </MemoWrap>
        )
    }

    return(
        <MemoWrap>
            <Modal
            state={modal}
            setModal={setModal}
            checkIdRef={checkIdRef}
            deleteModal={deleteModal}
            setDeleteModal={setDeleteModal}
            EditPopup={EditPopup}
            setEditPopup={setEditPopup}
            onClickEdit={handleEdit}
            />
            <h2 className="sr-only">기억에 남는 구절</h2>
            {currentMemo && (
                <>
                    <MemoForm session={session}/>
                    <div className="mt-[35px]">
                        <ErrorBoundary FallbackComponent={CompoErrorFallBack}>
                        <MemoContent
                        memo={currentMemo}
                        checkId={checkIdRef}
                        modal={modal}
                        setModal={setModal}
                        />
                        </ErrorBoundary>
                    </div>
                    {EditPopup &&
                        <EditModal
                        editObj={editObjRef.current}
                        setEditPopup={setEditPopup}
                        checkId={checkIdRef}
                        />
                    }
                </>
            )}

        </MemoWrap>
    )
}