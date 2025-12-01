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
import { UserInfoInitial, UserReviewInitial, UserMemoInitial } from "../lib/readingInfo"
import { useAuthStore, Reviews, Memo } from "../lib/userfetch"
import InterestList from "../components/form/Interest/InterestList"
import ProfileInfo from "../components/form/profile/ProfileInfo"
import { motion, AnimatePresence } from "framer-motion"

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
const WarningMsg = styled.p`
    display: inline-block;
    font-size: 1.2rem;
    color: red;
    margin-top: 5px;
    font-weight: 400;
`

export default function SignUp() {
    const [email,setEmail] = useState<string>('');
    const [emailValid,setEmailValid] = useState<boolean | null>(null)
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
            interest.length > 0
        ) {
            setButton(true)
        } else { setButton(false) }

    },[emailValid,nicknameValue,passValue,passCheck,interest])

    const handleSignUp = async () => {
        if(loading) return
        setLoading(true)
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
                setToast('세션이 없어서 프로필을 생성할 수 없습니다.','error')
                return
            }

            await supabase.from('profiles').insert({
                id: session.user?.id,
                username: nickname,
                interests: interest, // 지금은 빈 배열, 나중에 체크박스 입력값 넣기
            })

            const UserId = session.user.id;

            setSession(session)
            // 프로필 정보 초기 저장
            const UserInfor = await UserInfoInitial(UserId)
            const UserProrile = { username: UserInfor.username, interests:interest }
            setProfile(UserProrile)
            // 리뷰 목록 초기 저장
            const UserReview = await UserReviewInitial(UserId)
            setData<Reviews>('reviews',UserReview)
            // 메모 목록 초기 저장
            const UserMemo = await UserMemoInitial(UserId)
            setData<Memo>('memo', UserMemo)

            setToast('회원가입이 완료됐습니다!','success',()=>{router.push('/')})

        } catch (err) {
            console.error(err)
            console.log('회원가입 실패')
            setToast('회원가입이 실패했습니다','error')
        }
    }
    const handlePassCheck = () => { //비밀번호+비밀번호 재확인값 확인
        if(!newPass2Ref.current) { setPassCheck(null); return }
        setPassCheck(newPassRef.current === newPass2Ref.current);
    }

    const CheckEmail = (value:string) => {
        if(!value) {
            setEmailValid(null)
            return
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(value);
        if(isValid) {setEmailValid(true)} else {setEmailValid(false)}
    }

    const CheckNickname = (value:string) => {
        if(!value) {
            setNicknameValue(null)
            return
        }
        console.log(value.length)

        const valueRegex = value.length >= 2;
        const isValid = valueRegex;
        if(isValid) { setNicknameValue(true) } else {setNicknameValue(false)}
    }

    const CheckPassword = (value: string) => {
        if(!value) {
            setPassValue(null)
            return
        }

        const valueRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        const isValid = valueRegex.test(value)
        if(isValid) { setPassValue(true) } else {setPassValue(false)}
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
                    <span>이메일 <b className="text-red-800">*</b></span>
                    <InputFields type={"email"}
                    name={"login-emapl"}
                    placeholder={"이메일을 입력해주세요"}
                    onBlur={(e:React.ChangeEvent<HTMLInputElement>)=>CheckEmail(e.currentTarget.value)}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setEmail(e.currentTarget.value)}
                    />
                    <AnimatePresence>
                    {emailValid === false &&
                        <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.2 }}>
                            <WarningMsg>이메일 형식을 확인해주세요. <br /> ex) book@naver.com</WarningMsg>
                        </motion.div>
                    }
                    </AnimatePresence>
                </Label>
                <Label style={{ marginTop: '10px' }}>
                    <span>닉네임 <b className="text-red-800">*</b></span>
                    <InputFields type={"text"}
                    name={"login-nickname"}
                    placeholder={"닉네임을 입력해주세요 (2글자 이상)"}
                    onBlur={(e:React.ChangeEvent<HTMLInputElement>)=>CheckNickname(e.currentTarget.value)}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setNickname(e.currentTarget.value)}
                    />
                    <AnimatePresence>
                    {nicknameValue === false &&
                        <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.2 }}>
                            <WarningMsg>닉네임은 두 글자 이상 입력해주세요. </WarningMsg>
                        </motion.div>
                    }
                    </AnimatePresence>
                </Label>
                <Label style={{ marginTop: '10px' }}>
                    <span>비밀번호 <b className="text-red-800">*</b></span>
                    <InputFields type={"password"}
                    name={"login-pass"}
                    placeholder={"8자 이상, 숫자/영문 조합해주세요"}
                    onBlur={(e:React.ChangeEvent<HTMLInputElement>)=>{
                        CheckPassword(e.currentTarget.value);
                        handlePassCheck()
                    }}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                        newPassRef.current = e.currentTarget.value;
                        handlePassCheck()
                    }
                    }/>
                    <AnimatePresence>
                    {passValue === false &&
                        <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.2 }}>
                            <WarningMsg>비밀번호는 문자+숫자 8자리 이상입니다 </WarningMsg>
                        </motion.div>
                    }
                    </AnimatePresence>
                </Label>
                <Label style={{ marginTop: '10px' }}>
                    <span>비밀번호 확인 <b className="text-red-800">*</b></span>
                    <InputFields type={"password"}
                    name={"login-pass-check"}
                    placeholder={"비밀번호를 한번 더 입력해주세요"}
                    onBlur={handlePassCheck}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                        newPass2Ref.current = e.currentTarget.value
                        handlePassCheck()
                    }}/>
                    <AnimatePresence>
                        {passCheck === false &&
                        <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.2 }}>
                            <WarningMsg>비밀번호를 정확하게 입력해주세요 </WarningMsg>
                        </motion.div>
                        }
                    </AnimatePresence>
                </Label>
                <Label style={{ marginTop: '10px' }}>
                    <span>관심 카테고리
                        <b className="text-red-800"> * {interest.length == 0 && <WarningMsg>관심 카테고리를 선택하고 책을 추천받으세요!</WarningMsg>}</b>
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