"use client"
import styled from "styled-components"
import ModalBack from "./ModalBack"
import Link from "next/link"
import { useParams } from "next/navigation"
import DeleteCheck from "./DeleteCheck"

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

export default function Modal({ state, setModal, deleteModalState, setDeleteModal}) {
    const params = useParams()

    const handleDeleteCheck = () => {
        setDeleteModal(false)
        setDeleteModal(false)
    }

    return (
        <>
        {(state || deleteModalState) && (
            <ModalBack onClick={()=>{setModal(false); setDeleteModal(false)}}/>
        )}
        {!deleteModalState && (
        <ModalWrap $state={state}>
            <div>
                <Text href={`/write?id=${params.id}`}>수정</Text>
            </div>
            <div className="mt-8">
                <Button type="button" style={{ color: 'red' }} onClick={()=>{setModal(false); setDeleteModal(true)}}>삭제</Button>
            </div>
        </ModalWrap>
        )}
        {deleteModalState && (
            <DeleteCheck onClick={handleDeleteCheck}/>
        )}
        </>

    )
}