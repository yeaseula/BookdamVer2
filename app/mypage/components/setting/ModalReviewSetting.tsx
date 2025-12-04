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

export default function ModalReviewSetting() {
    return (
        <>
            <ToggleList>
                <p>리스트형</p>
                    <ToggleSwitch
                    togglename={'list'}
                    />
            </ToggleList>
            <ToggleListLast>
                <p>갤러리형</p>
                    <ToggleSwitch
                    togglename={'gallery'}
                    />
            </ToggleListLast>
        </>
    )
}