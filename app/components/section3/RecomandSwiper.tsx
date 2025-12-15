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
import createClient from '@/utils/supabase/client';
import { useToastStore } from '@/app/lib/useToastStore';
import { useAuthStore, DataState, Wish } from '@/app/lib/userfetch';
import { fetchBookAI } from '@/app/lib/fetchBookCover';
import { useErrorUtil } from '@/app/error/useErrorUtil';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import BookCover from './components/BookCover';
import BookDesc from './components/BookDes';
import { BookAiType } from '@/app/lib/dataTypes';

const SliderWrap = styled.div`
    position: relative;
    margin-top: 5px;
`
const StyleSwiper = styled(Swiper)`
    overflow:visible;
    width: 85%;
    .swiper-slide { opacity: 0.5; };
    .swiper-slide-active { opacity: 1 !important; }
    .swiper-slide:focus-visible { outline: 2px solid var(--point-color) }
`
const SwiperDepth = styled.div`
    display: flex;
    gap: 10px;
    padding: 15px;
    background-color: var(--board_background);
    color: var(--color_black);
    border: 1px solid #e0e0e0;
    border-radius: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
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
    let debounse:boolean = false

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

        if(isWorking || debounse) return
        setIsWorking(true)
        debounse = true

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
                throw new Error('위시리스트 추가 실패')
            } else {
                setToast("읽고싶은 책 추가 성공!","success")
                useAuthStore.getState().addData('wish',newWish)
            }

        } catch(error) {
            setToast("읽고싶은 책 업로드 실패","error")
            throw new Error('위시리스트 추가 실패')
        } finally {
            debounse = false
            setIsWorking(false)
        }
    }

    if(AithumbArr.length === 0) {
        return (
            <Skeleton height={165}></Skeleton>
        )
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
                loop={true}
                loopAdditionalSlides={2}
                keyboard={{ enabled: true }}
                a11y={{ enabled: true }}
                slidesPerView={1}
            >
            {AithumbArr.map((book:BookAiType,index)=>(
                <SwiperSlide
                key={book.isbn}
                tabIndex={0}
                aria-label={`${index}번째 슬라이드`}
                >
                    <SwiperDepth>
                        <BookCover book={book} />
                        <BookDesc book={book}
                        onClick={()=>{
                            handleWishAdd(book.title,book.authors[0],book.price)
                        }}/>
                    </SwiperDepth>
                </SwiperSlide>
            ))}
            </StyleSwiper>
        </SliderWrap>
    )
}