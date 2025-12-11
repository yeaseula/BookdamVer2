import styled from "styled-components"

export const Container = styled.section`
    padding: 80px 15px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: #fff;
`
export const Title = styled.h2`
    font-weight: bold;
    font-size: 2rem;
`
export const Button = styled.button`
    display: inline-block;
    padding: 4px 16px 2px;
    background: var(--sub_color);
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.4rem;
`
export const Button2 = styled(Button)`
    background: #757575
`