import styled from "styled-components"
import ToggleSwitch from "./ToggleSwitch"
import { useRef } from "react"
import { useSettingStore } from "@/app/lib/userfetch"
import { useAuthStore } from "@/app/lib/userfetch"
import createClient from "@/utils/supabase/client"

const ToggleList = styled.div`
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    width: 100%;
`
const ToggleListLast = styled(ToggleList)`
    margin-top: 15px;
`

export default function ModalReviewSetting() {
    const supabase = createClient()
    const { session } = useAuthStore()
    const { userSetting } = useSettingStore()
    const setUserCustom = useSettingStore((s)=>s.setUserCustom)

    const LibraryType = userSetting.reviewSet;

    const LibraryRef = useRef(LibraryType)

    const handleToggle = async() => {
        if(!session) return

        const RealTarget = LibraryRef.current === 'list' ? 'gallery' : 'list'
        LibraryRef.current = RealTarget

        try {
            const { data, error } = await supabase
                .from("user_settings")
                .update({
                review_set: LibraryRef.current,
                updated_at: new Date().toISOString()
                })
                .eq("user_id", session.user.id)
                .select();

            if (error) {
                console.error(error);
                throw new Error ('서재 스타일 수정에 실패했습니다.')
            }
            setUserCustom('reviewSet', LibraryRef.current)

        } catch(err) {
            console.error(err);
            const errorMessage = err instanceof Error
                ? err.message
                : '수정 중 오류가 발생했습니다'
        }
    }

    return (
        <>
            <ToggleList>
                <p>리스트형</p>
                    <ToggleSwitch
                    isOn={LibraryRef.current === 'list'}
                    onClick={handleToggle}
                    />
            </ToggleList>
            <ToggleListLast>
                <p>갤러리형</p>
                    <ToggleSwitch
                    isOn={LibraryRef.current === 'gallery'}
                    onClick={handleToggle}
                    />
            </ToggleListLast>
        </>
    )
}