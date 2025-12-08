"use client"
import styled from "styled-components"
import InputCheck from "../../components/form/inputCheck"
import { Memo } from "@/app/lib/userfetch"
import PageError from "@/app/error/PageError"

const List = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    align-items: start;
    padding-top: 10px;
    gap: 10px;
    border-bottom: 1px solid #e0e0e0;
`
const ListInfo = styled.div`
    width: 100%;
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
    text-align: center;
`
const CheckBox = styled.div`
    position: absolute;
    right: 5px;
    top: 10px;
    z-index: 10;
`

export default function MemoContent({memo,setModal,modal,checkId}) {

    if(!memo.ok || memo.error) {
        return (
            <PageError />
        )
    }

    if(memo.data?.length === 0) {
        return (
            <EmptyMessage>등록된 글이 없습니다.</EmptyMessage>
        )
    }
    return (
        <>
            {memo.data?.map((m:Memo,idx:number)=>(
                <List key={`${m.title}-${idx}`}>
                    <CheckBox>
                        <InputCheck
                        type={'checkbox'}
                        name={'list-check'}
                        index={m.id}
                        checkId={checkId}
                        modal={modal}
                        setModal={setModal}
                        />
                    </CheckBox>
                    <ListInfo>
                        <blockquote className="w-[100%]">
                            <p className="text-[1.6rem;] max-w-[90%]">{m.content}</p>
                            <Cite><BookTitle>{m.title}</BookTitle> - <span>{m.page}</span> 페이지 중</Cite>
                        </blockquote>
                    </ListInfo>
                </List>
            ))}
        </>
    )
}