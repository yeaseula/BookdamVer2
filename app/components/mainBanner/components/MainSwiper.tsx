"use client";
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y, Keyboard, Autoplay, EffectCards} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/a11y';
import 'swiper/css/keyboard';
import styled from 'styled-components';
import { useAuthStore } from '../../../lib/userfetch';
import { fetchBookCover } from '@/app/lib/fetchBookCover';
import { useErrorUtil } from '@/app/error/useErrorUtil';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
const StyleSwiper = styled(Swiper)`
    width: 125px;
    aspectratio: 3/4;
    .swiper-wrapper {
        align-items: center;
    }
    .swiper-slide {
        width: 125px;
        aspect-ratio: 3.3/4.6;
        margin: 0 6.5px;
        background-color: #bdbdbd;
        opacity: 1;
        background-position: center;
        background-size: cover;
        border-radius: 5px;
        overflow: hidden;
    }
    .swiper-slide:nth-child(1n) {
        background-color: #fffdf5;
    }

    .swiper-slide:nth-child(2n) {
        background-color: #fff7cc;
    }

    .swiper-slide:nth-child(3n) {
        background-color: #ffef99;
    }

`
interface BannerBook {
    bookThumb: string;
    booktitle: string;
    error?: any;
}

export default function MainSwiper() {
    const SwiperRef = useRef(null)
    const {reviews,isReviewLoaded} = useAuthStore()
    const [isReady,setIsReady] = useState(false)
    const [reviewThumb,setReviewThumb] = useState<BannerBook[]>([])
    const throwError = useErrorUtil()

    useEffect(()=>{
        if(!isReviewLoaded) return
        if(reviewThumb.length > 0) return

        let isCancelled = false

        const MyReviewThumb = async(title:string,author:string) => {
            try {
                const Thumbnail = await fetchBookCover(title,author)
                if(isCancelled) return
                if(Thumbnail) {
                    setReviewThumb((prev)=>[...prev,Thumbnail])
                }
            } catch(err) {
                throwError(err)
            } finally {
                setIsReady(true)
            }
        }

        if(!reviews.data) return

        reviews.data.map((ele)=>(
            MyReviewThumb(ele.title,ele.author)
        ))

        return () => {
            isCancelled = true
        }
    },[isReviewLoaded])

    return (
        <>
            {/* <div className='prev-main-slide'>이전 슬라이드</div>
            <div className='next-slide-main'>다음 슬라이드</div> */}
            {!isReady &&
                <Skeleton height={174} style={{ lineHeight: '1.6', borderRadius: '10px' }} />
            }
            {isReady &&
            <StyleSwiper
                effect={'cards'}
                modules={[Navigation, A11y, Keyboard, Autoplay, EffectCards]}
                onSwiper={(swiper)=>SwiperRef.current = swiper}
                navigation={{
                    nextEl: '.next-slide-main',
                    prevEl: '.prev-slide-main',
                }}
                centeredSlides={true}
                loop={true}
                a11y={{ enabled: true }}
                slidesPerView={'auto'}
                className='my-book-list'
            >
                {reviewThumb.map((ele:BannerBook,idx:string | number)=>(
                    <>
                    {!ele.bookThumb &&
                    <SwiperSlide key={idx}
                        style={{ backgroundImage: 'url("/images/noThumb.svg")' }}
                    >
                        <p className='mt-5 text-center text-xl'>{ele.booktitle}</p>
                        <p className='text-center text-xl'>썸네일이 없습니다</p>
                    </SwiperSlide>
                    }
                    {ele.bookThumb &&
                    <SwiperSlide key={idx}
                        style={{ backgroundImage : `url(${ele.bookThumb})` }}
                        />
                    }
                    </>
                ))}
            </StyleSwiper>
            }
        </>
    )
}