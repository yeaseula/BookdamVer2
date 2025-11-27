"use client"

import styled from "styled-components"
import InterestList from "@/app/components/form/Interest/InterestList"
import { useEffect, useState } from "react"
import { EditButtonInterest } from "../components/EditButton"
import createClient from "@/utils/supabase/client"
import { useToastStore } from "@/app/lib/useToastStore"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/app/lib/userfetch"

const ProfileWrap = styled.section`
    padding: 80px 15px 65px;
`
const Label = styled.div`
    width: 100%;
    display: block;
    > span { font-size: 12px; color: #616161 }
`

export default function EditInterest() {
    const [newInterest,setNewInterest] = useState<string[]>([]);
    const [loading,setLoading] = useState<boolean>(false);
    const supabase = createClient()
    const setToast = useToastStore((state)=>state.setToast)
    const setProfile = useAuthStore((state)=>state.setProfile)
    const { session, profile } = useAuthStore()
    const router = useRouter()

    const handleSubmit = async() => {
        if(loading) return
        if(!session) return
        setLoading(true)

        try {
            const { error } = await supabase
                .from("profiles")
                .update({ interests: newInterest })
                .eq("id", session.user.id);

        if (error) {
            console.error("관심사 변경 실패:", error.message);
            setToast('관심사 변경 실패','error',()=>setLoading(false))
            return;
        }

        // zustand 상태 업데이트
        setProfile({ username: profile.username, interests: newInterest });
        setToast('관심사 변경이 완료되었습니다','success',()=>{router.push('/profileedit')})

        } catch (err) {
            console.error(err);
            setToast('오류가 발생했습니다','error',()=>setLoading(false))
        }
    }

    return(
        <ProfileWrap>
            <InterestList interest={newInterest} setInterest={setNewInterest}></InterestList>
            <EditButtonInterest value={newInterest} loading={loading} onClick={handleSubmit} ></EditButtonInterest>
        </ProfileWrap>
    )
}