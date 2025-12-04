import { RiWrenchLine, RiArrowRightSLine } from "@remixicon/react"
import { useState } from "react"
import styled from "styled-components"
import SettingModal from "./setting/Modal"

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
    cursor: pointer;
`

export default function Setting() {

    const [reviewUI,setReviewUI] = useState(false)

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
                <li>
                    <ButtonStyle>
                        <span>타이머 설정</span>
                        <RiArrowRightSLine size={18} />
                    </ButtonStyle>
                </li>
                <li>
                    <ButtonStyle type="button" onClick={()=>setReviewUI(!reviewUI)}>
                        <span>서재 화면 설정</span>
                        <RiArrowRightSLine size={18} />
                    </ButtonStyle>
                </li>
                <li>
                    <ButtonStyle>
                        <span>캘린더 설정</span>
                        <RiArrowRightSLine size={18} />
                    </ButtonStyle>
                </li>
            </ul>
            {reviewUI && <SettingModal setReviewUI={setReviewUI}/>}
        </>
    )
}