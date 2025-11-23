"use client"
import styled from "styled-components"
import MemoForm from "./components/memoForm"
import MemoContent from "./components/memoContent"
import DeleteButton from "./components/Delete"
import EditButton from "./components/Edit"
import EditModal from "./components/modal/EditModal"
import createClient from "@/utils/supabase/client"
import { useAuthStore } from "../lib/userfetch"
import { Memo } from "../lib/userfetch"
import { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'

const MemoWrap = styled.section`
    padding: 30px 15px 65px;
`

export default function MemoPage() {
    const [EditPopup,setEditPopup] = useState(false)
    const [checkId,setCheckId] = useState<string[]>([])
    const [editObj,setEditObj] = useState<Memo | null>(null) // 수정 할 memo 값 객체
    //data first access point
    const [currentMemo,setCurrentMemo] = useState<Memo[] | null>(null)
    const { memo } = useAuthStore() as { memo: Memo[] | null};
    const { session } = useAuthStore()
    const supabase = createClient()

    useEffect(()=>{
        setCurrentMemo(memo)
    },[memo])

    const handleEdit = async() => {
        if(checkId.length > 1) {
            alert('수정은 한 개씩만 선택할 수 있어요!')
            return
        }
        if(checkId.length == 1) {
            const CheckEdit = currentMemo.find((m)=>m.id===checkId[0])
            setEditObj(CheckEdit)
            setEditPopup(true)
        }
    }

    const handleDelete = async() => {
        const { error } = await supabase
            .from("memo")
            .delete()
            .in("id", checkId);

        if (error) {
            console.error("삭제 실패:", error);
            return;
        }

        alert("삭제 완료!");
        setCheckId([]);

        //zustand 전역상태 재업로드
        useAuthStore.setState({
            memo: useAuthStore.getState().memo.filter(item => !checkId.includes(item.id))
        });

    }

    return(
        <MemoWrap>
            <h2 className="sr-only">기억에 남는 구절</h2>
            {session && currentMemo && (
                <>
                    <MemoForm session={session}/>
                    <div className="mt-[35px]">
                        <MemoContent memo={currentMemo} checkId={checkId} setCheckId={setCheckId}/>
                    </div>
                    <div className="mt-[20px] flex gap-3 justify-end">
                        <EditButton onClick={handleEdit} checkId={checkId}/>
                        <DeleteButton onClick={handleDelete} checkId={checkId}/>
                    </div>
                    {EditPopup &&
                        <EditModal editObj={editObj} setEditPopup={setEditPopup} setCheckId={setCheckId}/>
                    }
                </>
            )}
            {(!session || !currentMemo) && (
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