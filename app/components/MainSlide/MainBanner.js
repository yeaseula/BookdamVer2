"use client"
import WaveBack from "./WaveBack"
import MainSwiper from "./MainSwiper"

export default function MainSlide() {
    return(
        <section>
            <h2 className="sr-only bg">내가 기록한 독서리뷰 목록</h2>
            <WaveBack />
            <MainSwiper />
        </section>
    )
}