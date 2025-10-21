"use client"
import Link from "next/link"
import Lottie from 'lottie-react';
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import styled from "styled-components";

import home from '../../nav-animation/home.json'
import review from '../../nav-animation/review.json'
import memo from '../../nav-animation/memo.json'
import reading from '../../nav-animation/reading.json'
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
export default function NavBar() {

    const animIcons = [
        {pages:'home', name: home},
        {pages:'review',name: review},
        {pages:'memo', name: memo},
        {pages:'reading', name: reading},
        {pages:'mypage', name: mypage},
    ]

    const lottieRef = useRef({});
    const pathname = usePathname();
    const currentPath = pathname.slice(0) || '/'

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


    return(
        <NavWrap>
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