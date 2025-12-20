import styled from "styled-components"
import { useAuthStore } from "@/app/lib/userfetch";
import SkeletonBox from "../../common/SkeletonBox";

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
    const isLoading = !profile.data

    return (
        <Text>
            <SkeletonBox isLoading={isLoading} />
            <>
                <p><Name>{username}</Name>님,</p>
                <p>오늘도 당신의 이야기를 들려주실래요?</p>
            </>
        </Text>
    )
}