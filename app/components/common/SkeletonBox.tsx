import styled from 'styled-components';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';
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
    .react-loading-skeleton { line-height: 1.5 }
`

export default function SkeletonBox({isLoading}:{isLoading:boolean}) {
    return (
        <Container $isLoading={isLoading} className="skeleton-box">
            <Skeleton className='w-[100%] h-[100%]' />
        </Container>
    )
}