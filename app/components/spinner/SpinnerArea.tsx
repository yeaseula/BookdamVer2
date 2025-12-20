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
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(p)=>p.$isBlur ? 'rgba(255, 255, 255, 0.7)' : '#fff'};
    backdrop-filter: ${(p)=>p.$isBlur ? 'blur(4px)' : 'unset'};
    -webkit-backdrop-filter: ${(p)=>p.$isBlur ? 'blur(4px)' : 'unset'};
    @media(max-width:450px) {
        left: 0;
    }
    `
const Inner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
`
interface SpinnerProps {
    text: string
    isBlur?: boolean
    announce?: boolean
}

export default function SpinnerArea({ text, isBlur, announce = false }:SpinnerProps) {
    return(
        <Container $isBlur={isBlur} className="spinArea">
            <Inner>
                <div aria-hidden="true">
                <FireworkSpinner />
                </div>
                {announce ? (
                    <p role="status" aria-live="polite" className="mt-2 text-xl text-gray-600">
                        {text}
                    </p>
                ) : (
                    <p aria-hidden="true" className="mt-2 text-xl text-gray-600">{text}</p>
                )}
            </Inner>
        </Container>
    )
}