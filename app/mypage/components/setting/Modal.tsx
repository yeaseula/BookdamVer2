import styled from "styled-components"
import {  RiCloseLine } from "@remixicon/react"
import ModalBack from "@/app/components/modal/ModalBack"
import ToggleSwitch from "./ToggleSwitch"
import { useState } from "react"

const Container = styled.div`
    max-width: 380px;
    width: 100%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 100;
    padding: 28px 20px 35px;
    background: #fff;
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
    border-radius: 10px;
`
const Inner = styled.div`
    position: relative;
`
const Title = styled.h2`
    font-size: 1.8rem;
    text-align: center;
    font-weight: 600;
`
const Close = styled.button`
    position:absolute;
    top: 0;
    right: 0;
    z-index: 25;
    cursor: pointer;
`
const ToggleList = styled.div`
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    width: 100%;
`
const ToggleListLast = styled(ToggleList)`
    margin-top: 15px;
`

export default function SettingModal({setReviewUI}) {


    return (
        <>
        <ModalBack onClick={()=>{setReviewUI(false)}}></ModalBack>
        <Container>
            <Inner>
            <Title>서재 화면 설정</Title>
            <Close onClick={()=>setReviewUI(false)}>
                <RiCloseLine />
            </Close>
            <ToggleList>
                <p>리스트형</p>
                    <ToggleSwitch
                    togglename={'list'}
                    />
            </ToggleList>
            <ToggleListLast>
                <p>갤러리형</p>
                    <ToggleSwitch
                    togglename={'gallery'}
                    />
            </ToggleListLast>
            </Inner>
        </Container>
        </>
    )
}