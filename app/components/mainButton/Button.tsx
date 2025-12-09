import styled from "styled-components";
import Link from "next/link";
import { RiAddLargeLine } from "@remixicon/react";
import { useState } from "react";

interface Props{
    href?: string;
    title: string;
    buttonText: string;
    onClick?:()=>void;
}
const GoReview = styled(Link)`
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    min-height: 70px;
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


export default function Button({href,title,buttonText,onClick}:Props) {

    const [isActive,setIsActive] = useState(false)

    return (
        <GoReview href={href}>
                <p className="text-xl">{title}</p>
                <span className="font-bold">{buttonText}</span>
                <BackImage
                onMouseEnter={()=>setIsActive(true)}
                onMouseLeave={()=>setIsActive(false)}
                $isActive={isActive}><Icon $isActive={isActive}/></BackImage>
        </GoReview>
    )
}