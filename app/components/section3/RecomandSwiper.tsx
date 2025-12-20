"use client"
import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y, Keyboard, Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/a11y';
import 'swiper/css/keyboard';
import styled from 'styled-components';
import { useAuthStore } from '@/app/lib/userfetch';
import { fetchBookAI } from '@/app/lib/fetchBookCover';
import { useErrorUtil } from '@/app/error/useErrorUtil';
import { BookAiType } from '@/app/lib/dataTypes';
import SkeletonBox from '../common/SkeletonBox';
import RealSlide from './components/RealSlide';
import SkeletonSlide from './components/SkeletonSlide';

const SliderWrap = styled.div`
    position: relative;
    margin-top: 5px;
    height: 156px;
`
const StyleSwiper = styled(Swiper)`
    overflow:visible;
    width: 85%;
    .swiper-slide:focus-visible { outline: 2px solid var(--point-color) }
`

export default function RecomandSwiper(){
    const SwiperRef = useRef(null);
    const { profile } = useAuthStore()
    const [AithumbArr,setAiThumbArr] = useState<BookAiType[]>([])
    const interest = profile.data?.interests
    const throwError = useErrorUtil()


    useEffect(()=>{
        const RecomAi = async(array:string[])=>{
            try {
                if(!interest) return

                const Thumbnail = await fetchBookAI(array)
                if(Thumbnail) {
                    setAiThumbArr(Thumbnail)
                }
            } catch(err) {
                throwError(err)
            }
        }
        RecomAi(interest)
    },[profile])

    const isLoading = AithumbArr.length === 0
    const SLIDE_COUNT = 10
    const slides = AithumbArr.length === 0 ?
    Array.from({ length: SLIDE_COUNT },()=>null) : AithumbArr

    return (
        <SliderWrap>
            <SkeletonBox isLoading={isLoading} />
            <StyleSwiper
                modules={[Navigation, A11y, Keyboard, Autoplay]}
                onSwiper={(swiper)=>SwiperRef.current = swiper}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                spaceBetween={15}
                loop={true}
                loopAdditionalSlides={2}
                keyboard={{ enabled: true }}
                a11y={{ enabled: true }}
                slidesPerView={1}
            >
                {slides.map((item,idx)=>(
                <SwiperSlide
                key={idx}
                tabIndex={0}
                aria-label={`${idx}번째 슬라이드`}
                >
                    {item ? (
                        <RealSlide book={item} />
                    ) : (
                        <SkeletonSlide/>
                    )}
                </SwiperSlide>
                ))}
            </StyleSwiper>
        </SliderWrap>
    )
}