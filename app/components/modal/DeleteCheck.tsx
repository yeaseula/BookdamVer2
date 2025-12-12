"use client"
import styled from "styled-components"
import { motion } from "framer-motion"
import ReactFocusLock from "react-focus-lock"

const Container = styled.div`
    width: 300px;
    background: #fff;
    border-radius: 10px;
    text-align: center;
    padding: 35px 20px;
    background: var(--board_background);
`
const ButtonStyle = styled.button`
    width: 80px;
    height: 34px;
    background-color: #fff;
    border-radius: 5px;
    color: var(--sub_color);
    font-size: 1.4rem;
    border: 1px solid var(--sub_color);
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
        box-shadow: 0 4px 10px rgba(0,0,0, 0.1)
    }
    &:disabled {
        background-color: #e0e0e0 !important;
        border : 1px solid #e0e0e0 !important;
        color: #bdbdbd !important;
        cursor: initial;
        &: hover {
            box-shadow: none;
        }
    }
`
const ButtonStyleDark = styled(ButtonStyle)`
    background-color: var(--sub_color);
    color: #fff;
`

export default function DeleteCheck({onReject,onItemDelete,loading}) {

    return (
        <>
        <motion.div
            initial={{ opacity:0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeOut", duration: 0.15 }}
            style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                translateY: '-50%',
                translateX: '-50%',
                maxWidth: '300px',
                width: '100%',
                zIndex: 100
            }}
        >
            <ReactFocusLock returnFocus={true}>
            <Container>
                <h2 className="text-3xl font-bold" style={{ color: 'var(--color_black)' }}>게시물을 삭제할까요?</h2>
                <div className="flex justify-center gap-3 mt-10">
                    <ButtonStyle
                    type="button"
                    disabled={loading}
                    onClick={onItemDelete}>예</ButtonStyle>
                    <ButtonStyleDark
                    type="button"
                    disabled={loading}
                    onClick={onReject}>아니오</ButtonStyleDark>
                </div>
            </Container>
            </ReactFocusLock>
        </motion.div>
        </>
    )
}