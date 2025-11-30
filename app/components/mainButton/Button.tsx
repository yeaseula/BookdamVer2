import styled from "styled-components";
import Link from "next/link";
import { RiAddLargeLine } from "@remixicon/react";
import { useState } from "react";

interface Props{
    href?: string;
    title: string;
    buttonText: string;
    isContent: boolean;
    onClick?:()=>void;
}
const GoReview = styled(Link)<{$isContent:boolean}>`
    position: relative;
    overflow: hidden;
    width: ${(p)=>p.$isContent ? '100%' : 'calc(50% - 10px)'};
    height: ${(p)=>p.$isContent ? 'calc(50% - 10px)' : 'auto'};
    background: var(--main-color-light);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 15px;
    border-radius: 10px;
`
const BackImage = styled.div<{$isActive:boolean}>`
    width: ${(p)=>p.$isActive ? '100%' :'72px'};
    height: ${(p)=>p.$isActive ? '100%' :'72px'};
    transition: all 0.3s;
    background:  ${(p)=>p.$isActive ? 'var(--point-color)' :'#eeeeee'};
    border-radius: ${(p)=>p.$isActive ? '0' :'50%'};
    box-shadow: 0 4px 10px rgba(0,0,0,0.25);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: ${(p)=>p.$isActive ? '0' :'-15px'};
    right: ${(p)=>p.$isActive ? '0' :'-15px'};
`
const Icon = styled(RiAddLargeLine)<{$isActive:boolean}>`
    color: ${(p)=>p.$isActive ? '#fff' :'#757575'};
`


export default function Button({href,title,buttonText,isContent,onClick}:Props) {

    const [isActive,setIsActive] = useState(false)

    return (
        <GoReview href={href} $isContent={isContent}>
                <p className="text-xl">{title}</p>
                <span className="font-bold">{buttonText}</span>
                <BackImage
                onMouseEnter={()=>setIsActive(true)}
                onMouseLeave={()=>setIsActive(false)}
                $isActive={isActive}><Icon $isActive={isActive}/></BackImage>
        </GoReview>
    )
}