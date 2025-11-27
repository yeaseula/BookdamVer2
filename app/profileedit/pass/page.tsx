"use client"

import styled from "styled-components"
import InputFields from "@/app/components/form/input"
import { useEffect, useRef, useState } from "react"
import EditButton from "../components/EditButton"
import createClient from "@/utils/supabase/client"
import { useToastStore } from "@/app/lib/useToastStore"
import { useRouter } from "next/navigation"

const ProfileWrap = styled.section`
    padding: 80px 15px 65px;
`
const Label = styled.div`
    width: 100%;
    display: block;
    > span { font-size: 12px; color: #616161 }
`

export default function EditPass() {
    const [newPass,setPass] = useState<string>('');
    const [newPass2,setNewPass2] = useState<string>('');
    const [passCheck, setPassCheck] = useState<boolean>(true) //비밀번호 일치하는지

    const newPassRef = useRef('')
    const newPass2Ref = useRef('')

    const [loading,setLoading] = useState<boolean>(false);

    const supabase = createClient()
    const setToast = useToastStore((state)=>state.setToast)
    const router = useRouter()

    const handleSubmit = async() => {
        if (loading) return;
        setLoading(true);

        try {
        const { data, error } = await supabase.auth.updateUser({
            password: newPassRef.current,
        });

        if (error) {
            console.error("비밀번호 변경 실패:", error.message);
            setToast('비밀번호 변경이 실패했습니다','error');
        } else {
            setToast('비밀번호가 변경되었습니다. 다시 로그인해주세요.','success',async()=>{
                await supabase.auth.signOut();
                router.push("/login");
            })
        }
        } catch (err) {
            console.error(err);
            alert("오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    }

    const handlePassCheck = () => {
        if(newPassRef.current === newPass2Ref.current) {
            setPassCheck(true)
        } else {
            setPassCheck(false)
        }
    }

    return(
        <ProfileWrap>
            <Label>
                <span>비밀번호</span>
                <InputFields type={"password"}
                name={"password"}
                placeholder={"비밀번호를 입력해주세요"}
                onBlur={handlePassCheck}
                onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                    newPassRef.current = e.currentTarget.value
                    handlePassCheck()
                }}
                />
            </Label>
            <Label style={{ marginTop: '10px' }}>
                <span>비밀번호 확인</span>
                <InputFields type={"password"}
                name={"password-check"}
                placeholder={"비밀번호를 재입력 해주세요"}
                onBlur={handlePassCheck}
                onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                    newPass2Ref.current = e.currentTarget.value
                    handlePassCheck()
                }}
                />
                {!passCheck && <span style={{fontSize:'1rem', color: 'red'}}>비밀번호를 정확하게 입력해주세요.</span>}
            </Label>
            <EditButton type="pass" vlaue={newPassRef.current} vlaueCheck={newPass2Ref.current} passCheck={passCheck} loading={loading} onClick={handleSubmit}></EditButton>
        </ProfileWrap>
    )
}