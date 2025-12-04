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
    let debounce:boolean = false

    if(!session) return

    const handleSubmit = async() => {
        if(debounce || loading || !session) return

        debounce = true
        setLoading(true)

        try {
            const { error } = await supabase
                .from("profiles")
                .update({ username: newNickname })
                .eq("id", session.user.id);

        if (error) {
            throw new Error('닉네임 변경에 실패했습니다')
        }

        router.push('/profileedit')

        // zustand 상태 업데이트
        setProfile({ username: newNickname, interests: profile.interests }); // interests는 필요에 맞게
        setToast('닉네임 변경이 완료되었습니다','success')

        } catch (err) {
            console.error(err);
            const errorMessage = err instanceof Error
                ? err.message
                : '회원가입 중 오류가 발생했습니다'
            setToast(errorMessage, "error")
            debounce = false
            setLoading(false)
        }
    }

    return(
        <ProfileWrap>
            <Label>
                <span>닉네임</span>
                <InputFields type={"nickname"}
                name={"login-nickname"}
                value={newNickname}
                placeholder={"닉네임을 입력해주세요"}
                onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setNewNickname(e.currentTarget.value)}
                />
            </Label>
            <EditButton type="nickname" vlaue={newNickname} loading={loading} onClick={handleSubmit}></EditButton>
        </ProfileWrap>
    )
}