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
    onClickEdit: ()=>void;
    onClickDelete:()=>void;
}
export default function ModalBottom({
    onClickEdit,
    onClickDelete
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
        <ReactFocusLock>
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
            <div className="mt-8">
                <Button type="button" style={{ color: 'red' }}
                onClick={onClickDelete}>삭제</Button>
            </div>
        </ModalWrap>
        </ReactFocusLock>
        </motion.div>
        </>
    )
}