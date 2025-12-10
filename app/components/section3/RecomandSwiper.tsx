"use client"

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y, Keyboard, Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/a11y';
import 'swiper/css/keyboard';
import styled from 'styled-components';
import createClient from '@/utils/supabase/client';
import { useToastStore } from '@/app/lib/useToastStore';
import { useAuthStore, DataState, Wish } from '@/app/lib/userfetch';
import { fetchBookAI } from '@/app/lib/fetchBookCover';
import { useErrorUtil } from '@/app/error/useErrorUtil';

const SliderWrap = styled.div`
    position: relative;
    margin-top: 5px;
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
    height: auto;
    aspect-ratio: 3/4;
    background-color: #bdbdbd;
`
const BookDesc = styled.div`
    position: relative;
    width: calc(100% - 110px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
    display: flex;
    gap: 5px;
    align-items: center;
`
const DefaultBtnStyle = styled.button`
    min-width: 76px;
    justify-content: center;
    display: flex;
    align-items: center;
    min-height: 24px;
    padding: 1px 6px;
    border-radius: 150px;
    text-align: center;
    font-size: 1.1rem;
    border-radius: 500px;
    background-color: #757575;
    color: #fff;
    cursor: pointer;
`
const Button = styled(Link)`
    min-width: 76px;
    justify-content: center;
    display: flex;
    align-items: center;
    min-height: 24px;
    padding: 0 4px;
    border-radius: 150px;
    text-align: center;
    font-size: 1.1rem;
    border-radius: 500px;
    background-color: var(--sub_color);
    color: #fff
`

export default function RecomandSwiper(){
    const SwiperRef = useRef(null);
    const supabase = createClient()
    const { session,profile } = useAuthStore()
    const setToast = useToastStore((state)=>state.setToast)
    const [isWorking,setIsWorking] = useState(false)
    const [AithumbArr,setAiThumbArr] = useState([])
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

    const handleWishAdd = async(title:string,author:string,price:number) => {

        if(isWorking) return
        setIsWorking(true)

        try {
            const { data, error } = await supabase.from("wish").insert([
                {
                    user_id: session.user.id,
                    title,
                    author,
                    price,
                },
            ]).select();

            const newWish: DataState<Wish> = {
                data : data?.[0],
                error: error,
                ok: !error
            }

            if(!newWish.data || !newWish.ok) {
                setToast("읽고싶은 책 업로드 실패","error")
                throw new Error('위시리스트 추가 실패')
            } else {
                setToast("읽고싶은 책 업로드 성공!","success")
                useAuthStore.getState().addData('wish',newWish)
            }

        } catch(error) {
            setToast("읽고싶은 책 업로드 실패","error")
            throw new Error('위시리스트 추가 실패')
        } finally {
            setIsWorking(false)
        }
    }

    return (
        <SliderWrap>
            <StyleSwiper
                modules={[Navigation, A11y, Keyboard, Autoplay]}
                onSwiper={(swiper)=>SwiperRef.current = swiper}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                spaceBetween={15}
                keyboard={{ enabled: true }}
                a11y={{ enabled: true }}
                slidesPerView={1.15}
            >
            {AithumbArr.map((book,index)=>(
                <SwiperSlide
                key={book.isbn}
                tabIndex={0}
                aria-label={`${index}번째 슬라이드`}
                >
                    <SwiperDepth>
                        <BookCover>
                            {book.thumbnail !== '' ? (
                                <Image src={`${book.thumbnail}`}
                                alt={book.title}
                                priority
                                width={'120'} height={'174'} />
                            ) : (
                                <EmptyBox />
                            )}
                        </BookCover>
                        <BookDesc>
                            <div>
                                <BookTitle>{book.title}</BookTitle>
                                <BookIntro>{book.contents ? book.contents.substring(0, 200) + '...' : '설명이 없습니다.'}</BookIntro>
                            </div>
                            <ButtonWrap>
                                <DefaultBtnStyle
                                aria-label='읽고싶은 책 목록에 추가'
                                onClick={()=>handleWishAdd(book.title,book.authors[0],book.price)}
                                >Wish</DefaultBtnStyle>
                                <Button
                                aria-label='예스24 판매페이지로 이동'
                                href={`https://www.yes24.com/product/search?domain=ALL&query=${encodeURIComponent(book.title)}`} target='_blank'>More View</Button>
                            </ButtonWrap>
                        </BookDesc>
                    </SwiperDepth>
                </SwiperSlide>
            ))}
            </StyleSwiper>
        </SliderWrap>
    )
}