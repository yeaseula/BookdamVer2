"use client"

import styled from "styled-components"
import WishForm from "./components/wishForm"
import { useAuthStore } from "../lib/userfetch"
import { Wish } from "../lib/userfetch"
import Skeleton from "react-loading-skeleton"
import WishContent from "./components/WishContent"
import { useState, useEffect, createElement } from "react"
// import EditButton from "../memo/components/Edit"
// import DeleteButton from "../memo/components/Delete"
import createClient from "@/utils/supabase/client"
import { useToastStore } from "../lib/useToastStore"
import EditModal from "./components/modal/EditModal"

const WishWrap = styled.section`
    padding: 80px 15px 65px;
`

export default function WishPage() {
    const { session } = useAuthStore()
    const supabase = createClient()
    const setToast = useToastStore((state)=>state.setToast)
    const [EditPopup,setEditPopup] = useState(false)
    const { wish } = useAuthStore() as { wish: Wish[] | null};
    const [currentWish,setCurrentWish] = useState<Wish[]>([])
    const [checkId, setCheckId] = useState<string[]>([])
    const [editObj,setEditObj] = useState<Wish | null>(null)
    const [isWorking,setIsWorking] = useState<boolean>(false)

    useEffect(()=>{
        setCurrentWish(wish)
    },[wish])

    const handleEdit = async() => {
        if(checkId.length > 1) {
            setToast('수정은 한 개씩만 선택할 수 있습니다!','error')
            return
        }
        if(checkId.length == 1) {
            const CheckEdit = currentWish.find((m)=>m.id===checkId[0])
            setEditObj(CheckEdit)
            setEditPopup(true)
        }
    }

    const handleDelete = async() => {

        if(isWorking) return
        setIsWorking(true)

        try {
            const { error } = await supabase
                .from("wish")
                .delete()
                .in("id", checkId);

                setToast('삭제가 완료됐습니다!','success')
                setCheckId([]);
                setIsWorking(false);
                //zustand 전역상태 재업로드
                useAuthStore.setState({
                    wish: useAuthStore.getState().wish.filter(item => !checkId.includes(item.id))
                });

                checkId.map((number)=>(
                    useAuthStore.getState().removeData('wish',number)
                ))
        } catch (err) {
            setToast('삭제 실패했습니다!','error')
            return;
        }
    }

    return (
        <>
            {session && (
                <WishWrap>
                    <h2 className="sr-only">위시리스트</h2>
                    <WishForm session={session}></WishForm>
                    <div className="mt-[35px]">
                        <WishContent wish={currentWish} checkId={checkId} setCheckId={setCheckId}/>
                    </div>
                    {/* {currentWish.length > 0 && (
                        <div className="mt-[20px] flex gap-3 justify-end">
                            <EditButton onClick={handleEdit} checkId={checkId}/>
                            <DeleteButton onClick={handleDelete} checkId={checkId}/>
                        </div>
                    )} */}
                    {EditPopup &&
                        <EditModal editObj={editObj} setEditPopup={setEditPopup} setCheckId={setCheckId}/>
                    }
                </WishWrap>
            )}
            {!session && (
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
        </>

    )
}