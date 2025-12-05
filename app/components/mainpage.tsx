"use client"
import MainSlide from "./mainSlide/MainBanner"
import SectionPageThree from "./section3/SectionPage"
import { useAuthStore, Reviews, Books } from "../lib/userfetch"
import { useEffect, useRef, useState } from "react"
import { fetchBookCover,fetchBookAI } from "../lib/fetchBookCover"
import SectionPageOne from "./section1/SectionPage"
import Calendar from "./section2/Calendar"
import SpinnerArea from "./spinner/SpinnerArea"

interface BannerBook {
    bookThumb: string;
    booktitle: string;
}

export default function MainPage() {
    const [reviewThumb,setReviewThumb] = useState<BannerBook[]>([])
    const [AithumbArr,setAiThumbArr] = useState<string[]>([])
    const [stampDate,setStampDate] = useState<string[]>([])
    const { profile, reviews, isReviewLoaded, books } = useAuthStore()
    const nickname = profile?.username
    const interest = profile?.interests

    useEffect(()=>{
        //console.log('아예 실행전')
        if(!isReviewLoaded) return
        if(reviewThumb.length > 0) return
        //console.log('실행 시작')
        //console.log('1. 리뷰갯수 :' + reviews.length)
        //console.log('2. 리뷰썸네일 확정 갯수 : '+reviewThumb.length)

        let isCancelled = false

        const MyReviewThumb = async(title:string,author:string) => {
            const Thumbnail = await fetchBookCover(title,author)

            //console.log(Thumbnail + '패치북커버 함수 결과')
            const testing = reviewThumb.find((ele)=>ele === Thumbnail)
            //console.log(testing + ': 중복확인 디버깅 테스트 코드')
            if(isCancelled) return
            setReviewThumb((prev)=>[...prev,Thumbnail])
        }

        if(!reviews) return
        reviews.map((ele)=>(
            MyReviewThumb(ele.title,ele.author)
        ))

        if(!isCancelled) {
            reviews.map(ele=>{
                setStampDate((prev)=>[...prev,ele.end_date])
            })
        }
        return () => {
            isCancelled = true
        }
    },[isReviewLoaded])

    useEffect(()=>{
        const RecomAi = async(array:string[])=>{
            if(!interest) return
            const Thumbnail = await fetchBookAI(array)
            setAiThumbArr(Thumbnail)
        }
        RecomAi(interest)
    },[profile])

    // useEffect(()=>{console.log(reviewThumb)},[reviewThumb])

    return(
        <>
        {!profile && <SpinnerArea text="로딩중 .."/>}
        {profile && (
            <>
                <MainSlide slide={reviewThumb}></MainSlide>
                <SectionPageOne readingCount={reviewThumb.length} books={books}></SectionPageOne>
                <Calendar stampDate={stampDate}/>
                <SectionPageThree username={nickname} books={AithumbArr}></SectionPageThree>
            </>
        )}
        </>
    )
}