import { RiEmpathizeFill, RiArrowRightSLine } from "@remixicon/react"
import Link from "next/link"
import styled from "styled-components"

const MenuTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 17px;
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

export default function MyActivity() {
    return (
        <>
            <MenuTitle><RiEmpathizeFill size={24} /> 나의 활동</MenuTitle>
            <ul>
                <li>
                    <LinkStyle href={'/memo'}>
                        <span>기억에 남는 구절</span>
                        <RiArrowRightSLine size={18} />
                    </LinkStyle>
                </li>
                <li>
                    <LinkStyle href={'/review'}>
                        <span>리뷰 목록</span>
                        <RiArrowRightSLine size={18} />
                    </LinkStyle>
                </li>
                <li>
                    <LinkStyle href={'/wish'}>
                        <span>읽고싶은 책</span>
                        <RiArrowRightSLine size={18} />
                    </LinkStyle>
                </li>
                <li>
                    <LinkStyle href={'/reading'}>
                        <span>읽는중인 책</span>
                        <RiArrowRightSLine size={18} />
                    </LinkStyle>
                </li>
            </ul>
        </>
    )
}