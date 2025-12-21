import styled from 'styled-components';

const Container = styled.div<{$isLoading:boolean}>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: ${(p)=>p.$isLoading ? 1 : 0};
    z-index: ${(p)=>p.$isLoading ? 50 : -50};
    transition: opacity 0.2s ease;
    background: red;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--main-color-light);
`

export default function SkeletonText({isLoading}:{isLoading:boolean}) {
    return (
        <Container $isLoading={isLoading} className="skeleton-box">
            <div className='flex justify-center align-center'>
                <div
                style={{ borderTopColor: 'var(--point_color)' }}
                className="w-8 h-8 border-3 border-gray-300 rounded-full animate-spin" />
            </div>
        </Container>
    )
}