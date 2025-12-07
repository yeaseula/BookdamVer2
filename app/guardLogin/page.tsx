"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"

export default function GuardLogin() {
    const router = useRouter()
    return (
        <div className="flex flex-col justify-center items-center h-[100vh]">

            <Image src={'/images/fox_guard_done.svg'}
            alt="이미 로그인 중"
            width={230}
            height={230}
            />

            <p className="font-semibold text-3xl mb-5.5">이미 로그인 중입니다 :)</p>
            <button onClick={()=>router.back()}
            className="py-2 pt-3 px-10 pointer-fine:cursor-pointer transition-all bg-cyan-500 hover:bg-cyan-900 text-white rounded-2xl">돌아가기</button>
        </div>
    )
}