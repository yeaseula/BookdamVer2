"use client"

import styled from "styled-components"
import InputFields from "@/app/components/form/input"
import { useEffect, useState } from "react"
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

export default function EditEmail() {
    const [newEmail,setEmail] = useState<string>('');
    const [loading,setLoading] = useState<boolean>(false);

const handleSubmit = async() => {
    alert('supabase 인증 강화로 인해 \n 실제 이메일 주소로 인증 메일이 전송됩니다. \n 포트폴리오용 서비스이기에 해당 기능은 작업하지 않습니다.')
}

    return(
        <ProfileWrap>
            <Label>
                <span>이메일</span>
                <InputFields type={"email"}
                name={"login-emapl"}
                placeholder={"이메일을 입력해주세요"}
                onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setEmail(e.currentTarget.value)}
                />
            </Label>
            <EditButton type="email" vlaue={newEmail} loading={loading} onClick={handleSubmit}></EditButton>
        </ProfileWrap>
    )
}