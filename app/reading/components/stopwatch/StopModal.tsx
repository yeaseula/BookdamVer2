import styled from "styled-components"
import StopWatch from "./StopWatch"
import { Books } from "@/app/lib/userfetch"
import ModalBack from "@/app/components/modal/ModalBack"
import { Dispatch, SetStateAction } from "react"



interface StopWatchProps {
    setStopWatchNum:Dispatch<SetStateAction<string[]>>
    stopObj:Books
}

export default function StopModal({setStopWatchNum,stopObj}:StopWatchProps) {
    return(
        <>


        <StopWatch stopObj={stopObj} setStopWatchNum={setStopWatchNum}></StopWatch>
        </>
    )
}