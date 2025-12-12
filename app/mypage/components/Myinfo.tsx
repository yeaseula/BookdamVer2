"use client"

import { RiDraftLine } from "@remixicon/react"
import styled from "styled-components"
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

    const handleLogout = async() => {

        const { error } = await supabase.auth.signOut();
        if (error) return console.error("로그아웃 실패:", error);

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