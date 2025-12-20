"use client"
import Link from "next/link"
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import { useNavStore } from "@/app/lib/useNavStore";
import { useAuthStore } from "@/app/lib/userfetch";

import { RiHome9Line, RiHome9Fill,
    RiDraftLine, RiDraftFill,
    RiEdit2Line, RiEdit2Fill,
    RiHeartAdd2Line, RiHeartAdd2Fill,
    RiUserHeartLine, RiUserHeartFill,
} from "@remixicon/react";


const NavWrap = styled.nav`
    max-width: 450px;
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 70;
`
const NavCont = styled.div`
    width: 100%;
    box-shadow: 0 -2px 15px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    flex-wrap: wrap;
    background-color: var(--board_background);
    border-top: 1px solid var(--color_light_gray);
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
`
const NavList = styled.div`
    flex: 1 1 20%;
    text-align: center;
    position: relative;
    z-index: 75;
`
const NavLink = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 0px;
    p {
        font-size: 1.2rem;
        color: var(--color_black);
    }
`
const BallBox = styled.div<{$trans}>`
    width: calc(100% / 5);
    height: 100%;
    position:absolute;
    top: 0;
    left: 0;
    z-index: 70;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateX(calc(100% * ${(p)=>p.$trans}));
    transition: all 0.35s
`
const Ball = styled.div<{$opaticy}>`
    position: relative;
    top: -5.5px;
    width: 65px;
    aspect-ratio: 1;
    height: auto;
    background-color: ${(p)=>p.$opaticy ? 'transparent' : 'var(--main-color)'};
    border-radius: 100%;
    box-shadow: ${(p)=>p.$opaticy ? 'none' : '0 2px 6px rgba(0,0,0,0.15)'};
`

const NAV_CONFIG = {
    '/' : {title: 'home' , type: 'normal'},
    '/login' : {title: 'login' , type: 'none'},
    '/signup' : {title: 'signup' , type: 'none'},
    '/guardNeedLogin' : {title: 'guard' , type: 'none'},
    '/guardLogin' : {title: 'guard' , type: 'none'},
    '/review': { title: '나의 리뷰', type: 'normal' },
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

export default function NavBar() {

    const animIcons = [
        {pages:'/', icon: RiHome9Line, active: RiHome9Fill, name: 'home'},
        {pages:'/review',icon: RiDraftLine, active:RiDraftFill, name: 'review'},
        {pages:'/memo', icon: RiEdit2Line, active:RiEdit2Fill, name: 'memo'},
        {pages:'/wish', icon: RiHeartAdd2Line, active:RiHeartAdd2Fill, name: 'wish'},
        {pages:'/mypage', icon: RiUserHeartLine, active:RiUserHeartFill, name: 'mypage'},
    ]

    const setNav = useNavStore((s)=>s.setNav)
    const { type } = useNavStore()
    const pathname = usePathname();
    const { hasGlobalError } = useAuthStore()
    const [opaticy, setOpacity] = useState(false)
    const [trans,setTrans] = useState(0)

    useEffect(()=>{
        if(pathname === '/') {
            setTrans(0)
            setOpacity(false)
        } else if(pathname === '/review') {
            setTrans(1)
            setOpacity(false)
        } else if(pathname === '/memo') {
            setTrans(2)
            setOpacity(false)
        } else if(pathname === '/wish') {
            setTrans(3)
            setOpacity(false)
        } else if(pathname === '/mypage' || pathname.includes('profileedit')) {
            setTrans(4)
            setOpacity(false)
        } else {
            setOpacity(true)
        }
    },[pathname])

    useEffect(() => {
        if(pathname.includes('review')) {
            setNav('나의 리뷰','normal')
            return
        }
        if (NAV_CONFIG[pathname]) {
            const { title, type } = NAV_CONFIG[pathname]
            setNav(title, type)
            return
        }
    }, [pathname])

    if(hasGlobalError) return null

    if(type === 'normal') {
        return (
            <NavWrap>
                <NavCont>
                    <BallBox $trans={trans}>
                        <Ball $opaticy={opaticy}/>
                    </BallBox>
                    {animIcons.map((icon,idx)=> (
                        <NavList key={`${idx}`}>
                            <NavLink href={icon.pages}>
                                {pathname === icon.pages ?
                                <icon.active size={24} style={{ color: 'var(--color_black)' }}/> :
                                <icon.icon size={24} style={{ color: 'var(--color_black)' }}/>
                                }
                                <p className="mt-1">{icon.name}</p>
                            </NavLink>
                        </NavList>
                    ))}
                </NavCont>
            </NavWrap>
        )
    }

    return null

}