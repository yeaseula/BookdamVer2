"use client"
import { useEffect } from "react"
import { useAuthStore } from "../lib/userfetch"
import { Session } from "@supabase/supabase-js"

interface Props {
  initialSession: Session | null
  initialProfile: { username: string; interests: string[] } | null
  initialReview: any
  children: React.ReactNode
}

export default function ClientRoot({initialSession, initialProfile,initialReview, children}:Props) {

    const setSession = useAuthStore((state)=>state.setSession)
    const setProfile = useAuthStore((state)=>state.setProfile)
    const setReviews = useAuthStore((state)=>state.setReviews)
    useEffect(()=>{
      setSession(initialSession)
      setProfile(initialProfile)
      setReviews(initialReview)
    },[])

    return <>{children}</>
}