"use client"
import Link from "next/link"
import Lottie, {LottieRefCurrentProps} from 'lottie-react';
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import { useNavStore } from "@/app/lib/useNavStore";
import { useAuthStore } from "@/app/lib/userfetch";

import home from '../../nav-animation/home.json'
import review from '../../nav-animation/review.json'
import memo from '../../nav-animation/memo.json'
import wish from '../../nav-animation/wish.json'
import mypage from '../../nav-animation/mypage.json'

const NavWrap = styled.nav`
    max-width: 450px;
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 10;
`
const NavCont = styled.ul`
    width: 100%;
    padding: 11px 0px;
    box-shadow: 0 -2px 15px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    flex-wrap: wrap;
    background-color: #fafafa;
    border-top: 1px solid #fafafa;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
`
const NavList = styled.li`
    flex: 1 1 20%;
    text-align: center;
    position: relative;
`
const NavLink = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
        font-size: 1.3rem;
        color: #424242;
    }
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
        {pages:'home', name: home},
        {pages:'review',name: review},
        {pages:'memo', name: memo},
        {pages:'wish', name: wish},
        {pages:'mypage', name: mypage},
    ]
    const setNav = useNavStore((s)=>s.setNav)
    const { type } = useNavStore()
    const lottieRef = useRef<LottieRefCurrentProps>(null);
    const pathname = usePathname();
    const currentPath = pathname.slice(0) || '/'
    const { hasGlobalError } = useAuthStore()

    useEffect(() => {
        if (!lottieRef.current) return;

        if (currentPath == '/mypage') return;
        const frame = currentPath == '/mypage' ? 0 : 80;

        lottieRef.current.stop();

        setTimeout(() => {
            if (lottieRef.current) {
                lottieRef.current.goToAndStop(frame, true);
            }
        }, 0);
    }, [currentPath]);

    useEffect(() => {
        if (NAV_CONFIG[pathname]) {
            const { title, type } = NAV_CONFIG[pathname]
            setNav(title, type)
            return
        }
    }, [pathname])

    if(hasGlobalError) return null

    if(type === 'normal') {
        return(
            <NavWrap key={type}>
                <NavCont key={pathname}>
                    {animIcons.map((icon,idx)=>{
                        const pagename = icon.pages == 'home' ? '/' : `/${icon.pages}`;
                        const isMypage = icon.pages == 'mypage';

                        return <NavList key={icon.pages}>
                            <NavLink href={pagename}>
                            <Lottie
                                lottieRef={isMypage && lottieRef}
                                animationData={animIcons[idx].name}
                                loop={false}
                                autoplay={pagename == currentPath ? true : false}
                                className={`w-[40px] h-[40px] relative ${pagename == '/review'? 'top-[-4px]':''}`}
                            />
                            <p>{icon.pages}</p>
                            </NavLink>
                        </NavList>
                    })}
                </NavCont>
            </NavWrap>
        )
    }

    return null

}