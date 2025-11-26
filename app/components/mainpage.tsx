"use client"
import MainSlide from "./mainSlide/MainBanner"
import SectionPageThree from "./section3/SectionPage"
import { useAuthStore, Reviews } from "../lib/userfetch"
import { useEffect, useState } from "react"
import { fetchBookAI } from "../lib/fetchBookCover"

export default function MainPage() {

    const [thumbArr,setThumbArr] = useState<string[]>([])

    const { profile, reviews } = useAuthStore()
    const nickname = profile?.username
    const interest = profile?.interests
    console.log(reviews)


    useEffect(()=>{
        const RecomAi = async(array:string[])=>{
            if(!interest) return
            const Thumbnail = await fetchBookAI(array)
            setThumbArr(Thumbnail)
        }
        RecomAi(interest)
    },[profile])

    return(
        <>

        <SectionPageThree username={nickname} books={thumbArr}></SectionPageThree>
        </>
    )
}