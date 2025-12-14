"use client"

import styled from "styled-components";
import InputFields from "../components/form/input";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useCallback } from "react";
import LoginButton from "./components/LoginButton";
import createClient from "@/utils/supabase/client";
import { useToastStore } from "../lib/useToastStore";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../lib/userfetch";
import { useSettingStore } from "../lib/userfetch";
//util function
import { UserInfoInitial, UserReviewInitial, UserMemoInitial,
    UserBooksInitial, UserLogInitial, UserWishInitial, UserSetting
 } from "../lib/readingInfo";
import SpinnerArea from "../components/spinner/SpinnerArea";
import { ImageStyle } from "../components/common/ImageStyle";
import SubmitButton from "../components/common/SubmitButton";
import { useLogin } from "../hook/useForm";
import { CheckEmail, CheckPassword } from "../signup/Valid";

const LoginWrapper = styled.section`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 15px;
    background: var(--board_background);
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

    const emailRef = useRef<HTMLInputElement>(null)
    const passRef = useRef<HTMLInputElement>(null)

    const [emailValid,setEmailValid] = useState(false)
    const [passValid,setPassValid] = useState(false)

    const [loading,setIsLoading] = useState<boolean>(false)
    const supabase = createClient()
    const router = useRouter()

    const setToast = useToastStore((state)=>state.setToast)
    const { setSession,setProfile,setData } = useAuthStore()
    const initSettings = useSettingStore((state)=>state.initSettings)

    console.log('rerender')

    const LoginState = useLogin({emailValid, passValid})

    const handleLogin = async() => {
        if(loading) return
        setIsLoading(true)
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email : emailRef.current.value,
                password : passRef.current.value,
            })

            if (error || !data.user) {
                throw new Error("회원 정보를 확인해주세요.")
            }

            //get session
            setSession(data.session)
            const UserId = data.session.user.id

            //get profile
            const UserInfor = await UserInfoInitial(UserId)

            if(!UserInfor.ok || !UserInfor.data) {

                console.log(UserInfor.error)
                setToast('프로필 데이터 로드에 실패했습니다', 'info')
                throw new Error('프로필 데이터를 읽어오지 못했습니다.')

            } else {
                const UserProrile = {
                    data: {
                        ...UserInfor.data
                    },
                    error: UserInfor.error,
                    ok: !UserInfor.error
                }
                setProfile(UserProrile)
            }

            //get setting 정보 : 로드 실패해도 치명적 에러가 아님
            const UserSettings = await UserSetting(UserId)
            if(!UserSettings.ok) {
                setToast('초기 셋팅 정보를 가져오지 못했습니다', 'info')
            } else {
                initSettings(UserSettings)
            }

            const results = await Promise.all([
                    UserReviewInitial(UserId),
                    UserMemoInitial(UserId),
                    UserBooksInitial(UserId),
                    UserLogInitial(UserId),
                    UserWishInitial(UserId),
                ])

                const [UserReview, UserMemo, UserBooks, UserLog, UserWish] = results

                if(UserReview.ok) setData('reviews',UserReview)
                if(UserMemo.ok) setData('memo',UserMemo)
                if(UserBooks.ok) setData('books',UserBooks)
                if(UserLog.ok) setData('log', UserLog)
                if(UserWish.ok) setData('wish',UserWish)

                if(!UserReview.ok) console.log('리뷰로드실패')
                if(!UserMemo.ok) console.log('메모로드실패')
                if(!UserBooks.ok) console.log('읽는중책로드실패')
                if(!UserLog.ok) console.log('로그로드실패')
                if(!UserWish.ok) console.log('위시로드실패')

                if(results.some((r)=> !r.ok)) {
                    setToast('로그인은 완료되었으나 일부 데이터 로딩에 실패했습니다', "info")
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

    const handleEmailCheck = useCallback(()=>{
        const value = emailRef.current?.value || ''
        if(!value || emailValid === true) return
        if(value) {
            const valid = CheckEmail(value)
            setEmailValid(valid)
        }
    },[])

    const passwordCheck = useCallback(()=>{
        const value = passRef.current?.value || ''
        if(!value || passValid === true) return
        if(value) {
            CheckPassword(value,setPassValid)
        }
    },[])

    return (
        <LoginWrapper>
            <h2 className="sr-only">로그인</h2>
            {loading && <SpinnerArea text="로그인 진행중.."></SpinnerArea>}
            <Image
            src={'/images/main-logo.svg'}
            alt="로고"
            width={100}
            height={60}
            style={ImageStyle}
            priority
            />
            <Letter>당신의 독서리뷰 다이어리</Letter>

            <div style={{ width: '100%', marginTop: '20px' }}>
                <Label>
                    <span>이메일</span>
                    <InputFields
                    type={"email"}
                    name={"login-emapl"}
                    placeholder={"이메일을 입력해주세요."}
                    onChange={handleEmailCheck}
                    ref={emailRef}
                    />
                </Label>
                <Label style={{ marginTop: '10px' }}>
                    <span>비밀번호</span>
                    <InputFields
                    type={"password"}
                    name={"login-pass"}
                    placeholder={"비밀번호를 입력해주세요."}
                    onChange={passwordCheck}
                    ref={passRef}
                    />
                </Label>
            </div>
            <SubmitButton
            type="button"
            active={LoginState}
            loading={loading}
            onClick={handleLogin}
            >로그인</SubmitButton>

            <ToSignupBox>
                <p>회원이 아닌가요?
                <Link href={'/signup'}>회원가입 하러가기</Link>
                </p>
            </ToSignupBox>
        </LoginWrapper>
    )
}