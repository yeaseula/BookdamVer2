import styled from "styled-components"

const SwiperDepth = styled.div`
    display: flex;
    gap: 10px;
    padding: 15px;
    background-color: var(--board_background);
    color: var(--color_black);
    border: 1px solid #e0e0e0;
    border-radius: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    opacity: 0;
`
const Contents = styled.div`
    position: relative;
    width: calc(100% - 110px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const EmptyBox = styled.div`
    width: 85px;
    aspect-ratio: 0.68;
    background-color: #bdbdbd;
`
const BookTitle = styled.p`
    font-size: 1.6rem;
    font-weight: 700;
    margin-bottom: 5px;
`
const BookIntro = styled.p`
    font-size: 1.4rem;
    height: 63px;
`
const Button = styled.div`
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
    color: #000 ;
`

export default function SkeletonSlide () {
    return (
        <SwiperDepth>
            <EmptyBox/>
            <Contents>
                <div>
                <BookTitle>Title</BookTitle>
                <BookIntro>Infor</BookIntro>
                </div>
                <div className="flex items-center gap-[5px]">
                    <Button>wish</Button>
                    <Button>more view</Button>
                </div>
            </Contents>
        </SwiperDepth>
    )
}