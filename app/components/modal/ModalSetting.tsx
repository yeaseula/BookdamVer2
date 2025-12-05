import styled from "styled-components"
import {  RiCloseLine } from "@remixicon/react"
import ModalBack from "@/app/components/modal/ModalBack"

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

interface ModalProps {
    type: 'popup' | 'bottom' | 'stopwatch'
    onClose: ()=>void
    children: React.ReactNode
}

export default function SettingModal({type,onClose,children}:ModalProps) {
    return (
        <>
        <ModalBack onClick={onClose}></ModalBack>
        {type == 'popup' && (
            <Container>{children}</Container>
        )}
        {type == 'bottom' && (
            <>{children}</>
        )}

        </>
    )
}