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

const ProfileWrap = styled.section`
    padding: 80px 15px 65px;
`
const CommonBox = styled.div`
    position: relative;
    background-color: var(--background-color);
    border-radius: 12px;
    padding: 20px 15px;
    box-shadow: 0 2px 13px rgba(0, 0, 0, .15);
`
const CommonBoxStyle = styled(CommonBox)`
    margin: 25px 0;
`

export default function MyPage() {

    const {profile,reviews, isReviewLoaded} = useAuthStore()
    const username = profile.data?.username
    const interests = profile.data?.interests

    if(profile.error) {
        throwSupabaseError(profile.error)
    }

    return(
        <>
        <ProfileWrap>
            <h2 className="sr-only">나의 프로필</h2>
            <CommonBox>
                <ErrorBoundary FallbackComponent={CompoErrorFallBack}>
                {username &&
                    <Profile username={username} interests={interests}/>
                }
                {!username &&
                    <>
                        <Skeleton width={150} height={22}/>
                        <Skeleton width={258} height={22}/>
                    </>
                }
                </ErrorBoundary>
            </CommonBox>
            <CommonBoxStyle>
                {isReviewLoaded &&
                    <ErrorBoundary FallbackComponent={CompoErrorFallBack}>
                        <ReadingState reviews={reviews} />
                    </ErrorBoundary>
                }
                {!isReviewLoaded &&
                    <>
                        <Skeleton width={150} height={28}/>
                        <Skeleton width={258} height={28}/>
                    </>
                }
            </CommonBoxStyle>
            <CommonBoxStyle>
                <MyActivity />
            </CommonBoxStyle>
            <CommonBoxStyle>
                <Setting/>
            </CommonBoxStyle>
            <CommonBoxStyle>
                <Myinfo />
            </CommonBoxStyle>
        </ProfileWrap>

        </>

    )
}