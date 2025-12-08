"use client"

import styled from "styled-components"
import WishForm from "./components/wishForm"
import { useAuthStore } from "../lib/userfetch"
import { DataState, Wish } from "../lib/userfetch"
import Skeleton from "react-loading-skeleton"
import WishContent from "./components/WishContent"
import { useState, useEffect, useRef } from "react"
import EditModal from "./components/modal/EditModal"
import Modal from "../components/modal/Modal"
import { ErrorBoundary } from "react-error-boundary"
import { CompoErrorFallBack } from "../error/CompoErrorFallBack"
import { NetworkError } from "../error/errorLibrary"

const WishWrap = styled.section`
    padding: 80px 15px 65px;
`

export default function WishPage() {
    const { session, isWishLoaded } = useAuthStore()
    const [EditPopup,setEditPopup] = useState(false)
    const { wish } = useAuthStore() as { wish: DataState<Wish[]>}
    const [currentWish,setCurrentWish] = useState<DataState<Wish[]>>(null)

    const checkIdRef = useRef<string[]>([])
    const [modal,setModal] = useState(false)
    const [deleteModal,setDeleteModal] = useState(false)

    const editObjRef = useRef<Wish | null>(null)

    useEffect(()=>{
        setCurrentWish(wish)
    },[wish])

    const handleEdit = async() => {
        const CheckEdit = currentWish.data.find((m)=>m.id===checkIdRef.current[0])
        editObjRef.current = CheckEdit //변경
        setEditPopup(true) // 수정 폼 팝업 오픈
        setModal(false) // 수정/삭제버튼 딜리트
    }

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
                    <h2 className="sr-only">위시리스트</h2>
                    {currentWish && (
                        <>
                        <WishForm session={session} />
                        <div className="mt-[35px]">
                            <ErrorBoundary FallbackComponent={CompoErrorFallBack}>
                                <WishContent
                                wish={currentWish}
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
                            />
                        }
                        </>
                    )}
            </WishWrap>
        </>

    )
}