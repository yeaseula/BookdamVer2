"use client"
import styled from "styled-components"
import InputCheck from "../../components/form/inputCheck"
import { Books, Log } from "@/app/lib/userfetch"
import { RiAlarmFill } from "@remixicon/react"
import RecoardButton from "./RecoardButton"
import ProgressBar from "./ProgressBar"
import { useState } from "react"
import StopModal from "./stopwatch/StopModal"

const List = styled.div`
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
`


export default function ReadingContent({
    books, checkId, setCheckId,
    logWatchNum, setLogWatchNum,
    stopWatchNum, setStopWatchNum
}) {

    return (
        <>
            {!books && <EmptyMessage>등록된 글이 없습니다</EmptyMessage>}
            {books && (
                books.map((m:Books,idx:number)=>(
                <div className="mb-8" key={`${m.title}-${idx}`}>
                <List>
                    <div>
                        <InputCheck type={'checkbox'} name={'list-check'} index={m.id} checkId={checkId} setCheckId={setCheckId} />
                    </div>
                    <ListInfo>
                        <div className="w-[100%]">
                            <p className="font-bold">{m.title}</p>
                            <span className="text-xl font-medium"> 전체 {m.total_pages} 페이지 / 현재 {m.current_page} page</span>
                        </div>
                        <RecoardButton
                        index={m.id}
                        logWatchNum={logWatchNum}
                        setLogWatchNum={setLogWatchNum}
                        stopWatchNum={stopWatchNum}
                        setStopWatchNum={setStopWatchNum}
                        />
                    </ListInfo>
                </List>
                <ProgressBar total={m.total_pages} current={m.current_page} />
                </div>
                ))
            )}
        </>
    )
}