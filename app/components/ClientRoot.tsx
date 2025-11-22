"use client"
import { useEffect } from "react"
import { useAuthStore } from "../lib/userfetch"
import { Session } from "@supabase/supabase-js"

interface Props {
  initialSession: Session | null
  initialProfile: { username: string; interests: string[] } | null
  initialReview: any
  initialMemo: any
  children: React.ReactNode
}

export default function ClientRoot({initialSession, initialProfile, initialReview, initialMemo, children}:Props) {

    const setSession = useAuthStore((state)=>state.setSession)
    const setProfile = useAuthStore((state)=>state.setProfile)
    const setReviews = useAuthStore((state)=>state.setReviews)
    const setMemo = useAuthStore((state)=>state.setMemo)
    useEffect(()=>{
      setSession(initialSession)
      setProfile(initialProfile)
      setReviews(initialReview)
      setMemo(initialMemo)
    },[])

    return <>{children}</>
}