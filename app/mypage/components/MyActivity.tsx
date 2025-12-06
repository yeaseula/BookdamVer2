import { RiEmpathizeFill } from "@remixicon/react"
import styled from "styled-components"
import ListItem from "../List"

const MenuTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 17px;
`

export default function MyActivity() {

    const List = [
        { href: '/memo', text: '기억에 남는 구절'},
        { href: '/review', text: '리뷰 목록'},
        { href: '/wish', text: '읽고싶은 책'},
        { href: '/reading', text: '읽는중인 책'},
    ]

    return (
        <>
            <MenuTitle><RiEmpathizeFill size={24} /> 나의 활동</MenuTitle>
            <ul>
                {List.map((list,idx)=>(
                    <ListItem
                    key={`${idx}-${list.text}`}
                    href={list.href}
                    text={list.text} />
                ))}
            </ul>
        </>
    )
}