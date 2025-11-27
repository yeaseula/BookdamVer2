"use client"
import styled from "styled-components"
import InputCheck from "../../components/form/inputCheck"
import { Books, Log } from "@/app/lib/userfetch"
import { RiAlarmFill } from "@remixicon/react"
import { RiListView } from "@remixicon/react"

const List = styled.div`
    width: 100%;
    display: flex;
    align-items: start;
    padding-top: 10px;
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
const Stop = styled.button`
    border-radius: 50%;
    background-color: var(--sub_color);
    position: absolute;
    top: 5px;
    right: 0;
    z-index: 20;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`
const LogView = styled(Stop)`
    right: 38px;
`

export default function ReadingContent({books,checkId,setCheckId}) {

    return (
        <>
            {!books && <EmptyMessage>등록된 글이 없습니다</EmptyMessage>}
            {books && (
                books.map((m:Books,idx:number)=>(
                <List key={`${m.title}-${idx}`}>
                    <div>
                        <InputCheck type={'checkbox'} name={'list-check'} index={m.id} checkId={checkId} setCheckId={setCheckId} />
                    </div>
                    <ListInfo>
                        <div className="w-[100%]">
                            <p className="font-bold">{m.title}</p>
                            <span className="text-xl font-medium"> 전체 {m.total_pages} 페이지 / 현재 {m.current_page} page</span>
                        </div>
                        <LogView type="button" aria-label="기록 보기 버튼">
                            <RiListView size={16} color="#fff" />
                        </LogView>
                        <Stop type="button" aria-label="스톱워치 버튼">
                            <RiAlarmFill size={18} color="#fff" />
                        </Stop>
                    </ListInfo>
                </List>
                ))
            )}
        </>
    )
}