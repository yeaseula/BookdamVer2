"use client"

import styled from "styled-components"
import InputFields from "@/app/components/form/input"
import { useRef, useState } from "react"
import EditButton from "../components/EditButton"
import createClient from "@/utils/supabase/client"
import { useToastStore } from "@/app/lib/useToastStore"
import { useRouter } from "next/navigation"
import { CheckPassword, handlePassCheck } from "@/app/lib/Valid"
import { WarningMessage } from "@/app/signup/warningMsg"
import SpinnerArea from "@/app/components/spinner/SpinnerArea"
import { SubWrap } from "@/app/components/common/container.styled"
import { LabelStyle } from "@/app/components/form/Label"

export default function EditPass() {
    const [passValue,setPassValue] = useState<boolean | null>(null) //pass 유효성
    const [passCheck, setPassCheck] = useState<boolean | null>(null) //일치

    const newPassRef = useRef('')
    const newPass2Ref = useRef('')

    const [loading,setLoading] = useState<boolean>(false);

    const supabase = createClient()
    const setToast = useToastStore((state)=>state.setToast)
    const router = useRouter()
    let debounce:boolean = false

    const handleSubmit = async() => {
        if (debounce || loading) return;

        debounce = true
        setLoading(true)

        try {
            const { data, error } = await supabase.auth.updateUser({
                password: newPassRef.current,
            });

            if (error) {
                if(error.code === 'weak_password') {
                    setToast('비밀번호는 8자 이상, 문자+숫자 조합으로 설정해주세요.', 'error')
                    throw new Error('비밀번호는 8자 이상, 문자+숫자 조합으로 설정해주세요.')
                }
            }

            setToast('비밀번호가 변경되었습니다. 잠시 후 로그인 페이지로 이동합니다.','success')

            await new Promise(resolve => setTimeout(resolve, 3000))

            const { error:logoutError } = await supabase.auth.signOut()

            if(logoutError) throw new Error('비밀번호 변경은 완료됐지만 자동 로그아웃에 실패했습니다.')

            router.push('/login')

            return
        }
        catch (err) {
            console.error(err);
            const errorMessage = err instanceof Error
                ? err.message
                : '비밀번호 수정 중 오류가 발생했습니다'
            setToast(errorMessage, "error")
            debounce = false
            setLoading(false)
        }
    }

    return(
        <SubWrap>
            {loading && <SpinnerArea text="비밀번호 변경 처리중..." />}
            <LabelStyle>
                <span>비밀번호</span>
                <InputFields type={"password"}
                name={"password"}
                placeholder={"비밀번호를 입력해주세요"}
                onBlur={(e:React.ChangeEvent<HTMLInputElement>)=>{
                    CheckPassword(e.currentTarget.value,setPassValue);
                    handlePassCheck(newPassRef, newPass2Ref ,setPassCheck )
                }}
                onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                    newPassRef.current = e.currentTarget.value;
                    handlePassCheck(newPassRef, newPass2Ref ,setPassCheck )
                }}
                />
            </LabelStyle>
            <LabelStyle style={{ marginTop: '10px' }}>
                <span>비밀번호 확인</span>
                <InputFields type={"password"}
                name={"password-check"}
                placeholder={"비밀번호를 재입력 해주세요"}
                onBlur={()=>handlePassCheck(newPassRef, newPass2Ref ,setPassCheck )}
                onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                    newPass2Ref.current = e.currentTarget.value
                    handlePassCheck(newPassRef, newPass2Ref ,setPassCheck )
                }}
                />
                <WarningMessage state={passCheck} text="비밀번호를 정확하게 입력해주세요." />
            </LabelStyle>
            <EditButton
            type="pass"
            vlaue={newPassRef.current}
            vlaueCheck={newPass2Ref.current}
            passCheck={passCheck}
            loading={loading}
            onClick={handleSubmit} />
        </SubWrap>
    )
}