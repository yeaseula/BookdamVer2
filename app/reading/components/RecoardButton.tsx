import styled from "styled-components"
import { RiListView,RiAlarmFill } from "@remixicon/react"


const Stop = styled.button<{disabled:boolean}>`
    border-radius: 50%;
    background-color: ${(p)=>p.disabled ? '#bdbdbd' : 'var(--sub_color)'};
    position: absolute;
    top: 5px;
    right: 0;
    z-index: 20;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: ${(p)=>p.disabled ? 'initial' : 'pointer'};
`
const LogView = styled(Stop)`
    right: 38px;
`
export default function RecoardButton({index,stopWatchNum,setStopWatchNum}) {

    const stopIsValid = stopWatchNum.length === 0
    const handleWatch = (index) => {
        setStopWatchNum(prev=>[...prev,index])
    }

    return (
    <>
            <LogView
            type="button"
            aria-label="기록 보기 버튼"
            data-target={''}

            onClick={()=>{}}>
                <RiListView size={16} color="#fff" />
            </LogView>
            <Stop
            type="button"
            aria-label="스톱워치 버튼"
            data-target={index}
            disabled={!stopIsValid}
            onClick={()=>handleWatch(index)}>
                <RiAlarmFill size={18} color="#fff" />
            </Stop>
    </>
)}