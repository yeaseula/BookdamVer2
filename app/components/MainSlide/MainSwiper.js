"use client";
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y, Keyboard, Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/a11y';
import 'swiper/css/keyboard';
import styled from 'styled-components';

const SliderWrap = styled.div`
    position: relative;
    z-index: 5;
    width: 100%;
    height: auto;
    padding: 48px 15px 0;
    aspect-ratio: 375/280;
    padding-bottom: 5rem;
`
const Text = styled.p`
    position: relative;
    font-size: 2.1rem;
    color: #fff;
`
const UserName = styled.span`
    font-size: 2.8rem;
    vertical-align: inherit;
`
const StyleSwiper = styled(Swiper)`
    width: calc(100% + 30px);
    margin: 20px 0 0 -15px;
    .swiper-wrapper {
        align-items: center;
    }
    .swiper-slide {
        width: 90px;
        aspect-ratio: 3/4;
        margin: 0 6.5px;
        background-color: #bdbdbd;
        opacity: 0.5;
        background-position: center;
        background-size: cover;
    }
    .swiper-slide-active {
        opacity: 1 !important;
        width: 105px !important;
    }
`

export default function MainSwiper({slide}) {
    const SwiperRef = useRef(null)
    const slideLength = slide.length

    return (
        <SliderWrap>
            <Text>
                <UserName>모카</UserName>님,<br />
                오늘도 당신의 이야기를 들려주실래요?
            </Text>
            <StyleSwiper
                modules={[Navigation, A11y, Keyboard, Autoplay]}
                onSwiper={(swiper)=>SwiperRef.current = swiper}
                navigation
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                loop={true}
                a11y={{ enabled: true }}
                slidesPerView={'auto'}
                className='my-book-list'
            >
                {slide.map((img)=>(
                    <SwiperSlide key={img} style={{ backgroundImage : `url(${img})` }} />
                ))}
                {slideLength < 11 && Array.from({ length: 11 - slideLength }).map((_, index) => (
                    <SwiperSlide
                    key={`empty-${index}`}
                    style={{ backgroundImage: `url('/images/cover-thumbnail.svg')` }}
                    />
                ))}
            </StyleSwiper>
        </SliderWrap>
    )
}