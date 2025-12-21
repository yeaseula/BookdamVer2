"use client"
import React, { useState } from "react"
import styled from "styled-components"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import createClient from "@/utils/supabase/client"
import { useToastStore } from "../lib/useToastStore"
import { useAuthStore} from "../lib/userfetch"
import { useForm, SubmitHandler, FormProvider, useWatch } from "react-hook-form"
import { UserInfoInitial, UserReviewInitial, UserMemoInitial, UserBooksInitial, UserLogInitial, UserWishInitial } from "../lib/readingInfo"
import InputFields from "../components/form/input"
import SpinnerArea from "../components/spinner/SpinnerArea"
import SubmitButton from "../components/common/SubmitButton"
import { ImageStyle } from "../components/common/ImageStyle"
import InterestLists from "../components/form/interests/InterestList"
import { EMAIL_REGEX, PASS_REGEX, SignFormValid, checkEmailExistence } from "../lib/Valid"

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

export default function SignUp() {
    const [loading,setIsLoading] = useState(false)
    const setToast = useToastStore((state)=>state.setToast)
    const setSession = useAuthStore((state)=>state.setSession)
    const setProfile = useAuthStore((state)=>state.setProfile)
    const setData = useAuthStore((state)=>state.setData)
    const router = useRouter()
    const supabase = createClient()

    const methods = useForm<SignFormValid>({
        mode: "onChange",
        defaultValues: {
            interests: [],
        },
    })

    const {
        register, control,
        formState: {errors, isValid, isSubmitting },
        handleSubmit,
        getValues, trigger
    } = methods

    const interests = useWatch({ control, name: "interests"})
    let interestsValid = interests?.length > 0

    const onSubmit: SubmitHandler<SignFormValid> = (data) => handleSignUp(data)

    const handleSignUp = async(submitdata:SignFormValid)=>{

        setIsLoading(true)
        try {
            const { data, error } = await supabase.auth.signUp({
                email : submitdata.email,
                password : submitdata.password,
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
                username: submitdata.nickname,
                interests: submitdata.interests,
                email: submitdata.email,
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
            setIsLoading(false)
        }
    }

    return(
        <SignUpWrapper>
            <h2 className="sr-only">책담 회원가입 페이지. 모든 항목은 필수입력 입니다.</h2>
            <SpinnerArea text="회원가입 처리중..." isLoading={loading}/>
            <Image
            src={'/images/main-logo.svg'}
            alt=""
            width={100}
            height={60}
            style={ImageStyle}
            priority
            />
            <Letter>당신의 독서리뷰 다이어리</Letter>
            <div style={{ width: '100%', marginTop: '20px' }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Label>
                        <InputFields
                        placeholder="이메일을 입력해주세요."
                        label="이메일"
                        name="email"
                        required
                        error={errors.email?.message}
                        register={register}
                        rules={{
                            required: true,
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: '이메일 형식을 확인해주세요. ex)book@naver.com'
                            },
                            validate: async(email) => {
                                if(!EMAIL_REGEX.test(email)) return;
                                const existEmail = await checkEmailExistence(email)
                                return existEmail ? '이미 가입된 이메일입니다.' : true
                            }
                        }}/>
                        {errors.email &&
                            <p className="text-red-600 mt-3 text-xl">{errors.email.message}</p>
                        }
                    </Label>
                    <Label style={{ marginTop: '10px' }}>
                        <InputFields
                        placeholder="닉네임을 입력해주세요 (2글자 이상)"
                        label="닉네임"
                        name="nickname"
                        required
                        error={errors.nickname?.message}
                        register={register}
                        rules={{
                            required: true,
                            minLength: {
                                value: 2,
                                message: '닉네임은 두 글자 이상 입력해주세요.'
                            },
                        }}
                        />
                        {errors.nickname &&
                        <p className="text-red-600 mt-3 text-xl">{errors.nickname.message}</p>
                        }
                    </Label>
                    <Label style={{ marginTop: '10px' }}>
                        <InputFields
                        type="password"
                        placeholder="닉네임을 입력해주세요 (2글자 이상)"
                        label="비밀번호"
                        name="password"
                        required
                        error={errors.password?.message}
                        register={register}
                        rules={{
                            required: true,
                            pattern: {
                                value: PASS_REGEX,
                                message: '비밀번호는 문자+숫자 8자리 이상입니다.'
                            },
                            onChange:() => {
                                trigger('passwordCheck')
                            }
                        }}/>
                        {errors.password &&
                        <p className="text-red-600 mt-3 text-xl">{errors.password.message}</p>
                        }
                    </Label>
                    <Label style={{ marginTop: '10px' }}>
                        <InputFields
                        type="password"
                        placeholder={"비밀번호를 한번 더 입력해주세요"}
                        label="비밀번호 확인"
                        name="passwordCheck"
                        required
                        error={errors.passwordCheck?.message}
                        register={register}
                        rules={{
                            required: true,
                            validate: (value) => value === getValues('password') || '비밀번호가 일치하지 않습니다.'
                        }}
                        />
                        {errors.passwordCheck &&
                        <p className="text-red-600 mt-3 text-xl">{errors.passwordCheck.message}</p>
                        }
                    </Label>
                    <Label style={{ marginTop: '10px' }}>
                        <FormProvider {...methods}>
                            <InterestLists />
                        </FormProvider>
                    </Label>
                    <div className="h-[40px] mt-[35px]">
                    <SubmitButton disabled={!isValid || !interestsValid || isSubmitting} type="submit">회원가입</SubmitButton>
                    </div>
                </form>
            </div>
            <ToLoginBox>
                <p>회원이신가요? <Link href={'/login'}>로그인 하러가기</Link></p>
            </ToLoginBox>
        </SignUpWrapper>
    )
}