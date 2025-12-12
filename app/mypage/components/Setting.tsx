import { RiWrenchLine } from "@remixicon/react"
import { useState } from "react"
import styled from "styled-components"
import SettingModal from "@/app/components/modal/ModalSetting"
import ModalPopUp from "@/app/components/modal/popup/ModalPopup"
import ModalReviewSetting from "./setting/ModalReviewSetting"
import ModalCalendarSetting from "./setting/ModalCalendarSetting"
import ModalFontSetting from "./setting/ModalFontSetting"
import ListItem from "../List"

const MenuTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 17px;
`

export default function Setting() {
    const [fontUI,setFontUI] = useState(false)
    const [calendarUI,setCalendarUI] = useState(false)
    const [reviewUI,setReviewUI] = useState(false)

const List = [
    { onClick: ()=>setFontUI(!fontUI), text: '폰트 설정'},
    { onClick: ()=>{}, text: '타이머 설정'},
    { onClick: ()=>setReviewUI(!reviewUI), text: '서재 화면 설정'},
    { onClick: ()=>setCalendarUI(!calendarUI), text: '캘린더 설정'},
]
    return (
        <>
            <MenuTitle><RiWrenchLine size={24} /> 시스템 설정</MenuTitle>
            <ul>
                {List.map((list,idx)=>(
                    <ListItem
                    key={`${idx}-${list.text}`}
                    onClick={list.onClick}
                    text={list.text} />
                ))}
            </ul>
            {fontUI &&
            <SettingModal
            onClose={()=>{setFontUI(false)}}>
                <ModalPopUp
                title={'폰트 설정'}
                onClose={()=>setFontUI(false)}>
                    <ModalFontSetting setFontUI={setFontUI} />
                </ModalPopUp>
            </SettingModal>
            }
            {calendarUI &&
            <SettingModal
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
            onClose={()=>{setReviewUI(false)}}>
                <ModalPopUp
                title={'서재 화면 설정'} onClose={()=>{setReviewUI(false)}}>
                    <ModalReviewSetting />
                </ModalPopUp>
            </SettingModal>
            }
        </>
    )
}