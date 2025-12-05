import styled from "styled-components"

const ModalWrap = styled.div`
    position: fixed;
    bottom: 0;
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

export default function ModalBottom() {
    return(
        <ModalWrap>ddd</ModalWrap>
    )
}