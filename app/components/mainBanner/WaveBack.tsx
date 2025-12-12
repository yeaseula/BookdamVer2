"use client";

import styled, { keyframes } from "styled-components";

const Drift = keyframes`
    from {
        transform: rotate(0deg);
    }
    from {
        transform: rotate(360deg);
    }
`
const MainBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
`
const WaveWrap = styled.div`
    position: relative;
    width: 450px;
    aspect-ratio: 375/400;
    overflow: hidden;
`
const Wave = styled.div`
    opacity: 1;
    position: absolute;
    top: -253px;
    left: -77px;
    z-index: 3;
    background: var(--sub_color);
    width: 600px;
    height: 600px;
    margin-left: 0;
    margin-top: 0px;
    border-radius: 43%;
    animation: ${Drift} 7000ms infinite linear;
    @media(max-width:399px) {
        top: -270px;
        left: -122px;
    }
    @media (max-width: 340px) {
        top: -294px;
    }
`
const Wave2 = styled(Wave)`
    animation: ${Drift} 3000ms infinite linear;
    opacity: 0.1;
    background: black;
    z-index: 2;
`
const Wave3 = styled(Wave)`
    animation: drift 7500ms infinite linear;
    background-color: var(--main-color-dark);
    opacity: 0.7;
    z-index: 1;
`

export default function WaveBack() {
    return (
        <MainBackground>
            <WaveWrap>
                <Wave />
                <Wave2 />
                <Wave3 />
            </WaveWrap>
        </MainBackground>
    )
}