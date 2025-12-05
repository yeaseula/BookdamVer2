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
import { useAuthStore } from '../../lib/userfetch';
import BannerButton from '../mainButton/bannerButton';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const SliderWrap = styled.div`
    position: relative;
    z-index: 5;
    width: 100%;
    height: auto;
    padding: 48px 15px 0;
    aspect-ratio: 375/280;
    padding-bottom: 5rem;
`
const Text = styled.div`
    position: relative;
    font-size: 2.1rem;
    color: #fff;
`
const UserName = styled.span`
    font-size: 2.8rem;
    vertical-align: inherit;
`
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
}

export default function MainSwiper({slide}:{slide:BannerBook[]}) {
    const SwiperRef = useRef(null)
    const {profile, isReviewLoaded} = useAuthStore()
    const username = profile?.username
    const [isContent,setIsContent] = useState<boolean>(null)
    const [ready,setReady] = useState<boolean>(false)

    useEffect(()=>{
        if(slide.length > 0) {
            setIsContent(true)
            setTimeout(()=>{
                setReady(true)
            },700)
        } else {
            setIsContent(false)
            setTimeout(()=>{
                setReady(true)
            },700)
        }
    },[slide])


    return (
        <SliderWrap>
            <Text>
                {username && (
                    <>
                        <p><UserName>{username}</UserName>님,</p>
                        <p>오늘도 당신의 이야기를 들려주실래요?</p>
                    </>
                )}
                {!username && (
                    <>
                    <SkeletonTheme width={'100px'}
                    baseColor="#bdbdbd" highlightColor="#fff">
                        <Skeleton count={1} />
                    </SkeletonTheme>
                    <SkeletonTheme width={'320px'}
                    baseColor="#bdbdbd" highlightColor="#fff">
                        <Skeleton count={1} />
                    </SkeletonTheme>
                    </>
                )}
            </Text>
            <div className='mt-[20px] flex justify-center' style={{ alignItems:'center',height: '174px' }}>
                {/* <div className='prev-main-slide'>이전 슬라이드</div>
                <div className='next-slide-main'>다음 슬라이드</div> */}
                {isReviewLoaded && ready && (
                    <>
                    {isContent &&
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
                        {slide.map((ele:BannerBook,idx:string | number)=>(
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
                    <BannerButton isContent={isContent}/>
                    </>
                )}
                {!isReviewLoaded || !ready && (
                    <div className="relative w-8 h-8">
                        <div className="absolute inset-0 border-4 border-amber-300 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-blue-950 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

            </div>
        </SliderWrap>
    )
}