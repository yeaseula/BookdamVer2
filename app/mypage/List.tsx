import styled from "styled-components"
import Link from "next/link"
import { RiArrowRightSLine } from "@remixicon/react"

const LinkStyle = styled(Link)`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 500;
    font-size: 1.6rem;
    margin-bottom: 6px;
`
const ButtonStyle = styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 500;
    font-size: 1.6rem;
    margin-bottom: 6px;
    cursor: pointer;
`

interface ListProps {
    href? : string
    text: string
    onClick?: ()=>void
}

export default function ListItem({href, text, onClick}:ListProps) {
    if(href) {
        return (
            <li>
                <LinkStyle href={href}>
                    <span>{text}</span>
                    <RiArrowRightSLine size={18} />
                </LinkStyle>
            </li>
        )
    }
    if(onClick) {
        return (
            <ButtonStyle type="button" onClick={onClick}>
                <span>{text}</span>
                <RiArrowRightSLine size={18} />
            </ButtonStyle>
        )
    }
}