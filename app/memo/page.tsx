"use client"
import styled from "styled-components"
import MemoForm from "./components/memoForm"
import MemoContent from "./components/memoContent"
import DeleteButton from "./components/Delete"
import EditButton from "./components/Edit"
import { useAuthStore } from "../lib/userfetch"
import { Memo } from "../type/Memo"
import { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'

const MemoWrap = styled.section`
    padding: 30px 15px 65px;
`

export default function MemoPage() {

    //data first access point
    const [currentMemo,setCurrentMemo] = useState<Memo[] | null>(null)
    const { memo } = useAuthStore() as { memo: Memo[] | null};
    const { session } = useAuthStore()
    useEffect(()=>{
        setCurrentMemo(memo)
    },[memo])
    //session access

    return(
        <MemoWrap>
            <h2 className="sr-only">기억에 남는 구절</h2>
            {session && currentMemo && (
                <>
                    <MemoForm session={session}/>
                    <div className="mt-[35px]">
                        <MemoContent memo={currentMemo}/>
                    </div>
                    <div className="mt-[20px] flex gap-3 justify-end">
                        <EditButton />
                        <DeleteButton />
                    </div>
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