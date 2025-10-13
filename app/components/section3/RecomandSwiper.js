"use client";
import { useRef } from 'react';
import Image from 'next/image';
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
    margin-top: 13px;
`
const StyleSwiper = styled(Swiper)`
    overflow:visible;
    .swiper-slide { opacity: 0.5 };
    .swiper-slide-active { opacity: 1 !important; }
    .swiper-slide:focus { outline: 2px solid var(--point-color) }
`
const SwiperDepth = styled.div`
    display: flex;
    gap: 10px;
    padding: 15px;
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
`
const BookCover = styled.div`
    position: relative;
    width: 100px;
    aspect-ratio: 3/4;
    background-color: #bdbdbd;
    > img {
        position: absolute;
        top: 0;
        left: 0;
        max-width: 100%;
        width: 100%;
        height: 100%;
    }
`
const EmptyBox = styled.div`
    width: 100px;
    aspect-ratio: 3/4;
    background-color: #bdbdbd;
`
const BookDesc = styled.div`
    position: relative;
    width: calc(100% - 110px);
`

const BookTitle = styled.p`
    font-size: 1.6rem;
    font-weight: 700;
    margin-bottom: 5px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 1;
`

const BookIntro = styled.p`
    font-size: 1.4rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 3;
`
const ButtonWrap = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    gap: 5px;
    align-items: center;
`
const Button = styled.button`
    min-width: 76px;
    justify-content: center;
    display: flex;
    align-items: center;
    height: 24px;
    line-height: 24px;
    padding: 0 4px;
    border-radius: 150px;
    text-align: center;
    font-size: 1.1rem;
    border-radius: 500px;
    background-color: #bdbdbd;
`
const ButtonDark = styled(Button)`
    background-color:var(--sub_color);
    color:#fff;
`

export default function RecomandSwiper({books}){
    const SwiperRef = useRef(null);

    return (
        <SliderWrap>
            <StyleSwiper
                modules={[Navigation, A11y, Keyboard, Autoplay]}
                onSwiper={(swiper)=>SwiperRef.current = swiper}
                navigation={{
                    nextEl: '.next-slide',
                    prevEl: '.prev-slide',
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                spaceBetween={'15'}
                loop={true}
                a11y={{ enabled: true }}
                slidesPerView={'1.15'}
                className='my-recomand-book'
            >
            {books.map((book)=>(
                <SwiperSlide key={book.isbn}>
                    <SwiperDepth>
                        <BookCover>
                            {book.thumbnail ? (
                                <Image src={`${book.thumbnail}`}
                                alt={book.title}
                                width={'120'} height={'174'}></Image>
                            ) : (
                                <EmptyBox></EmptyBox>
                            )}
                        </BookCover>
                        <BookDesc>
                            <BookTitle>{book.title}</BookTitle>
                            <BookIntro>{book.contents ? book.contents.substring(0, 200) + '...' : '설명이 없습니다.'}</BookIntro>
                            <ButtonWrap>
                                <Button>Wish</Button>
                                <ButtonDark>More View</ButtonDark>
                            </ButtonWrap>
                        </BookDesc>
                    </SwiperDepth>
                </SwiperSlide>
            ))}
            </StyleSwiper>
        </SliderWrap>
    )
}