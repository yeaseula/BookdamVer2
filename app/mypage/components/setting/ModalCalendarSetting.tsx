import styled from "styled-components"
import ToggleSwitch from "./ToggleSwitch"



export default function ModalCalendarSetting() {
    return(
        <>
        <div>
            <p>시작일 선택</p>
            <label htmlFor="start-sun">일요일부터 시작</label>
            <input type="radio" id="start-sun" name="calendar" value={'sun'} checked/>
            <label htmlFor="start-mon">월요일부터 시작</label>
            <input type="radio" id="start-mon" name="calendar" value={'mon'}/>
        </div>
        <div>
            <p>도장 선택</p>
            <label htmlFor="stamp-star">별도장</label>
            <input type="radio" id="stamp-star" name="stamp" value={'star'} checked/>
            <label htmlFor="stamp-gook">발자국도장</label>
            <input type="radio" id="stamp-gook" name="stamp" value={'gook'}/>
        </div>
        </>
    )
}