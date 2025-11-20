"use client"
import { useEffect } from "react"
import { useAuthStore } from "../lib/userfetch"
import { Session } from "@supabase/supabase-js"

interface Props {
  initialSession: Session | null
  initialProfile: { username: string; interests: string[] } | null
  children: React.ReactNode
}

export default function ClientRoot({initialSession, initialProfile, children}:Props) {

    const setSession = useAuthStore((state)=>state.setSession)
    const setProfile = useAuthStore((state)=>state.setProfile)

    setSession(initialSession)
    setProfile(initialProfile)

    return <>{children}</>
}