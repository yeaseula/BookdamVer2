"use client"

import styled from "styled-components"
import InterestList from "@/app/components/form/Interest/InterestList"
import { useState, useRef } from "react"
import createClient from "@/utils/supabase/client"
import { useToastStore } from "@/app/lib/useToastStore"
import { useRouter } from "next/navigation"
import { useAuthStore, DataState, Profiles } from "@/app/lib/userfetch"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import { SubWrap } from "@/app/components/common/container.styled"

const Button = styled.button<{$isOriginFetch:boolean}>`
    background: ${(p)=>p.$isOriginFetch ? 'var(--point-color)' :'var(--sub_color)' };
    color: #fff;
    font-size: 1.2rem;
    display: inline-block;
    padding: 2px 12px 1px;
    margin-bottom: 10px;
    border-radius: 3px;
    cursor: pointer;
    transition: background 0.3s;
`

export default function EditInterest() {
    const { session, profile } = useAuthStore()
    const [isOriginFetch, setIsOriginFecth] = useState<boolean>(false)

    const originListRef = useRef<string[]>([])

    const [newInterest,setNewInterest] = useState<string[]>([])
    const [loading,setLoading] = useState<boolean>(false);
    const supabase = createClient()
    const setToast = useToastStore((state)=>state.setToast)
    const setProfile = useAuthStore((state)=>state.setProfile)
    const router = useRouter()
    let debounce:boolean = false

    const handleSubmit = async() => {
        if(debounce || loading || !session) return

        debounce = true
        setLoading(true)

        try {
            const { error } = await supabase
                .from("profiles")
                .update({ interests: newInterest })
                .eq("id", session.user.id);

            if (error) throw new Error('관심사 변경에 실패했습니다.')
            const newProfile:DataState<Profiles> = {
                data: {
                    ...profile.data,
                    interests: newInterest
                },
                error: error,
                ok: !error
            }


            router.push('/profileedit')

            // zustand 상태 업데이트
            setProfile(newProfile);
            setToast('관심사 수정이 완료되었습니다','success')

        } catch (err) {
            console.error(err);
            const errorMessage = err instanceof Error
                ? err.message
                : '관심사 수정 중 오류가 발생했습니다'
            setToast(errorMessage, "error")
            debounce = false
            setLoading(false)
        }
    }
    const handleOriginFetch = () => {
        if(isOriginFetch) {
            const filterInterests = newInterest.filter((ele)=> !originListRef.current.includes(ele))
            setNewInterest(filterInterests)
            setIsOriginFecth(false)
            originListRef.current = []
        } else {
            originListRef.current = profile.data.interests
            setNewInterest(prev => [
                ...new Set([...prev, ...originListRef.current])
            ])
            setIsOriginFecth(true)
        }
    }

    return(
        <SubWrap>
            {!profile &&
                <>
                <Skeleton width={150} height={22}/>
                <div className="mt-[10px]">
                    <Skeleton height={31}/>
                </div>
                <div className="mb-6">
                    <Skeleton height={31}/>
                </div>
                <div className="mb-6">
                    <Skeleton height={31}/>
                </div>
                <div className="mb-6">
                    <Skeleton height={31}/>
                </div>
                <div className="mb-6">
                    <Skeleton height={31}/>
                </div>
                <div className="mb-6">
                    <Skeleton height={31}/>
                </div>
                <div className="mb-6">
                    <Skeleton height={31}/>
                </div>
                <div className="mb-6">
                    <Skeleton height={31}/>
                </div>
                </>
            }
            {profile &&
            <>
            <Button type="button" $isOriginFetch={isOriginFetch} onClick={handleOriginFetch}>
                {isOriginFetch ? '현재 관심사를 불러왔어요!' : '현재 관심사를 불러올까요?'}
            </Button>
            <InterestList
            interest={newInterest}
            originList={originListRef}
            originFetch={isOriginFetch}
            setIsOriginFecth={setIsOriginFecth}
            setInterest={setNewInterest}
            />

             {/* <EditButtonInterest
            value={newInterest}
            loading={loading}
            onClick={handleSubmit} /> */}
            </>
            }
        </SubWrap>
    )
}