"use client"
import styled from "styled-components"
import { FireworkSpinner } from "./Spinner"

const Container = styled.div<{$isBlur:boolean}>`
    max-width: 450px;
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: calc((100% - 450px) / 2);
    z-index: 101;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(p)=>p.$isBlur ? 'rgba(255, 255, 255, 0.7)' : '#fff'};
    backdrop-filter: ${(p)=>p.$isBlur ? 'blur(4px)' : 'unset'};
    -webkit-backdrop-filter: ${(p)=>p.$isBlur ? 'blur(4px)' : 'unset'};
`

const Inner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
`


export default function SpinnerArea({ text, isBlur } : {text:string, isBlur?:boolean}) {
    return(
        <Container $isBlur={isBlur}>
            <Inner>
                <FireworkSpinner />
                <p className="mt-2 text-xl text-gray-600">{text}</p>
            </Inner>
        </Container>
    )
}