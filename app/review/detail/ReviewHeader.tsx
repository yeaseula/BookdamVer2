"use client"

import { useHeaderStore } from "@/app/lib/useHeaderStore"
import { Reviews, DataState } from "@/app/lib/userfetch"
import { useAuthStore } from "@/app/lib/userfetch"
import { useEffect } from "react"

export function ReviewHeader({postNumber}) {

    const { reviews } = useAuthStore() as { reviews: DataState<Reviews[]>}
    const setHeader = useHeaderStore((state)=>state.setHeader)

    useEffect(()=>{
        if(!reviews) return;
        const result = reviews.data.filter((review)=>review.id === postNumber)

        if(!result) return
        setHeader(result[0]?.title, 'detail')
    },[reviews])


    return null
}