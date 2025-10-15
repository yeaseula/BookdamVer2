"use client"
import Link from "next/link"
import Lottie from 'lottie-react';
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import styled from "styled-components";

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
    const AnimationLogos = {
        home: 'home.json',
        review: 'review.json',
        memo: 'memo.json',
        reading: 'reading.json',
        mypage: 'mypage.json'
    }
    const [animationCurrent,setAnimationCurrent] = useState([])
    const lottieRef = useRef();
    const pathname = usePathname();
    const currentPath = pathname.slice(1) || '/';

    // useEffect(() => {
    //     console.log('페이지 바뀜!!!', pathname)
    //     console.log('루트!!!', currentPath)
    // }, [pathname]);

    useEffect(()=>{
        const Func = async (current) => {
            try {
                const animation = await fetch(`/nav-animation/${current}.json`);
                if(!animation.ok) return;
                const res = await animation.json();
                if(!res) return;
                setAnimationCurrent(prev=>[...prev, {[current] : res}])
            }
            catch(err) {
                console.error('파일 로드 실패')
            }
        }

        Object.keys(AnimationLogos).map((current)=>{
            Func(current)
        })
    },[])

    return(
        <NavWrap>
            <NavCont key={pathname}>
                {animationCurrent.map(icon => {
                    const key = Object.keys(icon);
                    const pagename = key == 'home' ? '/' : key;
                    //console.log(`${pagename} key값`)
                    return <NavList key={key}>
                        <NavLink href={`${key == 'home'? '/' : key}`}>
                        <Lottie
                        lottieRef={(ele)=>lottieRef.current[key] = ele}
                        animationData={icon[key]}
                        loop={false}
                        autoplay={pagename == currentPath ? true : false}
                        style={{ width: '40px', height: '40px' }}
                        />
                        <p>{key}</p>
                        </NavLink>
                    </NavList>
                })}
            </NavCont>
        </NavWrap>
    )
}