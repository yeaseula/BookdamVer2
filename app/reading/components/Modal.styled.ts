import styled from "styled-components";

export const Container = styled.section`
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 999;
    transform: translate(-50%,-50%);
    max-width: 380px;
    width: 100%;
`
export const Card = styled.div`
    position: relative;
    background:#3a3967;
    width:100%;
    padding:20px;
    border-radius:14px;
    box-shadow:0 4px 10px rgba(0,0,0,0.24);
    display:flex;
    flex-direction:column;
    gap:14px;
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
    display:flex;
    justify-content:space-between;
    gap:10px;
`
export const Btn = styled.button<{color:string,disabled?:boolean}>`
    flex:1;
    background:${p=>p.disabled ? '#bdbdbd' : p.color} ;
    border:none;
    padding:10px 0;
    border-radius:10px;
    font-weight:700;
    font-size:14px;
    color:${p=>p.disabled ? '#e0e0e0' : '#fff4ba'};
    cursor:${p=>p.disabled ? 'initial' : 'pointer'};
`
export const Circle = styled.button`
    position: fixed;
    bottom: 80px;
    right: calc((100% - 420px) / 2);
    z-index: 99;
    background-color: var(--sub_color);
    border-radius: 50%;
    width: 45px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`