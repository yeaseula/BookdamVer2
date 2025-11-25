import { RiWrenchLine, RiArrowRightSLine } from "@remixicon/react"
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
const ButtonStyle = styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 500;
    font-size: 1.6rem;
    margin-bottom: 6px;
`

export default function Setting() {
    return (
        <>
            <MenuTitle><RiWrenchLine size={24} /> 시스템 설정</MenuTitle>
            <ul>
                <li>
                    <ButtonStyle>
                        <span>폰트 설정</span>
                        <RiArrowRightSLine size={18} />
                    </ButtonStyle>
                </li>
            </ul>
            <ul>
                <li>
                    <ButtonStyle>
                        <span>타이머 설정</span>
                        <RiArrowRightSLine size={18} />
                    </ButtonStyle>
                </li>
            </ul>
            <ul>
                <li>
                    <ButtonStyle>
                        <span>서재 화면 설정</span>
                        <RiArrowRightSLine size={18} />
                    </ButtonStyle>
                </li>
            </ul>
            <ul>
                <li>
                    <ButtonStyle>
                        <span>캘린더 설정</span>
                        <RiArrowRightSLine size={18} />
                    </ButtonStyle>
                </li>
            </ul>
        </>
    )
}