"use client"
import { useEffect } from "react"
import { Profiles, useAuthStore, useSettingStore } from "../lib/userfetch"
import { Session } from "@supabase/supabase-js"
import { DataState,Reviews, Memo, Books, Log, Wish } from "../lib/userfetch"
import StopWatch from "../reading/components/stopwatch/StopWatch"
import { usePathname } from "next/navigation"
import 'react-loading-skeleton/dist/skeleton.css'

interface Props {
  initialSession: Session | null
  initialProfile: DataState<Profiles>
  initialReview: DataState<Reviews[]>
  initialMemo: DataState<Memo[]>
  initialBooks: DataState<Books[]>
  initialLog: DataState<Log[]>
  initialWish: DataState<Wish[]>
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
    const { userSetting } = useSettingStore()

    const { isTimer } = useAuthStore()
    const useTimer = pathname !== '/login' && pathname !== '/sign'

    function applyFontSize(px: number) {
      const percent = (px / 16) * 62.5;
      document.documentElement.style.fontSize = `${percent}%`;
    }

    console.log(initialSettings)

    useEffect(()=>{
      setSession(initialSession)
      setProfile(initialProfile)
      setData('reviews',initialReview)
      setData('memo',initialMemo)
      setData('books',initialBooks)
      setData('log',initialLog)
      setData('wish',initialWish)
      initSettings(initialSettings.data[0])
    },[])

    useEffect(()=>{
      applyFontSize(userSetting.font);
    },[userSetting.font])

    return (
    <>
      {children}
        {isTimer && useTimer &&
          <StopWatch />
        }
    </>
    )
}