"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "../error/Error.styled"
import { useAuthStore } from "../lib/userfetch"
import { useEffect } from "react"

export default function GuardNeedLogin() {
    const router = useRouter()
    const setGlobalError = useAuthStore((s) => s.setGlobalError)
    useEffect(() => {
        setGlobalError(true)
        return () => setGlobalError(false)
    }, [])
    return (
        <div className="flex flex-col justify-center items-center h-[100vh]">

            <Image src={'/images/fox_guard_need_login.svg'}
            alt="로그인 필요"
            width={250}
            height={250}
            priority
            />

            <p className="font-semibold text-3xl mb-5.5">로그인 후 이용 가능합니다 :)</p>
            <Button onClick={()=>router.push('/login')}>로그인 하러가기</Button>
        </div>
    )
}