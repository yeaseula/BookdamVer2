"use client"
import MainSlide from "./mainSlide/MainBanner"
import SectionPageThree from "./section3/SectionPage"
import { useAuthStore, Reviews } from "../lib/userfetch"
import { useEffect, useState } from "react"
import { fetchBookCover,fetchBookAI } from "../lib/fetchBookCover"

export default function MainPage() {

    const [reviewThumb,setReviewThumb] = useState<string[]>([])
    const [AithumbArr,setAiThumbArr] = useState<string[]>([])

    const { profile, reviews, isReviewLoaded } = useAuthStore()
    const nickname = profile?.username
    const interest = profile?.interests

    useEffect(()=>{
        if(!isReviewLoaded) return

        const MyReviewThumb = async(title:string,author:string) => {
            const Thumbnail = await fetchBookCover(title,author)
            setReviewThumb((prev)=>[...prev,Thumbnail])
        }

        reviews.map((ele)=>(
            MyReviewThumb(ele.title,ele.author)
        ))

    },[isReviewLoaded])


    useEffect(()=>{
        const RecomAi = async(array:string[])=>{
            if(!interest) return
            const Thumbnail = await fetchBookAI(array)
            setAiThumbArr(Thumbnail)
        }
        RecomAi(interest)
    },[profile])

    return(
        <>
        <MainSlide slide={reviewThumb} readingCount={reviewThumb.length}></MainSlide>
        <SectionPageThree username={nickname} books={AithumbArr}></SectionPageThree>
        </>
    )
}