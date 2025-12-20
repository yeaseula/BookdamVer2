import styled from "styled-components"
import WaveBack from "./WaveBack"
import UserName from "./UserName"
import BannerButton from "../mainButton/bannerButton"

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
            <WaveBack />
            <div className="relative z-5">
                <UserName />
                <div className='mt-[20px] h-[174px]'>
                    <BannerButton />
                </div>
            </div>
        </Container>
    )
}