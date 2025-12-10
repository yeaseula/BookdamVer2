import styled from "styled-components"
import ToggleSwitch from "./ToggleSwitch"
import createClient from "@/utils/supabase/client"
import { useAuthStore, useSettingStore, SettingDefault } from "@/app/lib/userfetch"

const ToggleList = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`
const ToggleListLast = styled(ToggleList)`
    margin-top: 7px;
`

export default function ModalCalendarSetting() {
    const supabase = createClient()
    const { session } = useAuthStore()
    const { userSetting } = useSettingStore()
    const setUserCustom = useSettingStore((s)=>s.setUserCustom)

    const SettingKey = {
        review_set: 'review_set',
        calendar_start: 'calendar_start',
        calendar_stamp: 'calendar_stamp',
        font: 'font',
        timer_set: 'timer_set',
    } as const

    const handleToggle = async() => {
        if(!session) return
        const RealTarget = userSetting.data.calendar_start === 'sun' ? 'mon' : 'sun'

        await EditFunc('calendar_start',RealTarget)

    }

    const handleToggle2 = async() => {
        if(!session) return
        const RealTarget = userSetting.data.calendar_stamp === 'star' ? 'gook' : 'star'

        await EditFunc('calendar_stamp',RealTarget)
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
                throw new Error ('캘린더 수정에 실패했습니다.')
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
        <p className="mt-[40px] mb-5 font-bold">시작일 선택</p>
        <ToggleList>
            <p>일요일부터</p>
                <ToggleSwitch
                isOn={userSetting.data.calendar_start === 'sun'}
                onClick={handleToggle}
                />
        </ToggleList>
        <ToggleListLast>
            <p>월요일부터</p>
                <ToggleSwitch
                isOn={userSetting.data.calendar_start === 'mon'}
                onClick={handleToggle}
                />
        </ToggleListLast>
        <p className="mt-[20px] mb-5 font-bold">도장 선택</p>
        <ToggleListLast>
            <p>책도장</p>
                <ToggleSwitch
                isOn={userSetting.data.calendar_stamp === 'star'}
                onClick={handleToggle2}
                />
        </ToggleListLast>
        <ToggleListLast>
            <p>발자국도장</p>
                <ToggleSwitch
                isOn={userSetting.data.calendar_stamp === 'gook'}
                onClick={handleToggle2}
                />
        </ToggleListLast>
        </>
    )
}