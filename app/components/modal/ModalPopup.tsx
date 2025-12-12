import styled from "styled-components"
import {  RiCloseLine } from "@remixicon/react"
import { motion } from "framer-motion";
import ReactFocusLock from "react-focus-lock";

const Container = styled.div`
    padding: 28px 20px 35px;
    background: #fff;
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
    border-radius: 10px;
    background: var(--board_background);
    color: var(--color_black);
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

export default function ModalPopUp({title, onClose, children}) {
    return (
        <motion.div
            initial={{ opacity:0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeOut", duration: 0.25 }}
            style={{
                maxWidth: '380px',
                width: '100%',
                position: 'fixed',
                top: '50%',
                left: '50%',
                translateX: '-50%',
                translateY: '-50%',
                zIndex: 101
            }}
        >
        <ReactFocusLock returnFocus={true}>
        <Container>
            <Inner>
            <Title>{title}</Title>
            <Close onClick={onClose}>
                <RiCloseLine />
            </Close>
            {children}
            </Inner>
        </Container>
        </ReactFocusLock>
        </motion.div>
    )
}