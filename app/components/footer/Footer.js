"use client"
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { useState } from "react";

const FooterCont = styled.footer`
    background-color: #fafafa;
    padding: 20px 7px;
    padding-bottom: 110px;
`
const LogoBox = styled.div`
    width: 86px;
    margin: 0 auto;
`
const FooterMenu = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin: 15px auto 10px;
`
const FooterMenuCont = styled.li`
    font-size: 1.4rem;
    color: #424242;
`
const Bar = styled.span`
    display: inline-block;
    position: relative;
    top: 1px;
    width: 1px;
    height: 9px;
    background-color: #e0e0e0;
`
const FooterToggle = styled.p`
    text-align: center;
    font-size: 1.4rem;
    color: #424242;
    cursor: pointer;
`
const CopyRightDropDown = styled.ul`
    opacity: ${(props) => props.$togglestate ? '1' : '0'};
    height: ${(props) => props.$togglestate? '90px' : '0'};
    padding-top: ${(props) => props.$togglestate? '15px' : '0'};
    transition: 0.2s
`
const CopyDepth = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-bottom: 5px;

    span {
        font-size: 1.4rem;
        color: #424242;
    }
`
const CopyrightText = styled.p`
    margin-top: 20px;
    text-align: center;
    font-size: 1.4rem;
    color: #424242;
`
export default function Footer() {
    const [toggleState,setToggleState] = useState(false);

    return (
        <FooterCont>
        <LogoBox>
            <Image src={'/images/main-logo.svg'}
            alt={'logo'}
            width={86}
            height={43}/>
        </LogoBox>
        <FooterMenu>
            <FooterMenuCont><Link href="#"><span>이용약관</span></Link></FooterMenuCont>
            <FooterMenuCont><Bar /></FooterMenuCont>
            <FooterMenuCont><Link href="#"><span>개인정보처리방침</span></Link></FooterMenuCont>
        </FooterMenu>
        <FooterToggle onClick={()=>{setToggleState(!toggleState)}}>개발자 정보</FooterToggle>
        <CopyRightDropDown $togglestate={toggleState}>
            <CopyDepth><span>이름</span> <Bar /> <span>김예슬</span></CopyDepth>
            <CopyDepth><span>git hub</span> <Bar /> <span>www.github/yeaseula</span></CopyDepth>
            <CopyDepth><span>Email</span> <Bar /> <span>kminea@naver.com</span></CopyDepth>
        </CopyRightDropDown>
        <CopyrightText>Copyright 2025. 책담 All rights reserved.</CopyrightText>
        </FooterCont>
    )
}