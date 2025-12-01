import styled, {keyframes, css} from "styled-components";

const pulse = keyframes`
    0% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgb(106 200 216 / 20%);
        opacity: 1;
    }
    50% {
        transform: scale(1.06);
        box-shadow: 0 8px 20px 6px rgb(106 200 216 / 10%);
        opacity: 0.95;
    }
    100% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgb(106 200 216 / 20%);
        opacity: 1;
    }
`;
export const shake = keyframes`
    0% { transform: rotate(0deg); }
    10% { transform: rotate(-15deg); }
    20% { transform: rotate(15deg); }
    30% { transform: rotate(-10deg); }
    40% { transform: rotate(10deg); }
    50% { transform: rotate(-5deg); }
    60% { transform: rotate(5deg); }
    70% { transform: rotate(-3deg); }
    80% { transform: rotate(3deg); }
    90% { transform: rotate(-1deg); }
    100% { transform: rotate(0deg); }
`;

export const Container = styled.section`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const Card = styled.div`
    position: relative;
    background:#3a3967;
    max-width: 380px;
    width:100%;
    padding:20px;
    border-radius:14px;
    box-shadow:0 4px 10px rgba(0,0,0,0.24);
    display:flex;
    flex-direction:column;
    gap:14px;
    z-index: 100;
`
export const Close = styled.button`
    position:absolute;
    top: 20px;
    right: 20px;
    color: #fff;
    cursor: pointer;
`
export const Title = styled.h3`
    font-size: 1.8rem;
    text-align: center;
    font-weight: 600;
    color:#fff;
`
export const Timer = styled.div`
    font-size:36px;
    text-align:center;
    font-weight:800;
    margin:8px 0;
    color:#fff4ba;
`
export const BtnWrap = styled.div`
    position: relative;
    display:flex;
    justify-content:space-between;
    gap:10px;
`
export const Btn = styled.button<{color:string,disabled?:boolean,$pulse?:boolean}>`
    flex:1;
    background:${p=>p.disabled ? '#bdbdbd' : p.color} ;
    border:none;
    padding:10px 0;
    border-radius:10px;
    font-weight:700;
    font-size:14px;
    color:${p=>p.disabled ? '#e0e0e0' : '#fff4ba'};
    cursor:${p=>p.disabled ? 'initial' : 'pointer'};
    animation: none;
    ${({ $pulse }) => $pulse === true && css`
        animation: ${pulse} 1200ms ease-in-out infinite;
    `}
`
export const Circle = styled.button<{$minimal:boolean}>`
    background-color: var(--sub_color);
    border-radius: 50%;
    width: 45px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    ${({ $minimal }) => $minimal === true && css`
        animation: ${shake} 0.8s linear infinite;
        animation-delay: 0s;
        animation-iteration-count: infinite;
        animation-fill-mode: forwards;
        animation-duration: 2s;
    `}
`
