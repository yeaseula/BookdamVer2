"use client"
import styled from "styled-components"
import InputCheck from "../form/inputCheck"

const List = styled.div`
    width: 100%;
    display: flex;
    align-items: start;
    padding-top: 10px;
    gap: 10px;
    border-bottom: 1px solid #e0e0e0;
`
const ListInfo = styled.div`
    width: 90%;
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
`
const Cite = styled.cite`
    display: block;
    margin-top: 10px;
    width: 100%;
    text-align: right;
`
const BookTitle = styled.span`
    font-size: 1.6rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
`

export default function ListItem() {
    return (
        <List data-idx="${idx}">
            <div>
                <InputCheck type={'checkbox'} name={'list-check'}></InputCheck>
            </div>
            <ListInfo>
                <blockquote className="w-[100%]">
                    <p className="text-[1.6rem;]">문제가 생기면 하나씩 해결해. 그러다 보면 집에 갈 수 있어.....</p>
                    <Cite><BookTitle>책제목</BookTitle> - <span>100</span> 페이지 중</Cite>
                </blockquote>
            </ListInfo>
        </List>
    )
}