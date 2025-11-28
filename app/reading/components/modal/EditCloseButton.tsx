import styled from "styled-components"
import { RiCloseLargeFill } from "@remixicon/react"

const ButtonStyle = styled.button`
    position: absolute;
    z-index: 999;
    top: -5px;
    right: 0;
    width: 24px;
    height: 24px;
    cursor: pointer;
`

export default function EditCloseButton({onClick}) {
    return (
        <ButtonStyle type="button" onClick={onClick}>
            <RiCloseLargeFill size={18}></RiCloseLargeFill>
        </ButtonStyle>
    )
}