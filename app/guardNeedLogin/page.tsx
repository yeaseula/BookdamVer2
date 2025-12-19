"use client"

import Image from "next/image"
import Link from "next/link"

export default function GuardNeedLogin() {
    return (
        <div className="flex flex-col justify-center items-center h-[100vh]">

            <Image src={'/images/fox_guard_need_login.svg'}
            alt="로그인 필요"
            width={250}
            height={250}
            priority
            />

            <p className="font-semibold text-3xl mb-5.5">로그인 후 이용 가능합니다 :)</p>
            <Link href={'/login'}
            className="py-2 pt-3 px-10 pointer-fine:cursor-pointer transition-all bg-cyan-500 hover:bg-cyan-900 text-white rounded-2xl">로그인 하러 가기</Link>
        </div>
    )
}