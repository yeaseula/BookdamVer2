"use client"
import styled from "styled-components"
import InputCheck from "../../components/form/inputCheck"
import { useEffect, useState } from "react"
import { Memo } from "@/app/type/Memo"

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
const EmptyMessage = styled.p`
    padding-bottom: 10px;
`

export default function MemoContent({memo,edit,setEdit}) {

    return (
        <>
            {!memo && <EmptyMessage>등록된 글이 없습니다</EmptyMessage>}
            {memo && (
                memo.map((m:Memo,idx:number)=>(
                <List key={`${m.title}-${idx}`}>
                    <div>
                        <InputCheck type={'checkbox'} name={'list-check'} index={m.id} edit={edit} setEdit={setEdit} />
                    </div>
                    <ListInfo>
                        <blockquote className="w-[100%]">
                            <p className="text-[1.6rem;]">{m.content}</p>
                            <Cite><BookTitle>{m.title}</BookTitle> - <span>{m.page}</span> 페이지 중</Cite>
                        </blockquote>
                    </ListInfo>
                </List>
                ))
            )}
        </>
    )
}