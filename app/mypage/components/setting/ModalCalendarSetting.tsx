import styled from "styled-components"
import ToggleSwitch from "./ToggleSwitch"


const ToggleList = styled.div`
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    width: 100%;
`
const ToggleListLast = styled(ToggleList)`
    margin-top: 15px;
`

export default function ModalCalendarSetting() {
    return(
        <>
            <ToggleList>
                <p>d</p>
                    <ToggleSwitch
                    togglename={'list'}
                    />
            </ToggleList>
            <ToggleListLast>
                <p>f</p>
                    <ToggleSwitch
                    togglename={'gallery'}
                    />
            </ToggleListLast>
        </>
    )
}