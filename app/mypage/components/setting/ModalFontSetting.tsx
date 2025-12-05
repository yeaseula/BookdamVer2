import styled from "styled-components"

import { useSettingStore, useAuthStore } from "@/app/lib/userfetch"
import { useState } from "react"
import RangeInput from "./Range"
import { ButtonStyle } from "@/app/components/form/Button.styled"
import createClient from "@/utils/supabase/client"
import { useToastStore } from "@/app/lib/useToastStore"

export default function ModalFontSetting({setFontUI}) {
    const { session } = useAuthStore()
    const { userSetting } = useSettingStore()
    const [fontSize, setFontSize] = useState(userSetting.font)
    const [loading,setLoading] = useState(false)
    const setUserCustom = useSettingStore((p)=>p.setUserCustom)
    const setToast = useToastStore((s)=>s.setToast)
    const supabase = createClient()
    let debounce:boolean = false

    const handleSubmit = async() => {
        if(debounce || loading || !session) return

        debounce = true
        setLoading(true)

        try {
            const { data, error } = await supabase
                .from("user_settings")
                .update({
                font: fontSize,
                updated_at: new Date().toISOString()
                })
                .eq("user_id", session.user.id)
                .select();

            if (error) {
                console.error(error);
                throw new Error ('서재 스타일 수정에 실패했습니다.')
            }
            setUserCustom('font', fontSize)
            setToast('폰트 크기 변경 완료!' ,'success')
            setFontUI(false)

        } catch(err) {
            console.error(err);
            const errorMessage = err instanceof Error
                ? err.message
                : '수정 중 오류가 발생했습니다'
            setToast(errorMessage,'error')
            debounce = true
            setLoading(true)
        }
    }

    return (
        <>
            <div className="mt-[40px] pb-6">
                <RangeInput value={fontSize} set={setFontSize}>
                    하늘 날다람쥐
                </RangeInput>

                <ButtonStyle
                type="button"
                disabled={false}
                $height={40}
                style={{ marginTop: '30px' }}
                onClick={handleSubmit}
                >설정 완료</ButtonStyle>
            </div>
        </>
    )
}

