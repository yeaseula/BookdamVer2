import { RiWrenchLine, RiArrowRightSLine } from "@remixicon/react"
import { useEffect, useState } from "react"
import styled from "styled-components"
import SettingModal from "@/app/components/modal/ModalSetting"
import ModalPopUp from "@/app/components/modal/popup/ModalPopup"
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
            type="popup"
            onClose={()=>{setCalendarUI(false)}}>
                <ModalPopUp
                title={'캘린더 설정'}
                onClose={()=>setCalendarUI(false)}>
                    <ModalCalendarSetting />
                </ModalPopUp>
            </SettingModal>
            }
            {reviewUI &&
            <SettingModal
            type="popup"
            onClose={()=>{setReviewUI(false)}}>
                <ModalPopUp
                title={'서재 화면 설정'} onClose={()=>{setReviewUI(false)}}>
                    <ModalReviewSetting />
                </ModalPopUp>
                <ModalReviewSetting />
            </SettingModal>
            }
        </>
    )
}