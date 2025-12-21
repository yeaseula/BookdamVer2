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
    .react-loading-skeleton { line-height: 1.5 };
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