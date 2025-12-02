"use client"
import styled from "styled-components"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState, useRef } from "react"
import createClient from "@/utils/supabase/client"
import InputFields from "../components/form/input"
import SignUpButton from "./components/signupButton"
import { useToastStore } from "../lib/useToastStore"
import { useRouter } from "next/navigation"
import { UserInfoInitial, UserReviewInitial, UserMemoInitial, UserBooksInitial, UserLogInitial, UserWishInitial } from "../lib/readingInfo"
import { useAuthStore, Reviews, Memo, Books, Log, Wish } from "../lib/userfetch"
import InterestList from "../components/form/Interest/InterestList"
import { motion, AnimatePresence } from "framer-motion"
import { CheckEmail, checkEmailExistence, CheckNickname, CheckPassword, handlePassCheck } from "./Valid"
import { WarningMessage } from "./warningMsg"
import SpinnerArea from "../components/spinner/SpinnerArea"

const SignUpWrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 50px 15px 150px;
`
const Letter = styled.p`
    letter-spacing: 2.4px;
    margin-top: 5px;
    font-size: 15px;
`
const Label = styled.div`
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
    const [emailValid,setEmailValid] = useState<boolean | null>(null)
    const [emailExists, setEmailExists] = useState<boolean>() // 가입된 이메일인지
    const [emailTouched, setEmailTouched] = useState<boolean>(false); // 가입이메일 check await 방어

    const [nickname,setNickname] = useState<string>('')
    const [nicknameValue,setNicknameValue] = useState<boolean | null>(null)

    const [passValue,setPassValue] = useState<boolean | null>(null) //pass 유효성
    const [passCheck, setPassCheck] = useState<boolean | null>(null) //pass 일치
    const newPassRef = useRef('')
    const newPass2Ref = useRef('')

    const [interest,setInterest] = useState<string[]>([])

    const [button,setButton] = useState<boolean>(false) // button 활성화 상태
    const [loading,setLoading] = useState<boolean>(false)
    const setToast = useToastStore((state)=>state.setToast)
    const setSession = useAuthStore((state)=>state.setSession)
    const setProfile = useAuthStore((state)=>state.setProfile)
    const setData = useAuthStore((state)=>state.setData)
    const router = useRouter()
    const supabase = createClient()

    useEffect(()=>{
        if(emailValid === true &&
            nicknameValue === true &&
            passValue === true &&
            passCheck === true &&
            !emailExists &&
            interest.length > 0
        ) {
            setButton(true)
        } else { setButton(false) }
    },[emailValid,emailExists, nicknameValue,passValue,passCheck,interest])

    const handleSignUp = async () => {
        if(loading) return
        setLoading(true)
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password : newPassRef.current,
            })

            if (error) {
                    //  console.log('===== 에러 상세 정보 =====')
                    //  console.log('error:', error)
                    //  console.log('error.message:', error.message)
                    //  console.log('error.code:', error.code)
                    //  console.log('error.status:', error.status)
                    //  console.log('========================')
                if(error.message === 'User already registered') {
                    setToast('이미 가입된 이메일입니다.', 'error')
                    throw new Error('이미 가입된 이메일입니다.')
                } else if(error.code === 'weak_password') {
                    setToast('비밀번호는 8자 이상, 문자+숫자 조합으로 설정해주세요.', 'error')
                    throw new Error('비밀번호는 8자 이상, 문자+숫자 조합으로 설정해주세요.')
                } else if(error.code === 'validation_failed') {
                    setToast('이메일 형식이 올바르지 않습니다.', 'error')
                    throw new Error('이메일 형식이 올바르지 않습니다.')
                } else {
                    setToast('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.', 'error')
                    throw new Error('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.')
                }
            }
            //세션 확인
            const {
                data: { session },
                error: sessionError
            } = await supabase.auth.getSession()

            if (sessionError || !session?.user) {
                setToast('로그인 세션 생성에 실패했습니다.', 'error')
                throw new Error('로그인 세션 생성에 실패했습니다.')
            }
            //프로필 테이블 생성
            const {error: profileError} = await supabase.from('profiles').insert({
                id: session.user?.id,
                username: nickname,
                interests: interest,
                email: email,
            })
            if(profileError) {
                setToast('프로필 생성에 실패했습니다.', 'error')
                throw new Error('프로필 생성에 실패했습니다.')
            }
            const UserId = session.user.id;

            //초기 데이터 로딩
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
                    setSession(session)
                    const UserProrile = { username: UserInfor.username, interests:interest }
                    setProfile(UserProrile)

                    setData<Reviews>('reviews',UserReview)
                    setData<Memo>('memo', UserMemo)
                    setData<Books>('books', UserBooks)
                    setData<Log>('log', UserLog)
                    setData<Wish>('wish',UserWish)

            } catch (dataError) {
                console.error('초기 데이터 로딩 실패:', dataError)
                setToast('회원가입은 완료되었으나 일부 데이터 로딩에 실패했습니다', "info", () => {
                    router.push('/')
                })
            }

        } catch (err) {
            console.error(err)
            const errorMessage = err instanceof Error
                ? err.message
                : '회원가입 중 오류가 발생했습니다'
            setToast(errorMessage, "error")
            setLoading(false)
        } finally {
            router.push('/')
        }
    }
    return(
        <SignUpWrapper>
            <h2 className="sr-only">책담 회원가입 페이지. 모든 항목은 필수입력 입니다.</h2>
            {loading && <SpinnerArea text="회원가입 처리중..." />}
            <Image
            src={'/images/main-logo.svg'}
            alt="로고"
            width={100}
            height={60} />
            <Letter>당신의 독서리뷰 다이어리</Letter>

            <div style={{ width: '100%', marginTop: '20px' }}>
                <Label>
                    <span>이메일 <b className="text-red-800">*</b></span>
                    <InputFields type={"email"}
                    name={"login-emapl"}
                    placeholder={"이메일을 입력해주세요"}
                    onBlur={(e:React.ChangeEvent<HTMLInputElement>)=>{
                        CheckEmail(e.currentTarget.value, setEmailValid);
                        checkEmailExistence(e.currentTarget.value,setEmailTouched, setEmailExists);
                    }}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>
                        setEmail(e.currentTarget.value)}
                    />
                    <WarningMessage state={emailValid} text="이메일 형식을 확인해주세요. ex)book@naver.com" />
                    <WarningMessage state={!emailTouched || !emailExists} text="이미 사용중인 이메일입니다." />
                </Label>
                <Label style={{ marginTop: '10px' }}>
                    <span>닉네임 <b className="text-red-800">*</b></span>
                    <InputFields type={"text"}
                    name={"login-nickname"}
                    placeholder={"닉네임을 입력해주세요 (2글자 이상)"}
                    onBlur={
                        (e:React.ChangeEvent<HTMLInputElement>)=>
                        CheckNickname(e.currentTarget.value, setNicknameValue)
                    }
                    onChange={
                        (e:React.ChangeEvent<HTMLInputElement>)=>
                        setNickname(e.currentTarget.value)
                    }
                    />
                <WarningMessage state={nicknameValue} text="닉네임은 두 글자 이상 입력해주세요." />
                </Label>
                <Label style={{ marginTop: '10px' }}>
                    <span>비밀번호 <b className="text-red-800">*</b></span>
                    <InputFields type={"password"}
                    name={"login-pass"}
                    placeholder={"8자 이상, 숫자/영문 조합해주세요"}
                    onBlur={(e:React.ChangeEvent<HTMLInputElement>)=>{
                        CheckPassword(e.currentTarget.value,setPassValue);
                        handlePassCheck(newPassRef, newPass2Ref ,setPassCheck )
                    }}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                        newPassRef.current = e.currentTarget.value;
                        handlePassCheck(newPassRef, newPass2Ref ,setPassCheck )
                    }
                    }/>
                    <WarningMessage state={passValue} text="비밀번호는 문자+숫자 8자리 이상입니다." />
                </Label>
                <Label style={{ marginTop: '10px' }}>
                    <span>비밀번호 확인 <b className="text-red-800">*</b></span>
                    <InputFields type={"password"}
                    name={"login-pass-check"}
                    placeholder={"비밀번호를 한번 더 입력해주세요"}
                    onBlur={()=>handlePassCheck(newPassRef, newPass2Ref ,setPassCheck )}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                        newPass2Ref.current = e.currentTarget.value
                        handlePassCheck(newPassRef, newPass2Ref ,setPassCheck )
                    }}/>
                        <WarningMessage state={passCheck} text="비밀번호를 정확하게 입력해주세요." />
                </Label>
                <Label style={{ marginTop: '10px' }}>
                    <span>관심 카테고리
                        <b className="text-red-800"> *
                            {interest.length == 0 &&
                            <p className="inline-block text-[1.2rem] text-green-700 ml-4.5">관심 카테고리를 선택하고 책을 추천받으세요!</p>}</b>
                    </span>
                        <InterestList
                        interest={interest}
                        setInterest={setInterest}/>
                </Label>
            </div>
            <SignUpButton
            button={button}
            loading={loading}
            interest={interest}
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