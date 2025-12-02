"use client"

import styled from "styled-components";
import InputFields from "../components/form/input";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import LoginButton from "./components/LoginButton";
import createClient from "@/utils/supabase/client";
import { useToastStore } from "../lib/useToastStore";
import { useRouter } from "next/navigation";
import { useAuthStore, Reviews, Memo, Books, Log, Wish } from "../lib/userfetch";
//util function
import { UserInfoInitial, UserReviewInitial, UserMemoInitial,
    UserBooksInitial, UserLogInitial, UserWishInitial
 } from "../lib/readingInfo";
import SpinnerArea from "../components/spinner/SpinnerArea";

const LoginWrapper = styled.section`
    height: 100vh;
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
    const [loading,setIsLoading] = useState<boolean>(false)
    const supabase = createClient()
    const setToast = useToastStore((state)=>state.setToast)
    const router = useRouter()

    const setSession = useAuthStore((state)=>state.setSession)
    const setProfile = useAuthStore((state)=>state.setProfile)
    const setData = useAuthStore((state)=>state.setData)

    const handleLogin = async(email:string, password:string) => {
        if(loading) return
        setIsLoading(true)
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error || !data.user) {
                throw new Error("회원 정보를 확인해주세요.")
            }

            setSession(data.session)
            const UserId = data.session.user.id

            try {
                const [UserInfor,
                    UserReview,
                    UserMemo,
                    UserBooks,
                    UserLog,
                    UserWish] = await Promise.all([
                        UserInfoInitial(UserId),
                        UserReviewInitial(UserId),
                        UserMemoInitial(UserId),
                        UserBooksInitial(UserId),
                        UserLogInitial(UserId),
                        UserWishInitial(UserId)
                    ])

                    const UserProrile = { username: UserInfor.username, interests:UserInfor.interests }
                    setProfile(UserProrile)
                    setData<Reviews>('reviews',UserReview)
                    setData<Memo>('memo', UserMemo)
                    setData<Books>('books', UserBooks)
                    setData<Log>('log', UserLog)
                    setData<Wish>('wish',UserWish)

            } catch (dataError) {
                console.error('초기 데이터 로딩 실패:', dataError)
                setToast('로그인은 완료되었으나 일부 데이터 로딩에 실패했습니다', "info")
                router.push('/')
            }
            router.push('/')

        } catch (err) {
            console.error('로그인 오류:', err)
            const errorMessage = err instanceof Error
                ? err.message
                : '로그인 중 오류가 발생했습니다'
            setToast(errorMessage,"error")
            setIsLoading(false)
        }
    }

    return (
        <LoginWrapper>
            <h2 className="sr-only">로그인</h2>
            {loading && <SpinnerArea text="로그인 진행중.."></SpinnerArea>}
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
                    placeholder={"이메일을 입력해주세요."}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setEmail(e.currentTarget.value)}
                    />
                </Label>
                <Label style={{ marginTop: '10px' }}>
                    <span>비밀번호</span>
                    <InputFields type={"password"}
                    name={"login-pass"}
                    placeholder={"비밀번호를 입력해주세요."}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setPassword(e.currentTarget.value)}
                    />
                </Label>
            </div>
            <LoginButton
            email={email}
            password={password}
            isWorking={loading}
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