"use client"

import styled from "styled-components"
import InputFields from "@/app/components/form/input"
import { useEffect, useState } from "react"
import EditButton from "../components/EditButton"
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

export default function EditNickname() {
    const [newNickname,setNewNickname] = useState<string>('');
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
                .update({ username: newNickname })
                .eq("id", session.user.id);

        if (error) {
            console.error("닉네임 변경 실패:", error.message);
            setToast('닉네임 변경 실패','error',()=>setLoading(false))
            return;
        }

        // zustand 상태 업데이트
        setProfile({ username: newNickname, interests: profile.interests }); // interests는 필요에 맞게
        setToast('닉네임 변경이 완료되었습니다','success',()=>{router.push('/profileedit')})

        } catch (err) {
            console.error(err);
            setToast('오류가 발생했습니다','error',()=>setLoading(false))
        }

    }


    return(
        <ProfileWrap>
            <Label>
                <span>닉네임</span>
                <InputFields type={"nickname"}
                name={"login-nickname"}
                placeholder={"닉네임을 입력해주세요"}
                onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setNewNickname(e.currentTarget.value)}
                />
            </Label>
            <EditButton type="nickname" vlaue={newNickname} loading={loading} onClick={handleSubmit}></EditButton>
        </ProfileWrap>
    )
}