import styled from "styled-components"
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { useAuthStore } from "@/app/lib/userfetch";

const Text = styled.div`
    position: relative;
    font-size: 2.1rem;
    color: #fff;
`
const Name = styled.span`
    font-size: 2.8rem;
    vertical-align: inherit;
`

export default function UserName() {
    const {profile} = useAuthStore()
    const username = profile.data ? profile.data.username : null

    return (
        <Text>
            {username && (
                <>
                    <p><Name>{username}</Name>님,</p>
                    <p>오늘도 당신의 이야기를 들려주실래요?</p>
                </>
            )}
            {!username && (
                <>
                <SkeletonTheme width={'100px'}
                baseColor="#bdbdbd" highlightColor="#fff">
                    <Skeleton count={1} />
                </SkeletonTheme>
                <SkeletonTheme width={'320px'}
                baseColor="#bdbdbd" highlightColor="#fff">
                    <Skeleton count={1} />
                </SkeletonTheme>
                </>
            )}
        </Text>
    )
}