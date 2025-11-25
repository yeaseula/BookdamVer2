import { RiDraftLine, RiArrowRightSLine } from "@remixicon/react"
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
    return (
        <>
            <h3 className="sr-only">내 정보 관리</h3>
            <MenuTitle><RiDraftLine size={24}></RiDraftLine> 내 정보</MenuTitle>
            <ul>
                <li>
                    <Buttonstyle>
                        <span>로그아웃</span>
                        <RiArrowRightSLine size={18} />
                    </Buttonstyle>
                </li>
            </ul>
            <ul>
                <li>
                    <LinkStyle href={'/'}>
                        <span>내 정보 변경</span>
                        <RiArrowRightSLine size={18} />
                    </LinkStyle>
                </li>
            </ul>
        </>
    )
}