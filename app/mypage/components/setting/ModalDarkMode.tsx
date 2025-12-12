import styled from "styled-components"
import ToggleSwitch from "./ToggleSwitch"
import createClient from "@/utils/supabase/client"
import { useAuthStore } from "@/app/lib/userfetch"
import { useSettingStore, SettingDefault } from "@/app/lib/userfetch"
import { SettingKey } from "./SettingKey"

const ToggleList = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 40px;
`

export default function ModalDarkModeSetting() {
    const supabase = createClient()
    const { session } = useAuthStore()
    const { userSetting } = useSettingStore()
    const setUserCustom = useSettingStore((s)=>s.setUserCustom)

    const handleToggle = async() => {
        if(!session) return
        const RealTarget = userSetting.data.timer_set === 'normal' ? 'dark' : 'normal'

        await EditFunc('timer_set',RealTarget)
    }

    const EditFunc = async<K extends keyof SettingDefault>(
        key: K,
        value: SettingDefault[K]
    ) => {
        try {

            const mappingKey = SettingKey[key]

            const { data, error } = await supabase
                .from("user_settings")
                .update({
                [mappingKey]: value,
                updated_at: new Date().toISOString()
                })
                .eq("user_id", session.user.id)
                .select();

            if (error) {
                console.error(error);
                throw new Error ('다크모드 수정에 실패했습니다.')
            }
            setUserCustom(key, value)

        } catch(err) {
            console.error(err);
            const errorMessage = err instanceof Error
                ? err.message
                : '수정 중 오류가 발생했습니다'
        }
    }


    return(
        <>
        <ToggleList>
            <p>다크모드 켜기</p>
                <ToggleSwitch
                isOn={userSetting.data.timer_set === 'dark'}
                onClick={handleToggle}
                />
        </ToggleList>
        </>
    )
}