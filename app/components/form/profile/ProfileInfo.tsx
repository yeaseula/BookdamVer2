"use client"
import styled from "styled-components"
import InputFields from "../input"
import InterestList from "../Interest/InterestList"
const Label = styled.div`
    width: 100%;
    display: block;
    > span { font-size: 12px; color: #616161 }
`

export default function ProfileInfo({setEmail,setPassword,setNickname,interest,setInterest}) {
    return(
        <>
        {/* <Label>
            <span>이메일</span>
            <InputFields
            type={"email"}
            name={"login-emapl"}
            placeholder={"이메일을 입력해주세요"}
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setEmail(e.currentTarget.value)}
            />
        </Label>
        <Label style={{ marginTop: '10px' }}>
            <span>닉네임</span>
            <InputFields type={"text"}
            name={"login-nickname"}
            placeholder={"닉네임을 입력해주세요"}
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setNickname(e.currentTarget.value)}
            />
        </Label>
        <Label style={{ marginTop: '10px' }}>
            <span>비밀번호</span>
            <InputFields type={"password"}
            name={"login-pass"}
            placeholder={"8자 이상, 숫자/영문 조합해주세요"}
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setPassword(e.currentTarget.value)}
            />
        </Label> */}
        <Label style={{ marginTop: '10px' }}>
            <span>관심 카테고리</span>
                <InterestList
                interest={interest}
                setInterest={setInterest}/>
        </Label>
        </>
    )
}