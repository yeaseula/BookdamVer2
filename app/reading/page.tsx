"use client"
import styled from "styled-components"
import { useAuthStore } from "../lib/userfetch"
import { DataState, Books, Log } from "../lib/userfetch"
import { useEffect, useState, useRef } from "react"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import ReadingForm from "./components/readingForm"
import ReadingContent from "./components/readingContent"
import EditModal from "./components/modal/EditModal"
import LogModal from "./components/log/LogModal"
import Modal from "../components/modal/Modal"
import { ErrorBoundary } from "react-error-boundary"
import { CompoErrorFallBack } from "../error/CompoErrorFallBack"

const MemoWrap = styled.section`
    padding: 80px 15px 65px;
`

export default function ReadingPage() {
    const [EditPopup,setEditPopup] = useState(false)
    const checkIdRef = useRef<string[]>([])
    const editObjRef = useRef<Books | null>(null)

    //
    const [modal,setModal] = useState(false)
    const [deleteModal,setDeleteModal] = useState(false)

    //log state
    const [logPopup,setLogPopup] = useState(false)
    const [logWatchNum,setLogWatchNum] = useState<string[]>([])
    const [logObj,setLogObj] = useState<Log[] | null>(null)

    //data first access point
    const [currentBooks,setCurrentBooks] = useState<DataState<Books[]>>(null)
    const [currentLogs,setCurrentLogs] = useState<DataState<Log[]>>(null)
    const { books } = useAuthStore() as { books: DataState<Books[]>};
    const { log } = useAuthStore() as { log: DataState<Log[]> };
    const { session, isBooksLoaded, isLogLoaded } = useAuthStore()

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
        const CheckEdit = currentBooks.data.find((m)=>m.id===checkIdRef.current[0])
        editObjRef.current = CheckEdit //변경
        setEditPopup(true) // 수정 폼 팝업 오픈
        setModal(false) // 수정/삭제버튼 딜리트
    }

    if(!isBooksLoaded) {
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
            <h2 className="sr-only">읽고있는 책</h2>
            {currentBooks && (
                <>
                    <ReadingForm session={session}/>
                    <div className="mt-[35px]">
                        <ErrorBoundary FallbackComponent={CompoErrorFallBack}>
                        <ReadingContent
                        books={books}
                        checkId={checkIdRef}
                        modal={modal}
                        setModal={setModal}
                        currentBooks={currentBooks}
                        logWatchNum={logWatchNum}
                        setLogWatchNum={setLogWatchNum}
                        />
                        </ErrorBoundary>
                    </div>
                    {EditPopup &&
                        <EditModal
                        editObj={editObjRef.current}
                        setEditPopup={setEditPopup}
                        checkIdRef={checkIdRef}
                        />
                    }
                    {logPopup &&
                        <LogModal
                        logObj={logObj}
                        setLogWatchNum={setLogWatchNum}/>
                    }
                </>
            )}
        </MemoWrap>
    )
}