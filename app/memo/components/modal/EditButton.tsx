import { ButtonStyle } from "@/app/components/form/Button.styled"
import { useEffect } from "react"

export default function EditModalButton({
    modalTitle,
    modalPage,
    modalContent,
    isLoading,
    onClick
}) {

    const isValid = modalTitle && modalPage
    && modalContent && !isLoading

    return(
        <ButtonStyle disabled={!isValid}
        $height={37} onClick={onClick}>저장</ButtonStyle>
    )
}