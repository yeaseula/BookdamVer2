"use client"
import styled from "styled-components"
import ModalBack from "./ModalBack"
import Link from "next/link"
import { useParams } from "next/navigation"
import DeleteCheck from "./DeleteCheck"
import { usePathname } from "next/navigation"
import { Dispatch, SetStateAction } from "react"

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
const Text = styled(Link)`
    display: block;
    width: 100%;
    font-size: 1.8rem;
    text-align: center;
    cursor: pointer;
`
const Button = styled.button`
    width: 100%;
    font-size: 1.8rem;
    text-align: center;
    cursor: pointer;
`

interface ModalProps {
    state: boolean;
    setModal: Dispatch<SetStateAction<boolean>>;
    deleteModal: boolean;
    setDeleteModal: Dispatch<SetStateAction<boolean>>;
    EditPopup?: boolean;
    setEditPopup?: Dispatch<SetStateAction<boolean>>;
    checkIdRef?: React.RefObject<string[]>;
    onClickEdit?: ()=>void;
}

export default function Modal({
    state,
    setModal,
    deleteModal,
    setDeleteModal,
    checkIdRef,
    onClickEdit
} : ModalProps) {
    const params = useParams()
    const pathname = usePathname()

    const handleDeleteCheck = () => {
        setDeleteModal(false)
    }

    return (
        <>
        {(state || deleteModal) && (
            <ModalBack onClick={()=>{setModal(false); setDeleteModal(false)}}/>
        )}
        {!deleteModal && (
        <ModalWrap $state={state}>
            <div>
                {pathname === '/memo' || pathname === '/reading' || pathname ==='/wish' ? (
                    <Button type="button"
                    onClick={onClickEdit}>수정</Button>
                ) : (
                    <Text href={`/write?id=${params.id}`}>수정</Text>
                )}

            </div>
            <div className="mt-8">
                <Button type="button" style={{ color: 'red' }}
                onClick={()=>{setModal(false); setDeleteModal(true)}}>삭제</Button>
            </div>
        </ModalWrap>
        )}
        {deleteModal && (
            <DeleteCheck
            checkIdRef={checkIdRef}
            setDeleteModal={setDeleteModal}
            onClick={handleDeleteCheck}
            />
        )}
        </>

    )
}