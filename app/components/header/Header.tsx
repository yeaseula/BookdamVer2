"use client"
import styled from "styled-components"
import { RiArrowLeftLine } from "@remixicon/react"
import { useHeaderStore } from "@/app/lib/useHeaderStore"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import HeaderButton from "./HeaderButton"
import FloatWrite from "../common/Write"
import Search from "../common/Search"

const Container = styled.header`
    position: fixed;
    top:0;
    max-width: 450px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 55px;
    padding: 18px 0;
    background-color: #fff;
    border-bottom: 1px solid #e0e0e0;
    box-shadow: 0 0 16px rgba(0, 0, 0, .15);
    z-index: 99;
`
const Depth = styled.div`
    width: 100%;
    position: relative;
    padding: 0 15px;
    display: flex;
    justify-content: start;
    align-items: center;
`
const Title = styled.p`
    width: 60%;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 3;
    transform: translate(-50%, -50%);
    font-size: 1.8rem;
    font-weight: 700;
`

const HEADER_CONFIG = {
    '/' : {title: 'home' , type: 'none'},
    '/login' : {title: 'login' , type: 'none'},
    '/signup' : {title: 'signup' , type: 'none'},
    '/guard' : {title: 'guard' , type: 'none'},
    '/review': { title: '나의 리뷰', type: 'button' },
    '/write': { title: '리뷰 작성', type: 'normal' },
    '/memo': { title: '기억에 남는 구절', type: 'normal' },
    '/reading': { title: '읽고있는 책', type: 'normal' },
    '/mypage': { title: '프로필', type: 'normal' },
    '/profileedit': { title: '프로필 수정', type: 'normal' },
    '/profileedit/nickname': { title: '닉네임 수정', type: 'normal' },
    '/profileedit/email': { title: '이메일 수정', type: 'normal' },
    '/profileedit/pass': { title: '비밀번호 수정', type: 'normal' },
    '/profileedit/interest': { title: '관심사 수정', type: 'normal' },
    '/wish': { title: '읽고싶은 책', type: 'normal' },
} as const

export default function Header() {
    const pathname = usePathname()
    const setHeader = useHeaderStore(state => state.setHeader)
    const { title, type } = useHeaderStore()
    const router = useRouter();

    useEffect(() => {
        if (HEADER_CONFIG[pathname]) {
            const { title, type } = HEADER_CONFIG[pathname]
            setHeader(title, type)
            return
        }

    }, [pathname, setHeader])

    if(type === 'detail') {
        return (
            <Container>
                <Depth>
                    <button onClick={()=>router.back()}><RiArrowLeftLine size={20}></RiArrowLeftLine></button>
                    <Title>{title}</Title>
                    <HeaderButton />
                </Depth>
            </Container>
        )
    }
    if(type === 'normal') {
        return (
            <Container>
                <Depth>
                    <button onClick={()=>router.back()}><RiArrowLeftLine size={20}></RiArrowLeftLine></button>
                    <Title>{title}</Title>
                </Depth>
            </Container>
        )
    }
    if(type === 'button') {
        return (
            <Container>
                <Depth>
                    <button onClick={()=>router.back()}><RiArrowLeftLine size={20}></RiArrowLeftLine></button>
                    <Title>{title}</Title>
                    <Search />
                    <FloatWrite />
                </Depth>
            </Container>
        )
    }
    if(type === 'none') {
        return null
    }
}