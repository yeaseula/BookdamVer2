import styled from "styled-components";

export const ButtonStyle = styled.button<{disabled:boolean, $width?:number, $height:number}>`
    width: ${(props)=>props.$width ? props.$width + 'px' : '100%'};
    height: ${(props)=>props.$height}px;
    color: #fff;
    border-radius: 5px;
    background-color: var(--sub_color);
    cursor: ${(props)=>props.disabled ? 'initial' : 'pointer'};
    &:disabled {
        background-color: #bdbdbd;
        color: #e0e0e0;
    }
`