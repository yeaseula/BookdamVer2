"use client"
import styled from "styled-components"
import InputCheck from "../../components/form/inputCheck"
import { Books } from "@/app/lib/userfetch"
import RecoardButton from "./RecoardButton"
import ProgressBar from "./ProgressBar"
import { throwSupabaseError } from "@/app/error/errorLibrary"

const List = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    align-items: start;
    padding: 10px 0 0 0;
    gap: 10px;
    border-bottom: 1px solid #e0e0e0;
`
const ListInfo = styled.div`
    position: relative;
    width: 90%;
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
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

export default function ReadingContent({
    books, checkId,
    modal, setModal,
    logWatchNum, setLogWatchNum,
    currentBooks
}) {

    if(!books.ok || books.error) {
        throwSupabaseError(books.error)
    }

    if(books.data?.length === 0) {
        return (
            <EmptyMessage>등록된 글이 없습니다</EmptyMessage>
        )
    }

    return (
        <>
        {books.data?.map((m:Books,idx:number)=>(
            <div className="mb-8" key={`${m.title}-${idx}`}>
            <List>
                <CheckBox>
                    <InputCheck
                    type={'checkbox'}
                    name={'list-check'}
                    index={m.id}
                    modal={modal}
                    setModal={setModal}
                    checkId={checkId} />
                </CheckBox>
                <ListInfo>
                    <div className="w-[100%]">
                        <p className="font-bold w-[80%]">{m.title}</p>
                        <span className="text-xl font-medium"> 전체 {m.total_pages} 페이지 / 현재 {m.current_page} page</span>
                    </div>
                    <RecoardButton
                    index={m.id}
                    logWatchNum={logWatchNum}
                    setLogWatchNum={setLogWatchNum}
                    currentBooks={currentBooks}
                    />
                </ListInfo>
            </List>
            <ProgressBar total={m.total_pages} current={m.current_page} />
            </div>
            ))}
        </>
    )
}