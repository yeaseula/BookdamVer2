import styled from "styled-components"
import StopWatch from "./StopWatch"
import { Books } from "@/app/lib/userfetch"
import ModalBack from "@/app/components/modal/ModalBack"



interface StopWatchProps {
    stopObj:Books
}

export default function StopModal({stopObj}:StopWatchProps) {
    return(
        <>


        <StopWatch stopObj={stopObj}></StopWatch>
        </>
    )
}