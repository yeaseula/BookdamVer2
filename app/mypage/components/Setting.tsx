import { RiWrenchLine, RiArrowRightSLine } from "@remixicon/react"
import { useState } from "react"
import styled from "styled-components"
import SettingModal from "./setting/Modal"
import ModalReviewSetting from "./setting/ModalReviewSetting"
import ModalCalendarSetting from "./setting/ModalCalendarSetting"
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

    const [calendarUI,setCalendarUI] = useState(false)
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
                    <ButtonStyle type="button">
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
                    <ButtonStyle type="button" onClick={()=>setCalendarUI(!calendarUI)}>
                        <span>캘린더 설정</span>
                        <RiArrowRightSLine size={18} />
                    </ButtonStyle>
                </li>
            </ul>
            {calendarUI &&
            <SettingModal
            title="캘린더 설정"
            onClose={()=>{setCalendarUI(false)}}
            ><ModalCalendarSetting />
            </SettingModal>
            }
            {reviewUI &&
            <SettingModal
            title="서재 화면 설정"
            onClose={()=>{setReviewUI(false)}}
            ><ModalReviewSetting />
            </SettingModal>
            }
        </>
    )
}