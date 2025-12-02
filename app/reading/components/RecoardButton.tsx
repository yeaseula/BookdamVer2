import styled from "styled-components"
import { RiListView,RiAlarmFill } from "@remixicon/react"
import { useAuthStore } from "@/app/lib/userfetch"
import { Books } from "@/app/lib/userfetch"

const Stop = styled.button`
    border-radius: 50%;
    background-color:var(--sub_color);
    position: absolute;
    top: 5px;
    right: 0;
    z-index: 9;
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
export default function RecoardButton({index,logWatchNum,currentBooks,setLogWatchNum}) {


    const { isTimer } = useAuthStore()
    const setTimerObj = useAuthStore((state)=>state.setTimerObj)

    const handleWatch = (index:string) => {
        if(!isTimer) {
            const CheckStopObj:Books = currentBooks.find((m)=>m.id===index)

            setTimerObj("isTimer", true) // timer open
            setTimerObj("timeObj", CheckStopObj) //스톱워치 대상 book_id
        } else {
            alert('타이머를 사용중이에요!')
        }
    }
    const handleLog = (index:string) => {
        setLogWatchNum(prev=>[...prev,index])
    }

    return (
    <>
        <LogView
        type="button"
        aria-label="기록 보기 버튼"
        data-target={index}

        onClick={()=>handleLog(index)}>
            <RiListView size={16} color="#fff" />
        </LogView>
        <Stop
        type="button"
        aria-label="스톱워치 버튼"
        data-target={index}

        onClick={()=>handleWatch(index)}>
            <RiAlarmFill size={18} color="#fff" />
        </Stop>
    </>
)}