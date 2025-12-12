"use client"
import styled from "styled-components"
import Link from "next/link"
import { useParams } from "next/navigation"
import { usePathname } from "next/navigation"
import ReactFocusLock from "react-focus-lock"
import { motion } from "framer-motion";


const ModalWrap = styled.div`
    padding: 30px;
    background: #fff;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background: var(--board_background);
    color: var(--color_black);
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
    padding: 8px 0;
`

interface ModalProps {
    onClickEdit?: ()=>void;
    onClickDelete:()=>void;
    onClickClose:()=>void
}
export default function ModalBottom({
    onClickEdit,
    onClickDelete,
    onClickClose
} : ModalProps) {
    const params = useParams()
    const pathname = usePathname()

    return (
        <>
        <motion.div
            initial={{ y: 150, opacity:0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 150, opacity: 0 }}
            transition={{ ease: "easeOut", duration: 0.25 }}
            style={{
                position: 'fixed',
                bottom: 0,
                left: '50%',
                translateX: '-50%',
                maxWidth: '450px',
                width: '100%',
                zIndex: 100
            }}
        >
        <ReactFocusLock
        returnFocus={true}
        >
        <ModalWrap>
            <div>
                {pathname === '/memo' ||
                pathname === '/reading' ||
                pathname ==='/wish' ? (
                    <Button type="button"
                    onClick={onClickEdit}>수정</Button>
                ) : (
                    <Text href={`/write?id=${params.id}`}>수정</Text>
                )}

            </div>
            <div className="mt-2">
                <Button type="button" style={{ color: 'red' }}
                onClick={onClickDelete}>삭제</Button>
            </div>
            <div className="mt-2 bg-gray-200 rounded-2xl text-gray-800">
                <Button type="button" onClick={onClickClose}>닫기</Button>
            </div>
        </ModalWrap>
        </ReactFocusLock>
        </motion.div>
        </>
    )
}