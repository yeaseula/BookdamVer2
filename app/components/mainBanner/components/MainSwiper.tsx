"use client";
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y, Keyboard, Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/a11y';
import 'swiper/css/keyboard';
import styled, {keyframes} from 'styled-components';
import { useAuthStore } from '../../../lib/userfetch';
import { fetchBookCover } from '@/app/lib/fetchBookCover';
import { useErrorUtil } from '@/app/error/useErrorUtil';
import { RiExpandHorizontalLine } from '@remixicon/react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';

const StyleSwiper = styled(Swiper)`
    position: relative;
    width: 125px;
    aspectratio: 3/4;
    overflow: hidden;
    border-radius: 10px;
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

const wiggle = keyframes`
    0% { transform: translateX(-7%) translateX(0px); }
    50% { transform: translateX(-7%) translateX(4px); }
    100% { transform: translateX(-7%) translateX(0px); }
`;

const Infor = styled.div`
    width: 100%;
    height: 100%;
    z-index: 3;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 8px;
    animation: ${wiggle} 1.1s ease-in-out infinite;
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
    const [isInfo,setIsInfo] = useState(false)
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
                setTimeout(()=>setIsReady(true), 700)
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

    useEffect(()=>{
        if(isReady) {
            if(isInfo) return
            setTimeout(()=>{
                setIsInfo(true)
            },1000)
        }
    },[isReady])

    const handleHint = () => {
        if(!isInfo) return
        setIsInfo(false)
    }

    return (
        <>
            {/* <div className='prev-main-slide'>이전 슬라이드</div>
            <div className='next-slide-main'>다음 슬라이드</div> */}
            {!isReady &&
                <Skeleton height={174} style={{ lineHeight: '1.6', borderRadius: '10px' }} />
            }
            {isReady &&
            <StyleSwiper
                modules={[Navigation, A11y, Keyboard, Autoplay]}
                onSwiper={(swiper)=>SwiperRef.current = swiper}
                navigation={{
                    nextEl: '.next-slide-main',
                    prevEl: '.prev-slide-main',
                }}
                centeredSlides={true}
                loop={true}
                a11y={{ enabled: true }}
                slidesPerView={'auto'}
            >
                <AnimatePresence>
                {isInfo &&
                    <motion.div
                    initial={{opacity:0 }}
                    animate={{opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ ease: "easeOut", duration: 0.3 }}
                    className='absolute top-0 left-0 w-[100%] h-[100%] z-10'
                    >
                        <Infor onPointerEnter={handleHint}>
                            <RiExpandHorizontalLine size={24} className='text-gray-500'/>
                            <p className='mt-2 text-xl text-gray-600'>좌 우로<br /> 움직여보세요</p>
                        </Infor>
                    </motion.div>
                }
                </AnimatePresence>
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