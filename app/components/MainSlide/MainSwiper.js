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
import { supabase } from '../../lib/supabase';

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

export default function MainSwiper({slide, readingCount}) {
    const SwiperRef = useRef(null)
    const slideLength = readingCount
    const [username,setUsername] = useState(null)

    const fetchProfile = async () => {
        // 현재 로그인한 유저
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError) {
            console.error('유저 정보 가져오기 실패:', userError)
            return null
        }
        if (!user) return null

        // profiles 테이블에서 조회
        const { data, error } = await supabase
            .from('profiles')
            .select('username, interests')
            .eq('id', user.id)
            .single()

        if (error) {
            console.error('프로필 조회 실패:', error)
            return null
        }

        return data  // { username: '닉네임', interests: [...] }
    }

    useEffect(()=>{
        const username = async()=>{
            const profile = await fetchProfile();
            if(!profile) return;

            setUsername(profile.username)
        }
        username()
    },[])

    return (
        <SliderWrap>
            <Text>
                <UserName>{username}</UserName>님,<br />
                오늘도 당신의 이야기를 들려주실래요?
            </Text>

            {/* <div className='prev-main-slide'>이전 슬라이드</div>
            <div className='next-slide-main'>다음 슬라이드</div> */}
            <StyleSwiper
                modules={[Navigation, A11y, Keyboard, Autoplay]}
                onSwiper={(swiper)=>SwiperRef.current = swiper}
                navigation={{
                    nextEl: '.next-slide-main',
                    prevEl: '.prev-slide-main',
                }}
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