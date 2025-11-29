import styled from "styled-components"

export const AddButtonstyle = styled.button<{disabled: boolean}>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 37px;
    height: 37px;
    border-radius: 5px;
    border: 1px solid var(--sub_color);
    background-color: var(--sub_color);
    color: #fff;
    transition: all .2s;
    outline: 0;
    cursor: pointer;
    &:disabled {
        background-color: #bdbdbd;
        border: 1px solid #bdbdbd;
        color: #e0e0e0;
        cursor: initial;
    }
`