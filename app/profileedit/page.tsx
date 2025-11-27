"use client"

import styled from "styled-components"
import { useState } from "react"
import Link from "next/link"
import { RiArrowRightSLine } from "@remixicon/react"
import { useAuthStore } from "../lib/userfetch"

const ProfileWrap = styled.section`
    padding: 80px 15px 65px;
`
const Container = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    margin-bottom: 10px;
`
const Inner = styled(Link)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 10px 20px;
`

export default function ProfileEdit() {
    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('')
    const [nickname,setNickname] = useState<string>('')
    const [interest,setInterest] = useState<string[]>([])
    const [loading,setLoading] = useState<boolean>(false)
    const { session } = useAuthStore()
    if(!session) return
    console.log(session)

    return(
        <ProfileWrap>
            <h2 className="sr-only">프로필 수정</h2>
            <Container>
                <p>
                    이메일 수정<br />
                    {session.user.email}
                </p>
                <RiArrowRightSLine size={18} />
                <Inner href={'/profileedit/email'} />
            </Container>
            <Container>
                <p>비밀번호 수정</p>
                <RiArrowRightSLine size={18} />
                <Inner href={'/profileedit/pass'} />
            </Container>
            <Container>
                <p>닉네임 수정</p>
                <RiArrowRightSLine size={18} />
                <Inner href={'/'} />
            </Container>
            <Container>
                <p>관심사 수정</p>
                <RiArrowRightSLine size={18} />
                <Inner href={'/'} />
            </Container>
            {/* <ProfileInfo
            setEmail={setEmail}
            setPassword={setPassword}
            setNickname={setNickname}
            interest={interest}
            setInterest={setInterest}
            />
            <EditButton
            email={email}
            password={password}
            nickname={nickname}
            loading={loading}
            text={'수정'}
            onClick={()=>handleEdit()}
            /> */}
        </ProfileWrap>
    )
}