"use client"

import styled from "styled-components";
import InputFields from "../components/form/input";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import LoginButton from "./components/LoginButton";
import { supabase } from "../lib/supabase"

const LoginWrapper = styled.section`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 15px;
`
const Letter = styled.p`
    letter-spacing: 2.4px;
    margin-top: 5px;
    font-size: 15px;
`
const Label = styled.label`
    width: 100%;
    display: block;
    > span { font-size: 12px; color: #616161 }
`
const ToSignupBox = styled.div`
    margin-top: 35px;
    font-size: 15px;
    color: #424242;
    a {
        display: inline-block;
        margin-left: 5px;
        text-decoration: underline;
    }
`

export default function Login() {
    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('')

    const handleLogin = async(email:string, password:string) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) throw error

            if (data.user) {
                console.log('로그인 성공', data.user)
                alert(`로그인 성공! 환영 ${data.user.email}`)
                // 로그인 후 다른 페이지로 이동 가능
            } else {
                alert('로그인 실패: 사용자 정보 없음')
            }
        } catch (err) {
            console.error('로그인 오류:', err)
            alert('로그인 실패')
        }
    }

    return (
        <LoginWrapper>
            <h2 className="sr-only">로그인</h2>
            <Image
            src={'/images/main-logo.svg'}
            alt="로고"
            width={100}
            height={60} />
            <Letter>당신의 독서리뷰 다이어리</Letter>

            <div style={{ width: '100%', marginTop: '20px' }}>
                <Label>
                    <span>이메일</span>
                    <InputFields type={"email"}
                    name={"login-emapl"}
                    placeholder={"이메일을 입력해주세요"}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setEmail(e.currentTarget.value)}
                    />
                </Label>
                <Label style={{ marginTop: '10px' }}>
                    <span>비밀번호</span>
                    <InputFields type={"password"}
                    name={"login-pass"}
                    placeholder={"비밀번호를 입력해주세요"}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setPassword(e.currentTarget.value)}
                    />
                </Label>
            </div>
            <LoginButton
            email={email}
            password={password}
            onClick={()=>handleLogin(email,password)}
            />

            <ToSignupBox>
                <p>회원이 아닌가요?
                <Link href={'/signup'}>회원가입 하러가기</Link>
                </p>
            </ToSignupBox>
        </LoginWrapper>
    )
}