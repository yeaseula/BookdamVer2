import styled, { createGlobalStyle } from "styled-components";

export const CommonWrap = styled.div`
    position: relative;
    width: 100%;
    background-color: var(--color_white);
    box-shadow: 0 -2px 15px 0 rgba(0, 0, 0, 0.1);
    overflow-x: hidden;
`

export const Main = styled.div`
    position: relative;
    background-color: var(--board_background);
`

export const SubWrap = styled.div`
    position: relative;
    padding: 80px 15px 65px;
    min-height: calc(100vh);
    background: var(--board_background);
`
