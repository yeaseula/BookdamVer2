import { ButtonStyle } from "@/app/components/form/Button.styled"

export default function EditButton() {
    return (
        <ButtonStyle $width={60} $height={30} disabled>
            <span style={{ fontSize: '1.4rem' }}>수정</span>
        </ButtonStyle>
    )
}