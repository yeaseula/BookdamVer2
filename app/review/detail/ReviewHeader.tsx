"use client"

import { useHeaderStore } from "@/app/lib/useHeaderStore"
import { useEffect } from "react"

export function ReviewHeader({title}) {
    const setHeader = useHeaderStore((state)=>state.setHeader)

    useEffect(()=>{
        setHeader(title, 'detail')
    },[title,setHeader])

    return null
}