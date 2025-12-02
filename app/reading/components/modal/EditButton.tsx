import { ButtonStyle } from "@/app/components/form/Button.styled"

export default function EditModalButton({
    modalTitle,modalPage,modalContent,loading,onClick}) {

    const isValid = modalTitle && modalPage && modalContent && !loading

    return(
        <ButtonStyle disabled={!isValid} $height={37} onClick={onClick}>저장</ButtonStyle>
    )
}