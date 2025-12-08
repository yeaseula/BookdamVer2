import styled from "styled-components"
import WaveBack from "./WaveBack"
import BannerItems from "./components/BannerItems"
import UserName from "./components/UserName"

const Container = styled.section`
    position: relative;
    width: 100%;
    height: auto;
    padding: 48px 15px 0;
    aspect-ratio: 375 / 280;
    padding-bottom: 5rem;
`

export default function MainBanner() {
    return (
        <Container>
            <h2 className="sr-only bg">내가 기록한 독서리뷰 목록</h2>
            <WaveBack />
            <div className="relative z-5">
                <UserName />
                <div className='mt-[20px] relative flex justify-center items-center h-[174px]'>
                    <BannerItems />
                </div>
            </div>
        </Container>
    )
}