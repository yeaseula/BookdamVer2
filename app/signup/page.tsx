"use client"
import styled from "styled-components"
import Image from "next/image"
import { useState, useEffect, SetStateAction } from "react"
import { supabase } from "../lib/supabase"
import SignUpButton from "./components/signupButton"

const SignUpWrapper = styled.section`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 15px;
`
const Label = styled.label`
    width: 100%;
    display: block;
    > span { font-size: 12px; color: #616161 }
`
const Input = styled.input`
    width: 100%;
    height: 34px;
    padding: 0 9px;
    border: 1px solid #bdbdbd;
    margin-top: 4px;
    border-radius: 5px;
`
export default function SignUp() {
    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('')
    const [nickname,setNickname] = useState<string>('');

    const handleSignUp = async () => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            })

            if (error) throw error

            const {
                data: { session },
                error: sessionError
            } = await supabase.auth.getSession()

            if (sessionError) throw sessionError

            if (!session?.user) {
                alert('세션이 없어서 프로필을 생성할 수 없습니다.')
                return
            }

            await supabase.from('profiles').insert({
                id: session.user?.id,
                username: nickname,
                interests: [], // 지금은 빈 배열, 나중에 체크박스 입력값 넣기
            })

            console.log('회원가입 성공!')
        } catch (err) {
            console.error(err)
            console.log('회원가입 실패')
        } finally {
            console.log('뭔가했어요')
        }
    }

    return(
        <SignUpWrapper>
            <h2 className="sr-only">회원가입</h2>
            <Image
            src={'/images/main-logo.svg'}
            alt="로고"
            width={100}
            height={60} />

            <div style={{ width: '100%', marginTop: '20px' }}>
                <Label>
                    <span>이메일</span>
                    <Input type="email" id="login-email" onChange={(e)=>setEmail(e.currentTarget.value)}/>
                </Label>
                <Label style={{ marginTop: '10px' }}>
                    <span>닉네임</span>
                    <Input type="text" id="login-nickname" onChange={(e)=>setNickname(e.currentTarget.value)}/>
                </Label>
                <Label style={{ marginTop: '10px' }}>
                    <span>비밀번호</span>
                    <Input type="password" id="login-pass" onChange={(e)=>setPassword(e.currentTarget.value)}/>
                </Label>
            </div>

            <SignUpButton
            email={email}
            password={password}
            nickname={nickname}
            onClick={()=>handleSignUp()}
            />
        </SignUpWrapper>
    )
}