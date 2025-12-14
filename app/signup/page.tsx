"use client"
import styled from "styled-components"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState, useRef, useCallback } from "react"
import createClient from "@/utils/supabase/client"
import InputFields from "../components/form/input"
import { useToastStore } from "../lib/useToastStore"
import { useRouter } from "next/navigation"
import { UserInfoInitial, UserReviewInitial, UserMemoInitial, UserBooksInitial, UserLogInitial, UserWishInitial } from "../lib/readingInfo"
import { useAuthStore} from "../lib/userfetch"
import InterestList from "../components/form/Interest/InterestList"
import { CheckEmail, checkEmailExistence, CheckNickname, CheckPassword, handlePassCheck } from "./Valid"
import { WarningMessage } from "./warningMsg"
import SpinnerArea from "../components/spinner/SpinnerArea"
import { useForm } from "../hook/useForm"
import SubmitButton from "../components/common/SubmitButton"

const SignUpWrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 50px 15px 150px;
    background: var(--board_background);
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
const ImageStyle = {
    width: 'auto'
}

export default function SignUp() {
    const emailRef = useRef<HTMLInputElement>(null)
    const [emailValid,setEmailValid] = useState({
        valid: null,
        exists: undefined
    })
    const nicknameRef = useRef<HTMLInputElement>(null)
    const [nicknameValue,setNicknameValue] = useState<boolean | null>(null)

    const newPassRef = useRef<HTMLInputElement>(null)
    const newPass2Ref = useRef<HTMLInputElement>(null)
    const [passValue,setPassValue] = useState<boolean | null>(null) //pass 유효성
    const [passCheck, setPassCheck] = useState<boolean | null>(null) //pass 일치

    const [interest,setInterest] = useState<string[]>([])

    //const [button,setButton] = useState<boolean>(false) // button 활성화 상태
    const [loading,setLoading] = useState<boolean>(false)
    const setToast = useToastStore((state)=>state.setToast)
    const setSession = useAuthStore((state)=>state.setSession)
    const setProfile = useAuthStore((state)=>state.setProfile)
    const setData = useAuthStore((state)=>state.setData)
    const router = useRouter()
    const supabase = createClient()

    const isFormValid = useForm({
        emailValid,
        nicknameValue,
        passValue,
        passCheck,
        interest
    })


    const handleSignUp = useCallback(async()=>{
        if(loading) return
        setLoading(true)

        try {
            const { data, error } = await supabase.auth.signUp({
                email : emailRef.current.value,
                password : newPassRef.current.value,
            })

            if (error) {
                if(error.message === 'User already registered') {
                    throw new Error('이미 가입된 이메일입니다.')
                } else if(error.code === 'weak_password') {
                    throw new Error('비밀번호는 8자 이상, 문자+숫자 조합으로 설정해주세요.')
                } else if(error.code === 'validation_failed') {
                    throw new Error('이메일 형식이 올바르지 않습니다.')
                } else {
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

            const UserId = session.user.id;
            setSession(session)

            //프로필 테이블 생성
            const {error: profileError} = await supabase.from('profiles').insert({
                id: session.user?.id,
                username: nicknameRef.current.value,
                interests: interest,
                email: emailRef.current.value,
            })
            if(profileError) {
                setToast('프로필 생성에 실패했습니다.', 'error')
                throw new Error('프로필 생성에 실패했습니다.')
            }


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

            //초기 데이터 로딩
            const results = await Promise.all([
                    UserReviewInitial(UserId),
                    UserMemoInitial(UserId),
                    UserBooksInitial(UserId),
                    UserLogInitial(UserId),
                    UserWishInitial(UserId)
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

            if(results.some(r => !r.ok)) {
                setToast('회원가입은 완료되었으나 일부 데이터 로딩에 실패했습니다', 'info')
            }

            router.push('/')

        } catch (err) {
            console.error(err)
            const errorMessage = err instanceof Error
                ? err.message
                : '회원가입 중 오류가 발생했습니다'
            setToast(errorMessage, "error")
            setLoading(false)
        }
    },[])

    const handleEmailBlur = useCallback(async (e:React.ChangeEvent<HTMLInputElement>)=>{
        const value = emailRef.current?.value || ''

        let emailvalid:boolean | null = null;
        if(!value) {
            emailvalid = null
        } else {
            emailvalid = CheckEmail(e.currentTarget.value)
        }

        let existEmail = undefined;
        if(emailvalid) {
            existEmail = await checkEmailExistence(e.currentTarget.value)
        }

        setEmailValid({
            valid: emailvalid,
            exists: existEmail
        })
    },[])
    const handleNicknameChange = useCallback((e:React.ChangeEvent<HTMLInputElement>)=>{
        CheckNickname(e.currentTarget.value, setNicknameValue)
    },[])
    const passWordChange = useCallback((e:React.ChangeEvent<HTMLInputElement>)=>{
            newPassRef.current.value = e.currentTarget.value;
            const passCheck = newPass2Ref.current?.value?.trim() || ''
            handlePassCheck(newPassRef.current.value, passCheck ,setPassCheck )
    },[])
    const passWordBlur = useCallback((e:React.ChangeEvent<HTMLInputElement>)=>{
            CheckPassword(e.currentTarget.value, setPassValue);
            const passCheck = newPass2Ref.current?.value?.trim() || ''
            handlePassCheck(newPassRef.current.value, passCheck,setPassCheck)
    },[])
    const passCheckChange = useCallback((e:React.ChangeEvent<HTMLInputElement>)=>{
            newPass2Ref.current.value = e.currentTarget.value
            const passOrigin = newPassRef.current?.value?.trim() || ''
            handlePassCheck(passOrigin, newPass2Ref.current.value ,setPassCheck)
    },[])
    const passCheckBlur = useCallback((e:React.ChangeEvent<HTMLInputElement>)=>{
        handlePassCheck(newPassRef.current.value, newPass2Ref.current.value ,setPassCheck )
    },[])

    return(
        <SignUpWrapper>
            <h2 className="sr-only">책담 회원가입 페이지. 모든 항목은 필수입력 입니다.</h2>
            {loading && <SpinnerArea text="회원가입 처리중..." />}
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
                    <span>이메일 <b className="text-red-800">*</b></span>
                    <InputFields
                    type={"email"}
                    name={"login-emapl"}
                    placeholder={"이메일을 입력해주세요"}
                    onBlur={handleEmailBlur}
                    ref={emailRef}
                    />
                    <WarningMessage state={emailValid.valid} text="이메일 형식을 확인해주세요. ex)book@naver.com" />
                    <WarningMessage state={!emailValid.exists} text="이미 사용중인 이메일입니다." />
                </Label>
                <Label style={{ marginTop: '10px' }}>
                    <span>닉네임 <b className="text-red-800">*</b></span>
                    <InputFields
                    type={"text"}
                    name={"login-nickname"}
                    placeholder={"닉네임을 입력해주세요 (2글자 이상)"}
                    onBlur={handleNicknameChange}
                    ref={nicknameRef}
                    />
                <WarningMessage state={nicknameValue} text="닉네임은 두 글자 이상 입력해주세요." />
                </Label>
                <Label style={{ marginTop: '10px' }}>
                    <span>비밀번호 <b className="text-red-800">*</b></span>
                    <InputFields
                    type={"password"}
                    name={"login-pass"}
                    placeholder={"8자 이상, 숫자/영문 조합해주세요"}
                    ref={newPassRef}
                    onBlur={passWordBlur}
                    onChange={passWordChange}/>
                    <WarningMessage state={passValue} text="비밀번호는 문자+숫자 8자리 이상입니다." />
                </Label>
                <Label style={{ marginTop: '10px' }}>
                    <span>비밀번호 확인 <b className="text-red-800">*</b></span>
                    <InputFields
                    type={"password"}
                    name={"login-pass-check"}
                    placeholder={"비밀번호를 한번 더 입력해주세요"}
                    ref={newPass2Ref}
                    onBlur={passCheckBlur}
                    onChange={passCheckChange}/>
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
            <SubmitButton
            type="button"
            active={isFormValid}
            loading={loading}
            onClick={handleSignUp}
            >회원가입</SubmitButton>
            <ToLoginBox>
                <p>회원이신가요?
                <Link href={'/login'}>로그인 하러가기</Link>
                </p>
            </ToLoginBox>
        </SignUpWrapper>
    )
}