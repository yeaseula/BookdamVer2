"use client"
import styled from "styled-components"
import ReadingForm from "./components/readingForm"
import createClient from "@/utils/supabase/client"
import EditButton from "./components/Edit"
import DeleteButton from "./components/Delete"
import { useAuthStore } from "../lib/userfetch"
import { Books, Log } from "../lib/userfetch"
import { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import { useToastStore } from "../lib/useToastStore"
import ReadingContent from "./components/readingContent"
import EditModal from "./components/modal/EditModal"

const MemoWrap = styled.section`
    padding: 80px 15px 65px;
`

export default function ReadingPage() {
    const [EditPopup,setEditPopup] = useState(false)
    const [checkId,setCheckId] = useState<string[]>([])
    const [editObj,setEditObj] = useState<Books | null>(null) // 수정 할 값 객체
    //data first access point
    const [currentBooks,setCurrentBooks] = useState<Books[] | null>(null)
    const { books } = useAuthStore() as { books: Books[] | null};
    const { session } = useAuthStore()
    const supabase = createClient()
    const setToast = useToastStore((state)=>state.setToast)

    useEffect(()=>{
        setCurrentBooks(books)
    },[books])

    const handleEdit = async() => {
        if(checkId.length > 1) {
            setToast('수정은 한 개씩만 선택할 수 있습니다!','error')
            return
        }
        if(checkId.length == 1) {
            const CheckEdit = currentBooks.find((m)=>m.id===checkId[0])
            setEditObj(CheckEdit)
            setEditPopup(true)
        }
    }

    const handleDelete = async() => {
        const { error } = await supabase
            .from("books")
            .delete()
            .in("id", checkId);

        if (error) {
            setToast('삭제 실패했습니다!','error')
            return;
        }

        setToast('삭제가 완료됐습니다!','success')
        setCheckId([]);

        //zustand 전역상태 재업로드
        useAuthStore.setState({
            books: useAuthStore.getState().books.filter(item => !checkId.includes(item.id))
        });

        checkId.map((number)=>(
            useAuthStore.getState().removeData('books',number)
        ))
    }

    return(
        <MemoWrap>
            <h2 className="sr-only">읽고있는 책</h2>
            {session && currentBooks && (
                <>
                    <ReadingForm session={session}/>
                    <div className="mt-[35px]">
                        <ReadingContent books={books} checkId={checkId} setCheckId={setCheckId} />
                    </div>
                    {currentBooks.length > 0 && (
                        <div className="mt-[20px] flex gap-3 justify-end">
                            <EditButton onClick={handleEdit} checkId={checkId}/>
                            <DeleteButton onClick={handleDelete} checkId={checkId}/>
                        </div>
                    )}
                    {EditPopup &&
                        <EditModal editObj={editObj} setEditPopup={setEditPopup} setCheckId={setCheckId}/>
                    }
                </>
            )}
            {(!session || !currentBooks) && (
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
            </>)}
        </MemoWrap>
    )
}