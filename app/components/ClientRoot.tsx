"use client"
import { useEffect } from "react"
import { useAuthStore } from "../lib/userfetch"
import { Session } from "@supabase/supabase-js"
import { Reviews } from "../lib/userfetch"
import { Memo, Books, Log } from "../lib/userfetch"

interface Props {
  initialSession: Session | null
  initialProfile: { username: string; interests: string[] } | null
  initialReview: any
  initialMemo: any
  initialBooks: any
  initialLog: any
  children: React.ReactNode
}

export default function ClientRoot({
  initialSession,
  initialProfile,
  initialReview,
  initialMemo,initialBooks, initialLog, children}:Props) {

    const setSession = useAuthStore((state)=>state.setSession)
    const setProfile = useAuthStore((state)=>state.setProfile)
    const setData = useAuthStore((state)=>state.setData)

    useEffect(()=>{
      setSession(initialSession)
      setProfile(initialProfile)
      setData<Reviews>('reviews',initialReview)
      setData<Memo>('memo',initialMemo)
      setData<Books>('books',initialBooks)
      setData<Log>('log',initialLog)
    },[])

    return <>{children}</>
}