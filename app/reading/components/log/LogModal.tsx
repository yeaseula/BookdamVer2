import styled from "styled-components"
import ModalBack from "@/app/components/modal/ModalBack"
import { LogContainer, Card, Close, Title } from "../Modal.styled"
import { RiCloseLine } from "@remixicon/react"
import { Log } from "@/app/lib/userfetch"
import { Dispatch, SetStateAction } from "react";

const Th = styled.th`
    padding: 8px 0;
`
const Td = styled.td`
    padding: 5px 0;
    text-align: center;
    font-size: 1.3rem;
`

interface LogProps {
    logObj: Log[];
    setLogWatchNum: Dispatch<SetStateAction<string[]>>
}

export default function LogModal({logObj,setLogWatchNum}:LogProps) {
    const formatDuration = (sec) => {
        const h = Math.floor(sec / 3600);
        const m = Math.floor((sec % 3600) / 60);
        const s = sec % 60;

        if (h > 0) return `${h}시간 ${m}분 ${s}초`;
        if (m > 0) return `${m}분 ${s}초`;
        return `${s}초`;
    }

    return(
        <>
        <ModalBack onClick={()=>{}}></ModalBack>
        <LogContainer>
            <Card>
                <Close><RiCloseLine onClick={()=>{setLogWatchNum([])}}/></Close>
                <Title>독서 기록</Title>
                {logObj.length === 0 &&
                    <p className="text-center text-amber-50">독서 기록이 없습니다 😭</p>
                }
                {logObj.length !== 0 &&
                <table className="mt-4 text-amber-50">
                    <colgroup>
                        <col width={'20%'}></col>
                        <col width={'25%'}></col>
                        <col width={'55%'}></col>
                    </colgroup>
                    <thead>
                        <tr>
                            <Th>페이지</Th>
                            <Th>독서시간</Th>
                            <Th>날짜</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {logObj.map((ele,idx)=>(
                        <tr key={`${ele}=${idx}`}>
                            <Td>{ele.current_page}</Td>
                            <Td>{formatDuration(ele.duration_minutes)}</Td>
                            <Td>
                                {new Date(ele.created_at).toLocaleString("ko-KR", {
                                year:"numeric", month:"2-digit", day:"2-digit",
                                hour:"2-digit", minute:"2-digit", second:"2-digit",
                                hour12:false
                                }).replace(/\./g,"-")}
                            </Td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                }
            </Card>
        </LogContainer>
        </>
    )
}