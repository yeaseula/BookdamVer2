"use client"

import { RiDraftLine, RiArrowRightSLine } from "@remixicon/react"
import Link from "next/link"
import styled from "styled-components"
import { useAuthStore,Reviews,Memo,Wish,Log,Books } from "@/app/lib/userfetch"
import createClient from "@/utils/supabase/client"
import { useRouter } from "next/navigation"

const MenuTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 17px;
`
const Buttonstyle = styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 500;
    font-size: 1.6rem;
    margin-bottom: 10px;
    cursor: pointer;
    margin-bottom: 6px;
`
const LinkStyle = styled(Link)`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 500;
    font-size: 1.6rem;
    margin-bottom: 6px;
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

    return (
        <>
            <h3 className="sr-only">내 정보 관리</h3>
            <MenuTitle><RiDraftLine size={24}></RiDraftLine> 내 정보</MenuTitle>
            <ul>
                <li>
                    <Buttonstyle onClick={handleLogout}>
                        <span>로그아웃</span>
                        <RiArrowRightSLine size={18} />
                    </Buttonstyle>
                </li>
            </ul>
            <ul>
                <li>
                    <LinkStyle href={'/profileedit'}>
                        <span>내 정보 변경</span>
                        <RiArrowRightSLine size={18} />
                    </LinkStyle>
                </li>
            </ul>
        </>
    )
}