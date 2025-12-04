"use client"

import styled from "styled-components"
import Link from "next/link"
import { RiArrowRightSLine } from "@remixicon/react"
import { useAuthStore } from "../lib/userfetch"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'

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
    const { session, profile } = useAuthStore()

    return(
        <ProfileWrap>
            <h2 className="sr-only">프로필 수정</h2>
            {profile && session ? (
            <>
            <Container>
                <p>
                    이메일 수정<br />
                    <span className="text-xl text-gray-600">{session.user.email}</span>
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
                <p>
                    닉네임 수정<br />
                    <span className="text-xl text-gray-600">{profile.username}</span>
                </p>
                <RiArrowRightSLine size={18} />
                <Inner href={'/profileedit/nickname'} />
            </Container>
            <Container>
                <p>
                    관심사 수정<br />
                    {profile.interests.map((ele,index)=>(
                        <span key={`${index}-${ele}`} className="text-xl text-gray-600 mr-1.5">#{ele}</span>
                    ))}
                </p>
                <RiArrowRightSLine size={18} />
                <Inner href={'/profileedit/interest'} />
            </Container>
            </>
            ) : (
                <>
                    <Skeleton height={78} style={{ marginBottom: '10px' }} />
                    <Skeleton height={54} style={{ marginBottom: '10px' }} />
                    <Skeleton height={78} style={{ marginBottom: '10px' }} />
                    <Skeleton height={78} style={{ marginBottom: '10px' }} />
                </>
            )}

        </ProfileWrap>
    )
}