"use client"

import styled from "styled-components"
import InputFields from "@/app/components/form/input"
import { useState } from "react"
import { DataState, Profiles } from "@/app/lib/userfetch"
import EditButton from "../components/EditButton"
import createClient from "@/utils/supabase/client"
import { useToastStore } from "@/app/lib/useToastStore"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/app/lib/userfetch"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import { SubWrap } from "@/app/components/common/container.styled"
import { LabelStyle } from "@/app/components/form/Label"

export default function EditNickname() {
    const [newNickname,setNewNickname] = useState<string>('');
    const [loading,setLoading] = useState<boolean>(false);
    const supabase = createClient()
    const setToast = useToastStore((state)=>state.setToast)
    const setProfile = useAuthStore((state)=>state.setProfile)
    const { session, profile } = useAuthStore()
    const router = useRouter()
    let debounce:boolean = false

    const handleSubmit = async() => {
        if(debounce || loading || !session) return

        debounce = true
        setLoading(true)

        try {
            const { data, error } = await supabase
                .from("profiles")
                .update({ username: newNickname })
                .eq("id", session.user.id)

            if(error) {
                throw new Error('닉네임 수정에 실패했습니다')
            }

            const newProfile:DataState<Profiles> = {
                data: {
                    ...profile.data,
                    username:newNickname
                },
                error: error,
                ok: !error
            }

            router.push('/profileedit')

            // zustand 상태 업데이트
            setProfile(newProfile);
            setToast('닉네임 변경이 완료되었습니다','success')

        } catch (err) {
            console.error(err);
            const errorMessage = err instanceof Error
                ? err.message
                : '닉네임 수정 중 오류가 발생했습니다'
            setToast(errorMessage, "error")
            debounce = false
            setLoading(false)
        }
    }

    return(
        <SubWrap>
            {session && profile ? (
                <>
                <LabelStyle>
                    <span>닉네임</span>
                    <InputFields type={"nickname"}
                    name={"login-nickname"}
                    value={newNickname}
                    placeholder={"닉네임을 입력해주세요"}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setNewNickname(e.currentTarget.value)}
                    />
                </LabelStyle>
                <EditButton type="nickname" vlaue={newNickname} loading={loading} onClick={handleSubmit}></EditButton>
                </>
            ) : (
                <>
                <Skeleton height={14} />
                <Skeleton height={37} />
                <Skeleton height={40} style={{ marginTop: '35px' }} />
                </>
            )}

        </SubWrap>
    )
}