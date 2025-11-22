import { ButtonStyle } from "@/app/components/form/Button.styled"

export default function DeleteButton() {
    return (
        <ButtonStyle $width={60} $height={30} disabled>
            <span style={{ fontSize: '1.4rem' }}>삭제</span>
        </ButtonStyle>
    )
}