"use client"
import styled from "styled-components"
import { FireworkSpinner } from "./Spinner"

const Container = styled.div<{$isLoading:boolean}>`
    max-width: 450px;
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: calc((100% - 450px) / 2);
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: ${(p)=>p.$isLoading ? 99 : -99};
    opacity: ${(p)=>p.$isLoading ? 1 : 0};
    background-color: var(--board_background);
    color: var(--color_black);
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
    isLoading: boolean
    isBlur?: boolean
    announce?: boolean
}

export default function SpinnerArea({ text,isLoading,announce = false }:SpinnerProps) {
    return(
        <Container $isLoading={isLoading} className="spinArea">
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