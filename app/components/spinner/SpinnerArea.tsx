"use client"
import styled from "styled-components"
import { FireworkSpinner } from "./Spinner"

const Container = styled.div`
    max-width: 450px;
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center
`

const Inner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
`


export default function SpinnerArea({ text } : {text:string}) {
    return(
        <Container className="bg-white/70 backdrop-blur-sm z-101">
            <Inner>
                <FireworkSpinner />
                <p className="mt-2 text-xl text-gray-600">{text}</p>
            </Inner>
        </Container>
    )
}