"use client"
import { useEffect } from "react"
import { useAuthStore, useSettingStore } from "../lib/userfetch"
import { Session } from "@supabase/supabase-js"
import { Reviews } from "../lib/userfetch"
import { Memo, Books, Log, Wish } from "../lib/userfetch"
import StopWatch from "../reading/components/stopwatch/StopWatch"
import { usePathname } from "next/navigation"

interface Props {
  initialSession: Session | null
  initialProfile: { username: string; interests: string[] } | null
  initialReview: any
  initialMemo: any
  initialBooks: any
  initialLog: any
  initialWish: any
  initialSettings: any
  children: React.ReactNode
}

export default function ClientRoot({
  initialSession,
  initialProfile,
  initialReview,
  initialMemo,
  initialBooks,
  initialLog,
  initialWish,
  initialSettings,
  children}:Props) {

    const pathname = usePathname()
    const setSession = useAuthStore((state)=>state.setSession)
    const setProfile = useAuthStore((state)=>state.setProfile)
    const setData = useAuthStore((state)=>state.setData)
    const initSettings = useSettingStore((state)=>state.initSettings)

    const { isTimer } = useAuthStore()
    const useTimer = pathname !== '/login' && pathname !== '/sign'

    useEffect(()=>{
      setSession(initialSession)
      setProfile(initialProfile)
      setData<Reviews>('reviews',initialReview)
      setData<Memo>('memo',initialMemo)
      setData<Books>('books',initialBooks)
      setData<Log>('log',initialLog)
      setData<Wish>('wish',initialWish)
      initSettings(initialSettings)
    },[])

    return (
    <>
      {children}
        {isTimer && useTimer &&
          <StopWatch />
        }
    </>
    )
}