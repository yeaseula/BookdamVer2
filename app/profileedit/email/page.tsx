"use client"

import InputFields from "@/app/components/form/input"
import { useState } from "react"
import EditButton from "../components/EditButton"
import { SubWrap } from "@/app/components/common/container.styled"
import { LabelStyle } from "@/app/components/form/Label"

export default function EditEmail() {
    const [newEmail,setEmail] = useState<string>('');
    const [loading,setLoading] = useState<boolean>(false);

const handleSubmit = async() => {
    alert('supabase 인증 강화로 인해 \n 실제 이메일 주소로 인증 메일이 전송됩니다. \n 포트폴리오용 서비스이기에 해당 기능은 작업하지 않습니다.')
}

    return(
        <SubWrap>
            <LabelStyle>
                <span>이메일</span>
                <InputFields type={"email"}
                name={"login-emapl"}
                placeholder={"이메일을 입력해주세요"}
                onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setEmail(e.currentTarget.value)}
                />
            </LabelStyle>
            <EditButton type="email" vlaue={newEmail} loading={loading} onClick={handleSubmit}></EditButton>
        </SubWrap>
    )
}