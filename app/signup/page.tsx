"use client"
import styled from "styled-components"
import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
import createClient from "@/utils/supabase/client"
import InputFields from "../components/form/input"
import SignUpButton from "./components/signupButton"
import { useToastStore } from "../lib/useToastStore"
import { useRouter } from "next/navigation"
import { useAuthStore } from "../lib/userfetch"
import { Profiles } from "../lib/userfetch"

const SignUpWrapper = styled.section`
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
const ToLoginBox = styled.div`
    margin-top: 35px;
    font-size: 15px;
    color: #424242;
    a {
        display: inline-block;
        margin-left: 5px;
        text-decoration: underline;
    }
`

export default function SignUp() {
    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('')
    const [nickname,setNickname] = useState<string>('')
    const setToast = useToastStore((state)=>state.setToast)
    const router = useRouter()
    const supabase = createClient()
    const setSession = useAuthStore((state)=>state.setSession)
    const setProfile = useAuthStore((state)=>state.setProfile)

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
            setToast('회원가입이 완료됐습니다!','success',()=>{router.push('/')})

        } catch (err) {
            console.error(err)
            console.log('회원가입 실패')
            setToast('회원가입이 실패했습니다','error')
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
                </Label>
            </div>

            <SignUpButton
            email={email}
            password={password}
            nickname={nickname}
            onClick={()=>handleSignUp()}
            />

            <ToLoginBox>
                <p>회원이신가요?
                <Link href={'/login'}>로그인 하러가기</Link>
                </p>
            </ToLoginBox>
        </SignUpWrapper>
    )
}