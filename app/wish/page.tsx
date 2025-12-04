"use client"

import styled from "styled-components"
import WishForm from "./components/wishForm"
import { useAuthStore } from "../lib/userfetch"
import { Wish } from "../lib/userfetch"
import Skeleton from "react-loading-skeleton"
import WishContent from "./components/WishContent"
import { useState, useEffect, useRef } from "react"
import EditModal from "./components/modal/EditModal"
import Modal from "../components/modal/Modal"

const WishWrap = styled.section`
    padding: 80px 15px 65px;
`

export default function WishPage() {
    const { session } = useAuthStore()
    const [EditPopup,setEditPopup] = useState(false)
    const { wish } = useAuthStore() as { wish: Wish[] | null}
    const [currentWish,setCurrentWish] = useState<Wish[]>([])

    const checkIdRef = useRef<string[]>([])
    const [modal,setModal] = useState(false)
    const [deleteModal,setDeleteModal] = useState(false)

    const editObjRef = useRef<Wish | null>(null)

    useEffect(()=>{
        setCurrentWish(wish)
    },[wish])

    const handleEdit = async() => {
        const CheckEdit = currentWish.find((m)=>m.id===checkIdRef.current[0])
        editObjRef.current = CheckEdit //변경
        setEditPopup(true) // 수정 폼 팝업 오픈
        setModal(false) // 수정/삭제버튼 딜리트
    }

    return (
        <>
            <WishWrap>
                <h2 className="sr-only">위시리스트</h2>
                {session && (
                    <>
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

                    <WishForm session={session}></WishForm>
                    <div className="mt-[35px]">
                        <WishContent
                        wish={currentWish}
                        checkId={checkIdRef}
                        modal={modal}
                        setModal={setModal}
                        />
                    </div>
                    </>
                )}
                {EditPopup &&
                    <EditModal
                    editObj={editObjRef.current}
                    setEditPopup={setEditPopup}
                    />
                }
                {!session &&
                <>
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
                </>
                }
            </WishWrap>
        </>

    )
}