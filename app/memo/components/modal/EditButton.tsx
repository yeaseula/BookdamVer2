import { ButtonStyle } from "@/app/components/form/Button.styled"

interface EditModalProps {

}

export default function EditModalButton({modalTitle,modalPage,modalContent,onClick}) {

    const isValid = modalTitle && modalPage && modalContent

    return(
        <ButtonStyle disabled={!isValid} $height={37} onClick={onClick}>저장</ButtonStyle>
    )
}