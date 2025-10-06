"use client";
import { useRef } from 'react';
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
    width: 100%;
    margin-top: 20px;
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

export default function MainSwiper() {
    const SwiperRef = useRef(null);

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
                <SwiperSlide></SwiperSlide>
                <SwiperSlide></SwiperSlide>
                <SwiperSlide></SwiperSlide>
                <SwiperSlide></SwiperSlide>
                <SwiperSlide></SwiperSlide>
                <SwiperSlide></SwiperSlide>
                <SwiperSlide></SwiperSlide>
                <SwiperSlide></SwiperSlide>
                <SwiperSlide></SwiperSlide>
                <SwiperSlide></SwiperSlide>
                <SwiperSlide></SwiperSlide>
            </StyleSwiper>
        </SliderWrap>
    )
}