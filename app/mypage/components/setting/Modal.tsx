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

interface ModalProps {
    title: string
    onClose: ()=>void
    children: React.ReactNode
}

export default function SettingModal({title,onClose,children}:ModalProps) {


    return (
        <>
        <ModalBack onClick={onClose}></ModalBack>
        <Container>
            <Inner>
            <Title>{title}</Title>
            <Close onClick={onClose}>
                <RiCloseLine />
            </Close>
            {children}
            </Inner>
        </Container>
        </>
    )
}