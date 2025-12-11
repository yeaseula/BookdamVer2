import styled from "styled-components"
import { motion } from "framer-motion";

const Container = styled.div`
    width: 100%;
    max-width: 450px;
    height: 100%;
    background-color: rgba(0,0,0, 0.15);
    position: fixed;
    top:0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99;
`

export default function ModalBack({onClick}) {
    return (
        <motion.div
            key={"modal"}
            initial={{ y: -30, height: '100vh', opacity:0 }}
            animate={{ y: 0, height: '100vh', opacity: 1 }}
            exit={{ y: -30, height: '100vh', opacity: 0 }}
            transition={{ ease: "easeOut", duration: 0.25 }}
            style={{
                width: '100%',
                height: '100vh',
                position: 'fixed',
                top:0,
                left:0,
                zIndex: 99,
            }}
        >
            <Container onClick={onClick}/>
        </motion.div>
    )
}