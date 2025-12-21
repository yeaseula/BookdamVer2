"use client"
import styled from "styled-components"
import Profile from "./components/Profile"
import ReadingState from "./components/ReadingState"
import Myinfo from "./components/Myinfo"
import MyActivity from "./components/MyActivity"
import Setting from "./components/Setting"
import { useAuthStore } from "../lib/userfetch"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import { ErrorBoundary } from "react-error-boundary"
import { CompoErrorFallBack } from "../error/CompoErrorFallBack"
import { throwSupabaseError } from "../error/errorLibrary"
import { SubWrap } from "../components/common/container.styled"
import SkeletonBox from "../components/common/Skeleton/SkeletonBox"

const CommonBox = styled.div`
    position: relative;
    background-color: var(--background-color-light);
    border-radius: 12px;
    box-shadow: 0 2px 13px rgba(0, 0, 0, .15);
    height: 99px;
    padding: 0 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const CommonBoxStyle = styled(CommonBox)<{$height?: string, $padding?: string}>`
    margin: 25px 0;
    height: ${(p)=>p.$height || 'auto'};
    padding: ${(p)=>p.$padding || ''}
`

export default function MyPage() {

    const {profile,reviews, isReviewLoaded} = useAuthStore()
    const username = profile.data?.username
    const interests = profile.data?.interests

    const isUserLoading = !username
    const isInterestLoading = !interests

    if(profile.error) {
        throwSupabaseError(profile.error)
    }

    return(
        <>
        <SubWrap>
            <h2 className="sr-only">나의 프로필</h2>
            <CommonBox>
                <SkeletonBox isLoading={isUserLoading} />
                <ErrorBoundary FallbackComponent={CompoErrorFallBack}>
                {username &&
                    <Profile username={username} interests={interests}/>
                }
                </ErrorBoundary>
            </CommonBox>
            <CommonBoxStyle $height="125px">
                <SkeletonBox isLoading={isInterestLoading} />
                    <ErrorBoundary FallbackComponent={CompoErrorFallBack}>
                    {isReviewLoaded &&
                        <ReadingState reviews={reviews} />
                    }
                    </ErrorBoundary>
            </CommonBoxStyle>
            <CommonBoxStyle $padding="25px 15px">
                <MyActivity />
            </CommonBoxStyle>
            <CommonBoxStyle $padding="25px 15px">
                <Setting/>
            </CommonBoxStyle>
            <CommonBoxStyle $padding="25px 15px">
                <Myinfo />
            </CommonBoxStyle>
        </SubWrap>
        </>
    )
}