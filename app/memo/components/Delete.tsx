import { ButtonStyle } from "@/app/components/form/Button.styled"

interface DeleteProps {
    onClick:()=>void;
    checkId: string[];
}

export default function DeleteButton({onClick,checkId}:DeleteProps) {
    const active = checkId.length > 0 ? true : false;
    return (
        <ButtonStyle $width={60} $height={30} disabled={false} onClick={onClick}>
            <span style={{ fontSize: '1.4rem' }}>삭제</span>
        </ButtonStyle>
    )
}