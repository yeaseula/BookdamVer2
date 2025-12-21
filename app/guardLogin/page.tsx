"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "../error/Error.styled"
import { useAuthStore } from "../lib/userfetch"
import { useEffect } from "react"

export default function GuardLogin() {
    const router = useRouter()
    const setGlobalError = useAuthStore((s) => s.setGlobalError)
    useEffect(() => {
        setGlobalError(true)
        return () => setGlobalError(false)
    }, [])

    return (
        <div className="flex flex-col justify-center items-center h-[100vh]">

            <Image src={'/images/fox_guard_done.svg'}
            alt=""
            width={250}
            height={250}
            priority
            />

            <p className="font-semibold text-3xl mb-5.5">이미 로그인 중입니다 :)</p>
            <Button onClick={()=>router.push('/')}>홈으로 이동</Button>
        </div>
    )
}