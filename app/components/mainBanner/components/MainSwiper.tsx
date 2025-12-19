"use client";
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styled, {keyframes} from 'styled-components';
import { useAuthStore } from '../../../lib/userfetch';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y, Keyboard, Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/a11y';
import 'swiper/css/keyboard';
import { fetchBookCover } from '@/app/lib/fetchBookCover';
import { useErrorUtil } from '@/app/error/useErrorUtil';
import { RiExpandHorizontalLine } from '@remixicon/react';
import { BannerBook } from '@/app/lib/dataTypes';
import { SlideImageStyle } from '../../common/ImageStyle';

const StyleSwiper = styled(Swiper)`
    position: relative;
    width: 125px;
    aspect-ratio: 3.3/4.6;
    border-radius: 10px;
    overflow: hidden;
    .swiper-slide {
        opacity: 1;
        background-position: center;
        background-size: cover;
    }
`
const wiggle = keyframes`
    0% { transform: translateX(-7%) translateX(0px); }
    50% { transform: translateX(-7%) translateX(4px); }
    100% { transform: translateX(-7%) translateX(0px); }
`;
const Infor = styled.button`
    width: 100%;
    height: 100%;
    z-index: 3;
    background: #fff;
    opacity: 0.85;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 8px;
    animation: ${wiggle} 1.1s ease-in-out infinite;
`

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

        const MyReviewThumb = async() => {
            try {
                const thumbnailPromise = reviews.data.map(async(ele)=>{
                    try {
                        const thumbnail = await fetchBookCover(ele.title, ele.author)
                        return thumbnail
                    } catch (err) {
                        return null
                    }
                })

                const thumbnails = await Promise.all(thumbnailPromise)

                if(isCancelled) return

                const validTumbnails = thumbnails.filter(Boolean)
                setReviewThumb(validTumbnails)

                setTimeout(()=>{
                    if(!isCancelled) { setIsReady(true) }
                }, 700)
            } catch(err) {
                if(!isCancelled) throwError(err)
            }
        }

        MyReviewThumb()

        return () => {
            isCancelled = true
        }
    },[isReviewLoaded, reviews.data])

    useEffect(()=>{
        if(!isReady || isInfo) return

        const timer = setTimeout(()=>{
            setIsInfo(true)
        }, 5000)

        return () => clearTimeout(timer)
    },[isReady])

    const handleHint =()=>{
        if(!isInfo) return
        setIsInfo(false)
    }

    return (
        <>
            {!isReady &&
                <Skeleton height={174} style={{ lineHeight: '1.6', borderRadius: '10px' }} />
            }
            {isReady &&
            <>
            <StyleSwiper
                modules={[Navigation, A11y, Keyboard, Autoplay]}
                onSwiper={(swiper)=>SwiperRef.current = swiper}
                navigation={{
                    nextEl: '.next-slide-main',
                    prevEl: '.prev-slide-main',
                }}
                loop={true}
                slidesPerView={'auto'}
                keyboard={{ enabled: true }}
                a11y={{ enabled: true }}
                onSlideChange={handleHint}
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
                        <Infor onPointerEnter={handleHint} aria-label='내가 쓴 리뷰 슬라이드입니다'>
                            <RiExpandHorizontalLine size={24} className='text-gray-500'/>
                            <p className='mt-2 text-xl text-gray-600'>좌 우로<br /> 움직여보세요</p>
                        </Infor>
                    </motion.div>
                }
                </AnimatePresence>
                {reviewThumb.map((ele:BannerBook,idx:string | number)=>(
                    <>
                    {!ele.bookThumb &&
                        <SwiperSlide
                        key={idx}
                        tabIndex={0}
                        aria-label={`${idx}번째 표지`}
                        >
                            <Image
                            src={"/images/noThumb.svg"}
                            alt={`${ele.booktitle} 표지`}
                            width={125}
                            height={174}
                            priority
                            />
                        </SwiperSlide>
                    }
                    {ele.bookThumb &&
                        <SwiperSlide
                        key={idx}
                        tabIndex={0}
                        aria-label={`${idx}번째 슬라이드`}
                        >
                            <Image
                            src={ele.bookThumb}
                            alt={`${ele.booktitle} 표지`}
                            width={'125'}
                            height={'174'}
                            fetchPriority='high'
                            />
                        </SwiperSlide>
                    }
                    </>
                ))}
            </StyleSwiper>
            </>
            }
        </>
    )
}