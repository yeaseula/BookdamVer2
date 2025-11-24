"use client"
import styled from "styled-components"
import ModalBack from "./ModalBack"

const ModalWrap = styled.div<{$state:boolean}>`
    position: fixed;
    bottom: ${(p)=>p.$state ? '0' : '-150px'};
    left: 50%;
    transform: translateX(-50%);
    max-width: 450px;
    width: 100%;
    transition: 0.2s;
    padding: 30px;
    background: #fff;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    z-index: 200;
`
const Button = styled.button`
    width: 100%;
    font-size: 1.8rem;
    text-align: center;
    cursor: pointer;
`

export default function Modal({onClick, state}) {
    return (
        <>
        {state && (
            <ModalBack onClick={onClick}/>
        )}
        <ModalWrap $state={state}>
            <div>
                <Button type="button">수정</Button>
            </div>
            <div className="mt-8">
                <Button type="button" style={{ color: 'red' }}>삭제</Button>
            </div>
        </ModalWrap>
        </>

    )
}