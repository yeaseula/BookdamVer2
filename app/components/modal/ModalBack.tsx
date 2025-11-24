import styled from "styled-components"

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
        <Container onClick={onClick}/>
    )
}