import styled from "styled-components"
import { motion, Transition } from "motion/react"
import { useEffect, useState } from "react"
import { useSettingStore } from "@/app/lib/userfetch"

const SwitchContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
const Switch = styled.div<{$dataIsOn:boolean}>`
    width: 50px;
    background-color: ${(p)=>p.$dataIsOn ? 'gold' : '#bdbdbd'};
    display: flex;
    justify-content: ${(p)=>p.$dataIsOn ? 'flex-end' : 'flex-start'};
    border-radius: 50px;
    padding: 5px 7px;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0,0,0,0.12);
`

function bounceEase(x: number) {
    const n1 = 7.5625
    const d1 = 2.75

    if (x < 1 / d1) {
        return n1 * x * x
    } else if (x < 2 / d1) {
        return n1 * (x -= 1.5 / d1) * x + 0.75
    } else if (x < 2.5 / d1) {
        return n1 * (x -= 2.25 / d1) * x + 0.9375
    } else {
        return n1 * (x -= 2.625 / d1) * x + 0.984375
    }
}
const bounce: Transition = {
    duration: 1.2,
    ease: bounceEase,
}
const spring: Transition = {
    type: "spring",
    stiffness: 700,
    damping: 30,
}

export default function ToggleSwitch({isOn,onClick}) {

    return (
        <SwitchContainer>
            <Switch
                $dataIsOn={isOn}
                onClick={onClick}
            >
                <motion.div
                    className="ball"
                    layout
                    transition={isOn ? bounce : spring}
                    style={{
                        width: '11px',
                        height:'11px',
                        background: `${isOn ? 'var(--point-color)' : '#757575'}`,
                        borderRadius:'10px',
                        willChange:'transform'
                    }}
                />
            </Switch>
        </SwitchContainer>
    )
}