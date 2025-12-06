"use client"

import { RiDraftLine } from "@remixicon/react"
import styled from "styled-components"
import { useAuthStore,Reviews,Memo,Wish,Log,Books } from "@/app/lib/userfetch"
import createClient from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import ListItem from "../List"

const MenuTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 17px;
`
export default function Myinfo() {
    const supabase = createClient()
    const router = useRouter()

    const setSession = useAuthStore((state)=>state.setSession)
    const setProfile = useAuthStore((state)=>state.setProfile)
    const setData = useAuthStore((state)=>state.setData)

    const handleLogout = async() => {

        const { error } = await supabase.auth.signOut();
        if (error) return console.error("로그아웃 실패:", error);

        setSession(null)
        setProfile(null)
        setData<Reviews>('reviews',[])
        setData<Memo>('memo',[])
        setData<Books>('books',[])
        setData<Log>('log',[])
        setData<Wish>('wish',[])

        router.push('/login')
    }

    const List = [
        { onClick: handleLogout, text: '로그아웃'},
        { href: '/profileedit', text: '내 정보 변경'},
    ]

    return (
        <>
            <MenuTitle><RiDraftLine size={24}></RiDraftLine> 내 정보</MenuTitle>
            <ul>
                {List.map((list,idx)=>(
                    <ListItem
                    key={`${idx}-${list.text}`}
                    href={list.href}
                    onClick={list.onClick}
                    text={list.text} />
                ))}
            </ul>
        </>
    )
}