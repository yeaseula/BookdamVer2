import styled from "styled-components"


export const Container = styled.section`
    padding: 50px 15px;
    text-align: center;
`
export const Title = styled.h2`
    font-weight: bold;
    font-size: 2rem;
`
export const Button = styled.button`
    display: inline-block;
    padding: 3px 10px 1px;
    background: var(--sub_color);
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.4rem;
`
export const Button2 = styled(Button)`
    background: #757575
`