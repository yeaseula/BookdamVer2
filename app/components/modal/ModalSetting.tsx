import styled from "styled-components"
import ModalBack from "@/app/components/modal/ModalBack"


interface ModalProps {
    deleteState?: boolean
    onClose: ()=>void
    children: React.ReactNode
}

export default function SettingModal({onClose,children}:ModalProps) {
    return (
        <>
        <ModalBack onClick={onClose}></ModalBack>
        {children}
        </>
    )
}