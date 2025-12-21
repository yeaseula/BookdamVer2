import styled from "styled-components"
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const Container = styled.div<{$isLoading:boolean}>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: ${(p)=>p.$isLoading ? 1 : 0};
    z-index: ${(p)=>p.$isLoading ? 50 : -50};
    transition: opacity 0.2s ease;
    padding: 80px 15px 65px;
    background-color: var(--board_background);
    .react-loading-skeleton { line-height: 1.5 };
`
const ReivewHead = styled.section`
    display: flex;
    gap: 15px;
    align-items: start;
`
const BookThumbnail = styled.div`
    width: 150px;
    height: auto;
    aspect-ratio: 3/4;
    border-radius: 8px;
    overflow: hidden;
`
const BookContent = styled.div`
    width: calc(100% - 165px);
`
const ReviewBody = styled.section`
    width: calc(100% + 30px);
    margin-top: 35px;
    margin-left: -15px;
    padding: 40px 15px 60px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    background: var(--background-color-light);
`
export function ListSkeleton ({isLoading}: {isLoading: boolean}) {
    return (
        <Container $isLoading={isLoading}>
            <Skeleton width={50} height={22} borderRadius={5} />
            <div className="mt-4">
                <Skeleton height={122} borderRadius={12} />
            </div>
            <div className="mt-5.5">
                <Skeleton height={122} borderRadius={12}/>
            </div>
        </Container>
    )
}

export function FormSkeleton ({isLoading}: {isLoading: boolean}) {
    return (
        <Container $isLoading={isLoading}>
        <Skeleton height={37} borderRadius={5}/>
        <div className="mt-1.5">
            <Skeleton height={90} borderRadius={5} />
        </div>
        <div className="mt-[35px]">
            <Skeleton height={25} borderRadius={5}/>
        </div>
        <div className="mt-[10px] text-right">
            <Skeleton width={100} height={25} borderRadius={5}/>
        </div>
        <div className="mt-[5px] text-right">
            <Skeleton width={150} height={25} borderRadius={5}/>
        </div>
        </Container>
    )
}

export function ReviewDetailSkeleton ({isLoading}: {isLoading: boolean}) {
    return (
        <Container $isLoading={isLoading}>
            <ReivewHead>
                <BookThumbnail>
                    <Skeleton height={'100%'} borderRadius={5}/>
                </BookThumbnail>
                <BookContent>
                    <Skeleton width={78} height={20} borderRadius={5}></Skeleton>
                    <Skeleton width={150} height={20} borderRadius={5}></Skeleton>
                    <Skeleton height={20} borderRadius={5}></Skeleton>

                    <div className="text-[1.5rem] mt-5">
                        <Skeleton height={20} borderRadius={5}></Skeleton>
                        <Skeleton height={20} borderRadius={5}></Skeleton>
                    </div>

                    <div className="mt-3 text-[1.5rem]">
                        <Skeleton height={20} borderRadius={5}></Skeleton>
                    </div>
                    <Skeleton height={20} borderRadius={5}></Skeleton>
                </BookContent>
            </ReivewHead>
            <ReviewBody>
                <div className="mb-8">
                    <Skeleton width={300} height={20} borderRadius={5}></Skeleton>
                    <Skeleton height={20} borderRadius={5}></Skeleton>
                </div>
                <div>
                    <Skeleton width={300} height={20} borderRadius={5}></Skeleton>
                    <Skeleton height={20} borderRadius={5}></Skeleton>
                </div>
            </ReviewBody>
        </Container>
    )
}